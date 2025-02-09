import { redirect, json } from "react-router-dom";
import ApiService from "../components/api/ApiService";

export async function action() {
  const response = await ApiService.post("logout");
  if (response.status !== 200) {
    throw json({ response: "Logout Failed" }, { status: 500 });
  } else {
    sessionStorage.removeItem("token"); // Clear token
    sessionStorage.removeItem("expiration"); // Clear expiration time
    return redirect("/login"); // Redirect to login page
  }
}
