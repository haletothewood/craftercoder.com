import React from "react"
import _ from "lodash"

export default function Tag({ tag }) {
  return (
    <a className="blog-post-tag" href={`/tags/${_.kebabCase(tag)}/`}>
      {tag}
    </a>
  )
}
