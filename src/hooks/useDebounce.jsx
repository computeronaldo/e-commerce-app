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

    const fetchData = async (url) => {
      setLoading(true);
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          }
          setError(null);
          setData(data);
        })
        .catch((error) => {
          setData([]);
          setError(error.message);
        })
        .finally(() => setLoading(false));
    };

    const id = setTimeout(() => fetchData(url), 400);

    return () => {
      clearTimeout(id);
    };
  }, [url]);

  return { data, loading, error };
};
export default useFetch;
