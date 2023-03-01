import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { User } from "../components/User"
import { Header } from "../components/Header"
import { AddUserForm } from "../components/forms/AddUserForm"
import { setPage } from "../src/store/actions"
import { Page } from "../components/Page"
import { IUser } from "../src/types"
import { getRequest } from "../src/functions"
import { setUsers } from "../src/store/actions"
import Link from "next/link"

export default function UsersPage() {
  const users = useSelector((state:any) => state.users)
  const user = useSelector((state:any) => state.user)
  const token = useSelector((state:any) => state.token)
  const dispatch = useDispatch()

  useEffect(() => {
    const updateUsers = async () =>{
      const serverData = await getRequest("programmer",token)
      dispatch(setUsers(serverData))
    }
    updateUsers()
    dispatch(setPage("manage_users"))
  }, [dispatch,token ])

  return (
    <Page>
      {user.admin?
        <>
          <Header />
          <AddUserForm />
          {users.map((user: IUser)=>{
            return(
              <User 
                id={user.id} 
                email={user.email}
                name={user.name} 
                surname={user.surname} 
                username={user.username}
                admin={user.admin}
                password={user.password}
                key={user.id} 
              />
            )
          })}
        </>:
        <>
          <p className="m-auto my-10 w-[60%] text-center text-5xl font-bold">You have to be admin in order to reach this page</p>
          <div className="flex">
            <Link className="m-auto rounded-2xl bg-light_blue px-5 py-2 font-bold text-white hover:opacity-80" href="/">Back to home page</Link>
          </div>
        </>
      }
    </Page>
  )
}