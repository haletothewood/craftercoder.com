import { useStaticQuery, graphql } from "gatsby"

export const useFixedAboutImage = () => {
  const { placeholderImage } = useStaticQuery(
    graphql`
      query {
        placeholderImage: file(relativePath: { eq: "me.jpg" }) {
          childImageSharp {
            fixed(width: 250) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `
  )
  return placeholderImage.childImageSharp.fixed
}
