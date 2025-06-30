import axios from "axios";

const BASE_URL = "https://6851da218612b47a2c0b6d76.mockapi.io/users";

// Kayıt ol
export const registerUser = async (newUser) => {
  const res = await axios.post(BASE_URL, newUser);
  return res.data;
};

// Giriş yap
export const loginUser = async ({ email, password }) => {
  const res = await axios.get(BASE_URL);
  const users = res.data;

  const matchedUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!matchedUser) throw new Error("Email veya şifre hatalı");

  return {
    user: matchedUser,
    token: "fake-jwt-token-" + matchedUser.id,
  };
};
