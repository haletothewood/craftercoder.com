import React from "react"

import SEO from "../components/seo"
import { AboutImage as Image } from "../components/image"
import withLayout from "../utils/withLayout"

import "../styles/about.scss"

export const AboutPage = () => (
  <>
    <SEO title="About" />
    <div className="about-container">
      <h1>About</h1>
      <Image />
      <div className="about-content">
        Crafter Coder is a place for me, a software craftsman apprentice at{" "}
        <a href="https://codurance.com">Codurance</a>, to share my thoughts,
        learnings and resources whilst on my journey.
      </div>
    </div>
  </>
)

export default withLayout(AboutPage)
