import { getEstheticDate } from "../src/functions/index.js"
import { IDiaryEntry, IUser } from "../src/types"
import { EditEntryForm } from "./forms/EditEntryForm"
import { ProgrammingLanguageLogo } from "./ProgrammingLanguageLogo"
import { RatingLogo } from "./RatingLogo"
import { useSelector } from "react-redux"
import { MiniTag } from "./MiniTag"

export const Entry = ({programming_language,minutes_spent,rating,description, datetime, id, programmer_id, tag_ids}:IDiaryEntry)=>{

  const users = useSelector((state:any) => state.users)
  const programmerObject = users.find((programmer:IUser) => programmer.id === programmer_id)
  const programmer= programmerObject?programmerObject.name + " " + programmerObject.surname:""

  return(
    <>
      <div className="border-collapse h-[350px] lg:w-[20%] text-center rounded-md p-1">
        <div className="border hover:bg-gray-100 border-black pt-5 h-full">
          <p className="font-bold">{programmer?programmer:"No user"}</p>
          <div className="mb-5">
            <ProgrammingLanguageLogo programming_language={programming_language}/>
          </div>
          <p className="h-[50px] font-bold italic">{getEstheticDate(datetime)}</p>
          <p><span className="font-bold">{minutes_spent}</span> minutes</p>
          {tag_ids&&<div className="w-fit m-auto my-10 flex flex-wrap">{tag_ids.map(tag_id => {return(<MiniTag key={tag_id} id={tag_id} />)})}</div>}
          <RatingLogo rating={rating} />
          <p className="w-[200px] m-auto h-[50px] overflow-scroll mt-5 italic">{description}</p>
          <EditEntryForm 
            postProgrammerId={programmer_id}
            datetime={datetime} 
            postMinutesSpent={minutes_spent} 
            postProgrammingLanguage={programming_language}
            postRating={rating}
            postComment={description}
            postId={id}
            postTagIds={tag_ids}
          />
        </div>
      </div>
    </>
  )
}