import { User, UserBasicInfo } from "../generated/graphql";

const userLeaderboards = (users: UserBasicInfo[]) => {
  console.log(users);
  const sorteddUsers = users
    .map((u) => {
      return {
        user: u._id,
        score: u.score,
        username: u.username ? u.username : "Error",
      };
    })
    .sort((a, b) => {
      return b.score - a.score;
    });
  return sorteddUsers;
};

export default userLeaderboards;
