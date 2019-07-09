import React from "react"

import SEO from "../components/seo"
import { Image } from "../components/image"
import withLayout from "../utils/withLayout"

export const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    <p>Here's Daphne the dachsund to make you feel better.</p>
    <Image />
  </>
)

export default withLayout(NotFoundPage)
