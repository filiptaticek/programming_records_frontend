/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { setRecords, setPage } from "../src/store/actions"
import { getRequest } from "../src/functions/api/get"
import { CallendarEntries } from "../components/entries/CalendarEntries"
import { Header } from "../components/Header"

export default function Home() {
  const dispatch = useDispatch()
  const [daysBack,setDaysBack] = useState<number>(0)

  useEffect(() => {
    const updateState = async () =>{
      const serverData = await getRequest("record")
      dispatch(setRecords(serverData))
    }
    updateState()
    dispatch(setPage("home"))
  }, [dispatch])

  return (
    <div className="px-4 px-4 max-w-page_max m-auto">
      <Header />
      <div className="w-full flex">
        <img src="sipka_doleva.png" className="cursor-pointer mt-1 mr-2 w-min h-min" onClick={()=>setDaysBack(daysBack-7)}/>
        <CallendarEntries daysBack={daysBack} />
        <img src="sipka_doprava.png" className="cursor-pointer mt-1 ml-2 w-min h-min" onClick={()=>setDaysBack(daysBack+7)}/>
      </div>
    </div>
  )
}