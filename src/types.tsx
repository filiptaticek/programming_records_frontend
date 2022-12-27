export type Language = "Python" | "Javascript" | "C++"
export type Rating = 0|1|2|3|4|5

export interface IDiaryEntry {
    date:string
    language:Language
    time:number
    rating:Rating
    comment:string
    key?:string
}