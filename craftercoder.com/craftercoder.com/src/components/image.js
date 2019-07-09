import React from "react"
import Img from "gatsby-image"

import { useFixedPlaceholderImage } from "../hooks/useFixedPlaceholderImage"

export const Image = ({ image = useFixedPlaceholderImage() }) => {
  return <Img fixed={image} />
}
