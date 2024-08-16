import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function DeletePost() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/posts/${id}`);
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          console.error('Failed to fetch post:', response.status);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Delete result:', result);
        setDeleted(true);
        setTimeout(() => {
          navigate('/');
        }, 500);
      } else {
        console.error('Delete failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-screen-lg mx-auto p-4">
          <h4 className="mb-4 text-4xl">Delete Post</h4>
          {data && (
            <>
              <p>Are you sure you want to delete the post with the title "{data.title}"?</p>
              <Button type="submit" action={handleDelete} className="mt-4 bg-red-600 text-white">
                Delete Post
              </Button>
            </>
          )}
          {deleted && (
            <div className="p-4 mt-4 mb-4 text-sm rounded-lg bg-red-50" role="alert">
              <span className="font-medium">Post Deleted SUCCESSFULLY</span>
            </div>
          )}
        </div>
      )}
    </>
  );
}
