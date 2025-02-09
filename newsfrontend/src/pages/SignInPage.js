import SignIn from "../components/auth/SignIn";
import { json, redirect } from "react-router-dom";
import ApiService, { setBearerToken } from "../components/api/ApiService";

const SignInPage = () => {
  return <SignIn />;
};

export default SignInPage;

export async function action({ request }) {
  try {
    const data = await request.formData();
    const authData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    const response = await ApiService.post("login", authData);

    const resData = await response.data;
    const token = resData.token;

    sessionStorage.setItem("token", token);
    setBearerToken(token);
    
    return redirect("/");
  } catch (error) {
    console.error("Error during login:", error);
    return json({ message: error.response.data.message }, { status: 500 });
  }
}
