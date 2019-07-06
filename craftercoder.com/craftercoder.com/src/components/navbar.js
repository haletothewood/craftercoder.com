import React from "react"
import { slide as Menu } from "react-burger-menu"

import "../styles/navbar.scss"

export default function NavBar({ props }) {
  return (
    <Menu right width={"100%"} {...props}>
      <a id="home" className="menu-item" href="/">
        Home
      </a>
      <a id="about" className="menu-item" href="/about">
        About
      </a>
      <a id="about" className="menu-item" href="/tags">
        Tags
      </a>
    </Menu>
  )
}
