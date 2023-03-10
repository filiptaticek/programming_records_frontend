import { useSelector } from "react-redux"

import { Color, ITag, State } from "../../src/types"

const colorsCodes = ["bg-[#ffe100]", "bg-[#FFA500]", "bg-[#DC143C]", "bg-[#FF69B4]", "bg-[#9400D3]", "bg-[#0000FF]", "bg-[#32CD32]", "bg-[#8B4513]"]
export const returnTagColor = (color: Color) => {
  switch (color) {
  case "yellow":
    return colorsCodes[0]
  case "orange":
    return colorsCodes[1]
  case "red":
    return colorsCodes[2]
  case "pink":
    return colorsCodes[3]
  case "purple":
    return colorsCodes[4]
  case "blue":
    return colorsCodes[5]
  case "green":
    return colorsCodes[6]
  case "brown":
    return colorsCodes[7]
  }
}

export const MiniTagIcon = ({ id }: { id: number }) => {
  const { mode, tags } = useSelector((state: State) => state)
  const foundTag = tags.find((tag: ITag) => tag.id === id)

  return (
    <div
      className={`h-[30px] w-[40px] rounded-sm p-2 ${mode && "border border-white"} ${
        foundTag && returnTagColor(foundTag.color)
      }`}
    />
  )
}
