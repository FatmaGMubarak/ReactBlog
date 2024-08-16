import { useState, useEffect } from "react";
import { api } from "../utils/axios";

export default function useFetch(params = "", query = "", tag = "", page = 1, limit = 10) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    try {
      let url = 'https://dummyjson.com/posts';
      const skip = (page - 1) * limit;

      if (query) {
        url = `https://dummyjson.com/posts/search?q=${query}`;
      }
      if (tag) {
        url = `https://dummyjson.com/posts/tag/${tag}`;
      }


      const res = await api.get(url, {
        params: {
          limit: limit,
          skip: skip,
        },
      });

      setData(res.data.posts , []);
      setTotal(res.data.total , 0); // Ensure that 'total' exists in the response
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params, query, tag, page, limit]);

  return [data, loading, total];
}