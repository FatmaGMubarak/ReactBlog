import { useState, useEffect } from "react";
import { api } from "../utils/axios";

export default function useFetch(params = "", query = "") {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await api.get(`${params}`, {
        params: { q: query },
      });
      
      if (Object.prototype.hasOwnProperty.call(res.data, "posts")) {
        setData(res.data.posts);
      } else {
        setData(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  return [data, loading];
}
