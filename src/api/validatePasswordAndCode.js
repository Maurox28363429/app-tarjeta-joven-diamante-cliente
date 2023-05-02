import { instance } from ".";

export default async function validatePasswordAndCode({ email, code }) {
  return await instance.post("/validateRecovery", {
    email,
    code,
  });
}
