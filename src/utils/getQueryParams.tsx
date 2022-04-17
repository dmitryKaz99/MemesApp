import { TQueryParams } from "../typesAndInterfaces/types";

export const getQueryParams = (obj: TQueryParams) => {
  const queryParams = Object.entries(obj).map(
    ([key, value]) => `${key}=${value}`
  );
  return "?" + queryParams.join("&");
};
