import Toast from "../components/ErrorPopup";

export const handleGraphlQLErrors = ({ graphQLErrors }) => {
  Toast({
    popupTitle: graphQLErrors[0].name,
    popupType: "error",
    popupMessage: graphQLErrors[0].message,
  });
};
