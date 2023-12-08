import Account from "../components/setting/account";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  redirect,
  useNavigation,
  useLoaderData,
  json,
  useActionData,
} from "react-router-dom";
import { checkAuth } from "../components/util/auth";
import ApiService from "../components/api/ApiService";

const AccountSettingPage = () => {
  const navigation = useNavigation();
  const actionData = useActionData();
  const data = useLoaderData();
  return (
    <>
      {navigation.state === "loading" ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Account data={data.data} actionData={actionData} />
      )}
    </>
  );
};

export default AccountSettingPage;

export async function loader() {
  const response = await ApiService.get("/user");
  if (response.status !== 200) {
    throw json({ response: "Could not fetch Data." }, { status: 500 });
  } else {
    return response;
  }
}

export async function action({ request }) {
  if (!checkAuth()) return redirect("/login");
  const data = await request.json();
  try {
    const response = await ApiService.put("updateAccount", {
      name: data.name,
      cpassword: data.cpassword,
      password: data.password,
    });

    return { success: response };
  } catch (error) {
    console.error("Error Account Update:", error);
    return { error: error };
  }
}
