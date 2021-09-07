import { Text } from "@chakra-ui/react";
import AuthProvider from "../components/Auth";
import { Container } from "../components/Container";
import withApollo from "../utils/createApolloClient";

const Index = () => (
  <AuthProvider>
    <Container height="100vh">
      <Text>Hello </Text>
    </Container>
  </AuthProvider>
);

export default withApollo({ ssr: false })(Index);
