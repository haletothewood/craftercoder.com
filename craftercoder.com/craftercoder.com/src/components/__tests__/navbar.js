import React from "react"
import renderer from "react-test-renderer"
import NavBar from "../navbar"

describe("NavBar", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <NavBar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
