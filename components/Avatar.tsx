"use client"

import { AvatarProps } from "@/types/types"
import Image from "next/image"

const Avatar = ({src}: AvatarProps) => {
  return (
    <Image className="rounded-full"
    alt="avatar"
    height={30}
    width={30}
    src={src || "/images/placeholder.jpg"}/>
  )
}

export default Avatar