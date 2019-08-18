import React from "react";
import App, { Container } from "next/app";
import UserContext from "../components/UserContext";

export default class MyApp extends App {
  state = {
    user: "abc"
  };

  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <UserContext.Provider value={{ user: this.state.user }}>
          <Component {...pageProps} />
        </UserContext.Provider>
      </Container>
    );
  }
}
