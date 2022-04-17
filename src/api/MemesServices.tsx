import axios from "axios";
import { apiConfig } from "./apiConfig";
import { getQueryParams } from "../utils/getQueryParams";
import { TQueryParams } from "../typesAndInterfaces/types";

class MemesServices {
  static async getMemes() {
    const res = await axios.get<any>(apiConfig.GET_URL),
      { data } = await res.data;

    return data;
  }

  static async postMeme(template_id: number, text0: string, text1: string) {
    const params: TQueryParams = {
      template_id,
      username: apiConfig.ACCESS_KEY,
      password: apiConfig.ACCESS_KEY,
      text0,
      text1,
    };

    const res = await axios.post<any>(
        apiConfig.POST_URL + getQueryParams(params)
      ),
      { data } = await res.data;

    return data;
  }
}

export default MemesServices;
