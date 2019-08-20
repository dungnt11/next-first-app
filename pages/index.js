import { Container } from "next/app";

import Layout from "../components/Layout";
import Navbar from "./../components/Navbar";

export default function() {
  return (
    <Container>
      <Layout>
        <Navbar />
        <h1>Home page</h1>
      </Layout>
    </Container>
  );
}
