import { Alert } from "react-native";

import capitalizedText from "./textCapitalizer";

export const handleApiResponse = ({ response, onError, onSuccess }) => {
  if (!response) {
    throw new Error("No response provided");
  }

  const result = response.data;
  if (result.errors) {
    Alert.alert("Error", capitalizedText(result.message));
    onError && onError(result);
    console.log(result.errors);
    return;
  }

  onSuccess && onSuccess(result);
  // console.log(result);
};

export const handleApiError = ({
  error,
  handleErrors,
  defaultAlert = false,
  defaultAlertTitle,
}) => {
  if (!error) {
    throw new Error("No error provided");
  }

  const errorResponse = error.response;
  if (!errorResponse) {
    console.log(error.request);
    Alert.alert("No response", capitalizedText(error.message));
    handleErrors && handleErrors(error);
    return;
  }

  const responseErrors = errorResponse.data;
  if (defaultAlert) {
    Alert.alert(defaultAlertTitle, capitalizedText(responseErrors.message));
  }

  handleErrors && handleErrors(responseErrors);
  console.log(responseErrors);
};
