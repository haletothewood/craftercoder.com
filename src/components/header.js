import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

export default function Header({ siteTitle }) {
  return (
    <header
      style={{
        position: "fixed",
        background: `#282828`,
        borderBottom: `solid 2px #1d1d1d`,
        marginBottom: `1.45rem`,
        width: "100%",
        zIndex: 1,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `#d79921`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}
