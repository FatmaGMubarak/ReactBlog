import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function EditPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [updated, setUpdated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/posts/${id}`);
        const result = await response.json();
        setData(result);
        setTitle(result.title);
        setBody(result.body);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://dummyjson.com/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title || data.title,
          body: body || data.body,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Update result:', result);
        setUpdated(true);
        setTimeout(() => {
          navigate('/');
        }, 500);
      } else {
        console.error('Update failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <>
      {!data ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit} className="max-w-screen-lg mx-auto p-4">
          <h4 className="mb-4 text-4xl">Edit Post</h4>
          <label htmlFor="title" className="block mb-2 text-sm font-medium">Title</label>
          <input
            id="title"
            className="form-control"
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="desc" className="block mb-2 text-sm font-medium">Description</label>
          <textarea
            id="desc"
            className="form-control form-control-lg"
            placeholder="Post Description"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows="4"
          />
          <Button type="submit" className="btn btn-primary">Update Post</Button>
          {updated && (
            <div className="p-4 mb-4 text-sm rounded-lg bg-blue-50" role="alert">
              <span className="font-medium">Post Updated SUCCESSFULLY</span>
            </div>
          )}
        </form>
      )}
    </>
  );
}
