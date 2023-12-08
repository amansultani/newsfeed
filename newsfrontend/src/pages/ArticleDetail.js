import ArticleDetail from "../components/articles/ArticleDetail";
import { useLoaderData, json, useNavigation } from "react-router-dom";
import ApiService from "../components/api/ApiService";
import LoadingIndicator1 from "../components/ui/LoadingIndicator1";

export default function ArticleDetailPage() {
  const data = useLoaderData();
  const navigation = useNavigation();

  return (
    <>
      {navigation.state === "loading" ? (
        <LoadingIndicator1 />
      ) : (
        <ArticleDetail article={data.data.data} />
      )}
    </>
  );
}

export async function loader({ params }) {
  const response = await ApiService.get(
    `categories/${params.categoryId}/news/${params.newsId}`
  );
  if (response.status !== 200) {
    throw json({ response: "Could not fetch Data." }, { status: 500 });
  } else {
    return response;
  }
}
