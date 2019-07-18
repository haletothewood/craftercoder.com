import { useStaticQuery, graphql } from "gatsby"

export const useFixedPlaceholderImage = () => {
  const { placeholderImage } = useStaticQuery(
    graphql`
      query {
        placeholderImage: file(relativePath: { eq: "dachshund.png" }) {
          childImageSharp {
            fixed(width: 200) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `
  )
  return placeholderImage.childImageSharp.fixed
}
