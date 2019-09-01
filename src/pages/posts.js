import React from "react"

import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

import "../styles/tag-listing.scss"

export const PurePosts = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark
  const { title } = data.site.siteMetadata
  return (
    <>
      <Helmet title={title} />
      <div>
        <h1>Posts</h1>
        <ul>
          {posts.map(post => (
            <li key={post.node.frontmatter.title}>
              <Link className="tag-listing" to={post.node.frontmatter.path}>
                {post.node.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export const Posts = props => {
  return (
    <Layout>
      <PurePosts {...props} />
    </Layout>
  )
}

export default Posts

export const pageQuery = graphql`
  query PostsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`
