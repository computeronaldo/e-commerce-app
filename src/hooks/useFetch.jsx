import { useState, useEffect } from "react";
const useFetch = (url, initialData) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (url.includes("title")) {
      const params = new URL(url).searchParams;
      const query = params.get("title");
      if (query === "") {
        setData([]);
        setLoading(false);
        setError(null);
        return;
      }
    }

    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [url]);
  return { data, loading, error };
};
export default useFetch;
