import React from "react"
import renderer from "react-test-renderer"
import { PureTags as Tags } from "../tags"

const props = {
  data: {
    allMarkdownRemark: {
      group: [
        {
          fieldValue: "Test Tag",
          totalCount: 1,
        },
        {
          fieldValue: "Another Test Tag",
          totalCount: 1,
        },
      ],
    },
    site: {
      siteMetadata: {
        title: "Crafter Coder",
      },
    },
  },
}

describe("Tags", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Tags {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
