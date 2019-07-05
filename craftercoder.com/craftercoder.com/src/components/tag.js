import React from "react"

const Tag = ({ tag }) => {
  return (
    <a className="blog-post-tag" href={"/tags/" + tag + "/"} key={tag}>
      {tag}
    </a>
  )
}

export default Tag
