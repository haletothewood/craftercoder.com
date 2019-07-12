import React from "react"
import Helmet from "react-helmet"
import { graphql, Link } from "gatsby"
import { Disqus, CommentCount } from "gatsby-plugin-disqus"

import Layout from "../components/layout"
import Share from "../components/share"
import Tag from "../components/tag"

import "../styles/blog-post.scss"

export default function BlogTemplate({ data }) {
  const post = data.post
  const disqusConfig = {
    url: `${data.site.siteMetadata.url + post.frontmatter.path}`,
    title: post.frontmatter.title,
  }

  const renderTags = tags => {
    return tags.map((tag, index) => (
      <span className="blog-post-tag" key={tag}>
        {index ? "," : ""}
        <Tag tag={tag} />
      </span>
    ))
  }

  return (
    <Layout>
      <div className="blog-post-container">
        <Helmet title={`Crafter Coder | ${post.frontmatter.title}`} />
        <Link to={`${post.frontmatter.path}#disqus`}>
          <CommentCount config={disqusConfig} placeholder={"..."} />
        </Link>
        <div className="blog-post">
          <h2>{post.frontmatter.title}</h2>
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
              url: `${data.site.siteMetadata.url}${post.frontmatter.path}`,
              title: `${post.frontmatter.title}`,
            },
          }}
        />
        <div id="disqus">
          <Disqus config={disqusConfig} />
        </div>
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
