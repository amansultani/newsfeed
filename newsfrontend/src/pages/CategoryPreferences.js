import React from "react";
import CategoryPreference from "../components/preferences/CategoryPreference";
import { redirect, json } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import ApiService from "../components/api/ApiService";
import LoadingIndicator1 from "../components/ui/LoadingIndicator1";
import { checkAuth } from "../components/util/auth";

const CategoryPreferencesPage = () => {
  const navigation = useNavigation();

  return (
    <>
      {navigation.state === "loading" ? (
        <LoadingIndicator1 />
      ) : (
        <CategoryPreference />
      )}
    </>
  );
};

export default CategoryPreferencesPage;

export async function action({ request, params }) {
  if (!checkAuth()) return redirect("/login");
  const data = await request.json();
  const response = await ApiService.put("preferences/category", {
    category_preferences: data.category_preferences,
  });
  // console.log(response);
  if (response.status !== 200) {
    throw json({ response: "Preferences Update faild!" }, { status: 500 });
  } else {
    return redirect("");
  }
}
