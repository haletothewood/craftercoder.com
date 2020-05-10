import React from "react"

import SEO from "../components/seo"
import withLayout from "../utils/withLayout"

export const AboutPage = () => (
  <>
    <SEO title="Resources" />
    <div className="resources-content">
      <h2>Links</h2>
      <ul className="resource-list">
        <li>
          <a
            className="resource-item"
            href="http://manifesto.softwarecraftsmanship.org/"
          >
            Software Craftsmanship Manifesto
          </a>
        </li>
        <li>
          <a
            className="resource-item"
            href="https://en.wikipedia.org/wiki/Software_craftsmanship"
          >
            Software Craftsmanship Wiki Page
          </a>
        </li>
        <li>
          <span>
            <a
              className="resource-item"
              href="https://www.martinfowler.com/bliki/BeckDesignRules.html"
            >
              4 Rules of Simple Design
            </a>{" "}
            - Martin Fowler's blog post
          </span>
        </li>
      </ul>
      <h2>Katas</h2>
      <ul className="resource-list">
        <li>
          <a className="resource-item" href="http://katalyst.codurance.com">
            Katalyst by Codurance
          </a>{" "}
          - A series of katas ranging in difficulty
        </li>
      </ul>
      <h2>Learning</h2>
      <ul className="resource-list">
        <li>
          <a
            className="resource-item"
            href="https://www.coursera.org/learn/learning-how-to-learn"
          >
            Learn How To Learn
          </a>{" "}
          - Tools to help you master tough subjects
        </li>
        <li>
          <a
            className="resource-item"
            href="https://www.exercism.io"
          >
            Exercism
          </a>{" "}
          - Code practice and mentorship
        </li>
        <li>
          <a
            className="resource-item"
            href="http://codekata.com/"
          >
            Code Kata
          </a>{" "}
          - A collection of 45-60 min katas to hone your skills
        </li>
      </ul>
    </div>
  </>
)

export default withLayout(AboutPage)
