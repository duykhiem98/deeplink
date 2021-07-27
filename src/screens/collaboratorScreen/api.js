import { GET, POST, PUT } from "../../api/api";
import { API_URL } from "../../api/config";
import { Alert } from "react-native";


export const requestRegisterCTV = async (params, token) => {
  const bearerToken = "" + token;
  try {
    const response = await POST(API_URL.registerCTV, params, bearerToken, {}, undefined);
    console.log("res register ", response);
    if (typeof response === "object") {
      return response;
    }
    const _res = JSON.parse(response);
    console.log("_res ", _res);
    if (_res.error) {
      Alert.alert(_res.message || "Có lỗi xảy ra");
      return "";
    }
    return _res;
  } catch (err) {
    console.log("error register ctv ", err);
    return "";
  }
};


export const requestCTV = async (params, token) => {
  const bearerToken = "" + token;
  const response1 = await GET(API_URL.CTV, params, bearerToken, {});
  console.log("response1", response1);
  return response1;
};
export const requestCTVSettings = async (params, token) => {
  const bearerToken = "" + token;
  const response2 = await GET(API_URL.Setting, params, bearerToken, {});
  console.log("response2", response2);
  return response2;
};
