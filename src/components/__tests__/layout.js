import React from "react"
import renderer from "react-test-renderer"
import { PureLayout as Layout } from "../layout"

const site = {
  title: `Crafter Coder`,
}

describe("Layout", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Layout site={site} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
