import ApiService from "./ApiService";
import { json } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function fetchSources() {
  const response = await ApiService.get("sources");
  if (response.status !== 200) {
    throw json({ response: "Could not fetch sources." }, { status: 500 });
  } else {
    return await response.data;
  }
}

export async function updateSources(sources) {
  const response = await ApiService.put("preferences/source", {
    source_preferences: sources.source_preferences,
  });
  if (response.status !== 200) {
    throw json({ response: "Preferences Update faild!" }, { status: 500 });
  } else {
    return response;
  }
}
