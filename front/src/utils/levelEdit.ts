import {
  useAddQuestionMutation,
  useAddQuestionToLevelMutation,
} from "../generated/graphql";

export const levelEdit = () => {
  const [
    addQuestionToLevel,
    { data: addQuestionsToLevelData, loading: addQuestionsToLevelLoading },
  ] = useAddQuestionToLevelMutation();

  const [removeQuestioFromLevel, { data, loading }] = useRemoveLevelFromQuestionMutation();
};
