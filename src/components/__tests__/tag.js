import React from "react"
import renderer from "react-test-renderer"

import Tag from "../tag"

describe("Tag", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Tag tag="Test Tag" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
