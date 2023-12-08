import SignUp from "../components/auth/SignUp";
import { redirect, json } from "react-router-dom";
import ApiService, { setBearerToken } from "../components/api/ApiService";

const SignUpPage = () => {
  return <SignUp />;
};

export default SignUpPage;

export async function action({ request }) {
  const data = await request.json();

  try {
    const response = await ApiService.post("signup", {
      name: data.name,
      email: data.email,
      password: data.password,
    });

    const resData = await response.data;
    const token = resData.token;

    localStorage.setItem("token", token);

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 24);
    localStorage.setItem("expiration", expiration.toISOString());
    setBearerToken(token);
    return redirect("/");
  } catch (error) {
    return json({ message: error.response.data.message }, { status: 500 });
  }
}
