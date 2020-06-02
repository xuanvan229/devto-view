import { post, get } from "../../../utils/api";
export function getUser() {
  // const token = localStorage.getItem('token');
  const url = "/users";
  return get({ url });
}

