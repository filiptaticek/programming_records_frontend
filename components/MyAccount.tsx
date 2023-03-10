/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useState } from "react"
import { saveAs } from "file-saver"
import { useDispatch, useSelector } from "react-redux"
import { getRequest } from "../src/functions"
import { setUser, setRecords, setUsers, setTags } from "../src/store/actions"
import { State } from "../src/types"
import { FormButton } from "./formParts"
import { UniversalForm } from "./forms"
import { inputSameProperties } from "../src/constants"
import clsx from "clsx"
import { postRequest } from "../src/functions/api/post"
import { getTodayDate } from "../src/functions/date/today_date"

export const MyAccount = () => {
  const dispatch = useDispatch()
  const [detailShown, setDetailShown] = useState<boolean>(false)
  const [infoText, setInfoText] = useState<string|undefined>(undefined)
  const { mode, user, token } = useSelector((state: State) => state)
  const [selectedFile, setSelectedFile] = useState<string>("null")

  const handleFileInput = (event:any) => {
    setSelectedFile(event.target.files[0])
  }

  const handleExport = async (event: any) => {
    event.preventDefault()
    const karel = await getRequest("export", token)
    const data = new Blob([karel], { type: "text/csv" })
    saveAs(data, user.username+"-"+getTodayDate())
  }
  
  const handleImport = async (event: any) => {
    event.preventDefault()
    if (token){
      const formData = {"file":selectedFile}
      const poslano = await postRequest(formData,"import",token, true)
      if (poslano){
        setInfoText(
          poslano==="Success"?
            ""
            :
            poslano.length==1?
              poslano.length+" line was skipped"
              :
              poslano.length+" lines were skipped"
        )
        setTimeout(() => {setInfoText(undefined)}, 3000)
        const serverDataUsers = await getRequest("programmer",token)
        const serverDataTags = await getRequest("tag",token)
        const serverData = await getRequest("record",token)
        dispatch(setRecords(serverData))
        dispatch(setUsers(serverDataUsers))
        dispatch(setTags(serverDataTags))
      }
      else {
        setInfoText("Invalid file!")
        setTimeout(() => {setInfoText(undefined)}, 3000)
      }
    }
  }

  const Category = ({ category, value }: { category: string; value: string }) => {
    return (
      <p className="my-2 text-xl">
        <span className="font-bold">{category}: </span>
        {value}
      </p>
    )
  }

  const Line = ()=>{
    return(
      <div className="m-auto my-6 w-[85%] border border-black"/>
    )
  }

  return (
    <>
      <img
        className="mx-6 mr-5 h-[40px] w-[40px] cursor-pointer md:mx-0 md:mr-8"
        src={mode ? "user_white.png" : "user.png"}
        onClick={() => setDetailShown(true)}
      />
      {detailShown && (
        <UniversalForm
          className="pt-[30px] text-center"
          header={<span className="font-bold">My account</span>}
          closeForm={() => setDetailShown(false)}
        >
          <Line />
          <Category category="Full Name" value={user.name+" "+user.surname} />
          <Category category="Username" value={user.username} />
          <Category category="Email" value={user.email} />
          <Category category="Permission" value={user.admin ? "Admin" : "User"} />
          <Line />
          <FormButton className={clsx("m-auto ",mode?"bg-entry_color":"bg-light_blue")} type="submit" onClick={handleExport} text="Export data" />
          <Line />
          <div>
            <input className={clsx(inputSameProperties,"m-auto mb-4 w-[85%]")} type="file" onChange={handleFileInput} />
            {infoText&&<p className="mb-3 text-xl font-bold text-button_red ">{infoText}</p>}
            <FormButton className={mode?"bg-entry_color":"bg-light_blue"} text="Import data" onClick={handleImport} />
          </div>
          <Line />
          <FormButton className="bg-button_red" text="Log out" onClick={() => {dispatch(setUser(null)), window.localStorage.clear()}}/>
        </UniversalForm>
      )}
    </>
  )
}
