import { useStaticQuery, graphql } from "gatsby"

export const useFixedAboutImage = () => {
  const { placeholderImage } = useStaticQuery(
    graphql`
      query {
        placeholderImage: file(relativePath: { eq: "me.png" }) {
          childImageSharp {
            fluid(maxWidth: 500, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  )
  return placeholderImage.childImageSharp.fluid
}
