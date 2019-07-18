import React from "react"
import Img from "gatsby-image"

import { useFixedPlaceholderImage } from "../hooks/useFixedPlaceholderImage"
import { useFixedAboutImage } from "../hooks/useFixedAboutImage"

export const Image = ({ image = useFixedPlaceholderImage() }) => {
  return <Img fixed={image} />
}

export const AboutImage = ({ image = useFixedAboutImage() }) => {
  return <Img fixed={image} />
}
