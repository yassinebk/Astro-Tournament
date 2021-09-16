import React from "react";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import CallForActions from "../components/NoAuth/CallForActions";
import { Cards } from "../components/NoAuth/Cards";
import { Container } from "../components/NoAuth/Container";
import Countdown from "../components/NoAuth/Countdown";
import Hero from "../components/NoAuth/Hero";
import withApollo from "../utils/createApolloClient";

const Index = () => {
  return (
    <Container height="100%">
      <Navbar />
      <Hero />
      <Countdown />
      <Cards />
      <CallForActions />
      <Footer />
    </Container>
  );
};

export default withApollo({ ssr: true })(Index);
