import React from "react"
import renderer from "react-test-renderer"
import { PurePosts as Posts } from "../posts"

const props = {
  data: {
    allMarkdownRemark: {
      edges: [
        {
          node: {
            frontmatter: {
              title: "Title",
              path: "/path",
              date: "01/01/2019",
            },
          },
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

describe("Posts", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Posts {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
