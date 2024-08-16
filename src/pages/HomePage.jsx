import { useEffect, useState } from "react";
import { api } from "../utils/axios";
import Card from "../components/Card";
import Loading from "../components/Loading";
import Button from "../components/Button";

export default function HomePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/posts');
        const result = await response.json();
        setData(result.posts || result); // Update data
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <Loading />
        ) : (
          data.map((e, i) => (
            <Card id={e.id} title={e.title} body={e.body} key={i} />
          ))
        )}
      </div>
    </>
  );
}
