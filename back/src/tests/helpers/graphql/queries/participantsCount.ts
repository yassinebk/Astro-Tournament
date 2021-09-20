import { gql } from "apollo-server-core";

const participantsCount = gql`
  query participantsCount {
    participantsCount
  }
`;

export default participantsCount;
