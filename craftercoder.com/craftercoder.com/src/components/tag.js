import React from "react"
import { Link } from "gatsby"
import _ from "lodash"

export default function Tag({ tag }) {
  return <Link to={`/tags/${_.kebabCase(tag)}/`}>{tag}</Link>
}
