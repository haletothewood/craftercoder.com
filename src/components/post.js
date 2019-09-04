import React from "react"
import { Link } from "gatsby"

import "../styles/blog-listing.scss"

export default function Post({ post }) {
  return (
    <div className="blog-post-listing" key={post.id}>
      <h1 className="blog-post-title">
        <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
      </h1>
      <h2 className="blog-post-date">{post.frontmatter.date}</h2>
      <div className="blog-post-reading-time">
        {post.fields.readingTime.text}
      </div>
      <p>{post.excerpt}</p>
    </div>
  )
}
