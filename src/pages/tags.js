import React from "react"

import kebabCase from "lodash/kebabCase"

import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

import "../styles/tag-listing.scss"

export const PureTags = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => {
  return (
    <>
      <Helmet title={title} />
      <div>
        <h1>Tags</h1>
        <ul>
          {group.map(tag => (
            <li key={tag.fieldValue}>
              <Link
                className="tag-listing"
                to={`/tags/${kebabCase(tag.fieldValue)}/`}
              >
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export const Tags = props => {
  return (
    <Layout>
      <PureTags {...props} />
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
