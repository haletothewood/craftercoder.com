import React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import NavBar from "./navbar"

import { useSiteMetadata } from "../hooks/useSiteMetaData"

import "../styles/layout.scss"

export const PureLayout = ({ site, children }) => {
  return (
    <div id="app">
      <NavBar pageWrapId={"page-wrap"} outerContainerId={"app"} />
      <Header siteTitle={site.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        <main
          style={{
            paddingTop: 120,
          }}
          id="page-wrap"
        >
          {children}
        </main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
          {` `}
          by <a href="https://davidhalewood.com">David Halewood</a>
        </footer>
      </div>
    </div>
  )
}

PureLayout.propTypes = {
  site: PropTypes.object,
  children: PropTypes.node,
}

export const Layout = ({ children }) => {
  const site = useSiteMetadata()
  return <PureLayout children={children} site={site} />
}

export default Layout
