import React from "react";
import Footer from "../components/Footer";
import {
  CallForActions,
  Countdown,
  Hero,
  Container,
  Cards,
} from "../components/NoAuth";
import withApollo from "../utils/createApolloClient";

const Index = () => {
  return (
    <Container height="100%">
      <Hero />
      <Countdown />
      <Cards />
      <CallForActions />
      <Footer />
    </Container>
  );
};

export default withApollo({ ssr: true })(Index);
