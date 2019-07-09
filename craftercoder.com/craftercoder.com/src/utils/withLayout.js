import React from "react"

import Layout from "../components/layout"

export default function withLayout(WrappedComponent, props) {
  return class extends React.Component {
    render() {
      return (
        <Layout>
          <WrappedComponent {...props} />
        </Layout>
      )
    }
  }
}
