import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import Card from "../components/Card";
import useFetch from "../hooks/useFetch";
import Button from "../components/Button";
import { useSearchParams } from "react-router-dom";
import { api } from "../utils/axios";

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [selectedTag, setSelectedTag] = useState(searchParams.get("tag") || "");
  const [tags, setTags] = useState([]);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1); 
  const [data, loading, total] = useFetch('/posts', search, selectedTag, page, 10);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await api.get('https://dummyjson.com/posts/tag-list');
        setTags(res.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);


  useEffect(() => {
    setSearchParams({ q: search, tag: selectedTag, page: page });
  }, [search, selectedTag, page, setSearchParams]);

  const handleSearch = () => {
    setSearchParams({ q: search, tag: selectedTag, page: page });
  };

  const handleTagChange = (e) => {
    const newTag = e.target.value;
    setSelectedTag(newTag);
    setSearchParams((prevParams) => ({
      ...prevParams,
      q:search,
      tag: newTag,
      page: page
    }));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setSearchParams((prevParams) => ({
      ...prevParams,
      page: newPage
    }));
  };

  const totalPages = Math.ceil(total / 10);

  return (
    <>
      <div className="flex items-center gap-2 mb-2">
        <input
          className="border p-2 rounded-md"
          placeholder="Search ..."
          value={search}
          type="text"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button action={handleSearch}>Search</Button>
        <select
          className="border p-2 rounded-md"
          value={selectedTag}
          onChange={handleTagChange}
        >
          <option value="">All Tags</option>
          {tags.map((tag, index) => (
            <option value={tag} key={index}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <Loading />
        ) : (
          data.map((e, i) => (
            <Card id={e.id} title={e.title} body={e.body} key={i} />
          ))
        )}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        <Button
          disabled={page <= 1}
          action={() => handlePageChange(page - 1)}
        >
          Previous
        </Button>
        <span>Page {page} of {totalPages}</span>
        <Button
          disabled={page >= totalPages}
          action={() => handlePageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </>
  );
}
