import React from "react";
import CallForActions from "../components/NoAuth/CallForActions";
import { Cards } from "../components/NoAuth/Cards";
import { Container } from "../components/NoAuth/Container";
import Countdown from "../components/NoAuth/Countdown";
import { Footer } from "../components/Footer";
import Hero from "../components/NoAuth/Hero";
import { Navbar } from "../components/Navbar";
import withApollo from "../utils/createApolloClient";

const Index = () => (
  <Container height="100%">
    <Navbar />
    <Hero />
    <Countdown />
    <Cards />
    <CallForActions />
    <Footer />
  </Container>
);

export default withApollo({ ssr: true })(Index);
