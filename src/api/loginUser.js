import { instance } from ".";

export default async function loginUser({ email, password }) {
  return await instance.post("/login", {
    email,
    password,
  });
}
