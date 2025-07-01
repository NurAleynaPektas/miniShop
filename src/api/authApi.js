import axios from "axios";

const BASE_URL = "https://6851da218612b47a2c0b6d76.mockapi.io/users";

export const registerUser = async (newUser) => {
  const res = await axios.get(BASE_URL);
  const users = res.data;

  const emailExists = users.some((user) => user.email === newUser.email);

  if (emailExists) {
    throw new Error("This email already exists.");
  }

  const createRes = await axios.post(BASE_URL, newUser);
  return createRes.data;
};

export const loginUser = async ({ email, password }) => {
  const res = await axios.get(BASE_URL);
  const users = res.data;

  const matchedUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!matchedUser) throw new Error("Email or password is wrong.");

  return {
    user: matchedUser,
    token: "fake-jwt-token-" + matchedUser.id,
  };
};
