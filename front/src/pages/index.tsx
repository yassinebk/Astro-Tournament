import React from "react";
import CallForActions from "../components/CallForActions";
import { Cards } from "../components/Cards";
import { Container } from "../components/Container";
import Countdown from "../components/Countdown";
import { Footer } from "../components/Footer";
import Hero from "../components/Hero";
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
