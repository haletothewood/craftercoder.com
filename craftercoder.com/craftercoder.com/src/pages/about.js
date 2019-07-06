import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

// import "../styles/about.scss"

export default function AboutPage() {
  return (
    <Layout>
      <SEO title="About" />
      <div className="about-container">
        <p>This is my about me page</p>
      </div>
    </Layout>
  )
}
