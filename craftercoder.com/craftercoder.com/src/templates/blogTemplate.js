import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Share from "../components/share"
import Tag from "../components/tag"

import "../styles/blog-post.scss"

export default function BlogTemplate({ data }) {
  const post = data.post
  const renderTags = tags => {
    return tags.map(tag => <Tag tag={tag} />)
  }

  return (
    <Layout>
      <div className="blog-post-container">
        <Helmet title={`Crafter Coder | ${post.frontmatter.title}`} />
        <div className="blog-post">
          <h1>{post.frontmatter.title}</h1>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
        <div className="blog-post-tags">
          {post.frontmatter.tags.length > 0 && `Tags:`}
          {renderTags(post.frontmatter.tags)}
        </div>
        <Share
          socialConfig={{
            twitterHandle: data.site.siteMetadata.twitterHandle,
            config: {
              url: `${data.site.url}${post.frontmatter.path}`,
              title: `${post.frontmatter.title}`,
            },
          }}
        />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        url
        twitterHandle
      }
    }
    post: markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        tags
      }
    }
  }
`
