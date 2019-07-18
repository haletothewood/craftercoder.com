import React from "react"
import renderer from "react-test-renderer"
import { Image } from "../image"

const image = {
  height: 100,
  width: 100,
  base64: "base64",
  src: "src",
  srcSet: "srcSet",
}

describe("Image", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Image image={image} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
