import React from "react"

import SEO from "../components/seo"
import withLayout from "../utils/withLayout"

export const AboutPage = () => (
  <>
    <SEO title="About" />
    <div className="about-container">
      <p>This is my about me page</p>
    </div>
  </>
)

export default withLayout(AboutPage)
