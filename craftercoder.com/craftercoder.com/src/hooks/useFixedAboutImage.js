import { useStaticQuery, graphql } from "gatsby"

export const useFixedAboutImage = () => {
  const { placeholderImage } = useStaticQuery(
    graphql`
      query {
        placeholderImage: file(relativePath: { eq: "me.jpg" }) {
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
