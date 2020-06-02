import { post } from "../../../utils/api";
export function sendLoginAPI(data) {
  // const token = localStorage.getItem('token');
  const url = "/api/user/login";
  return post({ url, data });
}

export function sendLogoutAPI(data) {
  // const token = localStorage.getItem("token");
  // const headersAuthen = `Bearer ${token}`;
  const url = "/api/v1/customer/sign_out";
  return post({ url, data });
}



export const reFreshToken = async access_token => {
//  const token = localStorage.getItem("token");
  const headersAuthen = `Bearer ${access_token}`;
  const url = '/user/refresh_token';
  return post({url, headersAuthen});
};