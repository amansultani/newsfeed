import { redirect, json } from "react-router-dom";
import ApiService from "../components/api/ApiService";

export async function action() {
  const response = await ApiService.post("logout");
  if (response.status !== 200) {
    throw json({ response: "Logout Faild" }, { status: 500 });
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    return redirect("/login");
  }
}
