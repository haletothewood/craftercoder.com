import React from "react"
import _ from "lodash"

const Tag = ({ tag }) => {
  return (
    <a className="blog-post-tag" href={`/tags/${_.kebabCase(tag)}/`} key={tag}>
      {tag}
    </a>
  )
}

export default Tag
