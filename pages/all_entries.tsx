import { useDispatch } from "react-redux"
import { setRecords } from "../src/store/actions"
import { getRequest } from "../src/functions/api/get"
import { useEffect } from "react"
import { AllEntries } from "../components/AllEntries"
import { Header } from "../components/Header"

export default function AllEntriesPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    const updateState = async () =>{
      const serverData = await getRequest("record")
      dispatch(setRecords(serverData))
    }
    updateState()
  }, [dispatch])

  return (
    <div className="px-4 max-w-page_max m-auto">
      <Header />
      <AllEntries />
      <div className="w-full flex">
      </div>
    </div>
  )
}