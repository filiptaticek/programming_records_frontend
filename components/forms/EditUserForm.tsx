import { UniversalForm } from "./UniversalForm"
import { useDispatch, useSelector } from "react-redux"
import { removeSingleUser, updateSingleUser, setUser } from "../../src/store/actions"
import { useState } from "react"
import { putRequest,capitalize, deleteRequest, isOnlyLetters, sntz } from "../../src/functions"
import { UniversalInput, FormButton } from "../formParts"
import { SelectYesNo } from "../formParts/SelectYesNo"
import { IUser, State } from "../../src/types"
import clsx from "clsx"

export const EditUserForm = ({closeForm,id,name,surname, email, username, admin}:IUser&{closeForm:any})=>{

  const dispatch = useDispatch()
  const [nameState, setName] = useState<string>(name)
  const [editButtonColor, setEditButtonColor] = useState<string>("bg-button_green")
  const [deleteButtonText, setDeleteButtonText] = useState<string>("Delete")
  const [editButtonText, setEditButtonText] = useState<string>("Edit user")
  const [surnameState, setSurname] = useState<string>(surname)
  const [usernameState,setUsername] = useState<string>(username)
  const [emailState,setEmail] = useState<string>(email)
  const [passwordState,setPassword] = useState<string>("")
  const [adminState, setAdmin] = useState<string>(admin?"Yes":"No")
  const { token, user } = useSelector((state: State) => state)

  const handleFirstName = (event:any) => {
    const word = event.target.value
    if (isOnlyLetters(word)){
      setName(capitalize(word))
    }
  }

  const handleSurname = (event:any) => {
    const word = event.target.value
    if (isOnlyLetters(word)){
      setSurname(capitalize(word))
    }
  }
  const handleUsername = (event:any) => {setUsername(sntz(event.target.value))}
  const handleEmail = (event:any) => {setEmail(sntz(event.target.value))}
  const handlePassword = (event:any) => {setPassword(sntz(event.target.value))}
  const handleAdmin = () => {setAdmin(adminState=="Yes"?"No":"Yes")}

  const handleEditingUser = (event:any)=>{ //KLÍČOVÁ FUNKCE PRO EDITACI USERŮ
    event?.preventDefault() //stránka se nerefreshne
    
    /* TOTO BYCH TAM POSÍLAL KDYBY TO FUNGOVALO
    const updatedProgrammer = {
      name:nameState,
      surname:surnameState,
      email:emailState,
      username:usernameState,
      admin:adminState=="Yes"?true:false,
      id:id,
      password:passwordState===""?null:passwordState
    }*/

    if (emailState.includes("@")){ //zkontroluji že email je validní

      const fakeUpdatedProgrammer = { //Fake user
        admin: false,
        email:"karlik.tucnak@ksi.cz",
        id:4,
        name: "Karel",
        password: null,
        surname: "Hoax",
        username: "karlik97ads",
      }

      putRequest("programmer",4,fakeUpdatedProgrammer,token) //posílám putRequest 
      console.log(fakeUpdatedProgrammer)
      dispatch(updateSingleUser(id,fakeUpdatedProgrammer)) //toto už jen mění state aplikace
      id==user.id&&dispatch(setUser(fakeUpdatedProgrammer))
      closeForm()
    }
    else (
      setEditButtonText("Add @ to email"),setEditButtonColor("bg-button_red"),
      setTimeout(() => {
        setEditButtonText("Edit user"),
        setEditButtonColor("bg-button_green")
      }, 3000)
    )
  }

  const handleDeletingUser = (event:any)=>{
    event?.preventDefault()
    if (id===user.id){
      setDeleteButtonText("You can't do that")
      setTimeout(() => {
        setDeleteButtonText("Delete")
      }, 3000)
    }
    else{
      deleteRequest("programmer",id,token)
      dispatch(removeSingleUser(id))
      closeForm()
    }
  }

  return(
    <UniversalForm className="pt-[60px]" header={<>Edit user <strong> {name} {surname}</strong></>} onSubmit={handleEditingUser} closeForm={closeForm}>
      <UniversalInput text="Edit the first name of the user" value={nameState} onChange={handleFirstName}/> 
      <UniversalInput text="Edit the surname of the user" value={surnameState} onChange={handleSurname}/> 
      <UniversalInput required={true} text="Fill in the username" value={usernameState} onChange={handleUsername} />
      <UniversalInput required={true} text="Fill in the email" value={emailState} onChange={handleEmail} />
      <UniversalInput type="password" text="Fill in new password if you wish to change it" value={passwordState} onChange={handlePassword} />
      <SelectYesNo text="Is the user admin?" value={adminState} onChange={handleAdmin} />
      <div className="mt-8 flex">
        <FormButton type="submit" text={editButtonText} className={clsx("mr-2 duration-500",editButtonColor)} />
        <FormButton onClick={handleDeletingUser} className="bg-button_red duration-500" text={deleteButtonText}/>
      </div>
    </UniversalForm>
  )
}