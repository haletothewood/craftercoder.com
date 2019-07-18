import React from "react"
import { slide as Menu } from "react-burger-menu"
import { Link } from "gatsby"

import "../styles/navbar.scss"

export default function NavBar({ props }) {
  return (
    <Menu right width={"100%"} {...props}>
      <Link id="home" className="menu-item" to="/">
        Home
      </Link>
      <Link id="about" className="menu-item" to="/about">
        About
      </Link>
      <Link id="resources" className="menu-item" to="/resources">
        Resources
      </Link>
      <Link id="tags" className="menu-item" to="/tags">
        Tags
      </Link>
    </Menu>
  )
}
