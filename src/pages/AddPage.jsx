import { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function AddPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://dummyjson.com/posts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 1,
          title: title,
          body: body,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Add result:', result);
        setAdded(true);
        setTitle("");
        setBody("");
        setTimeout(() => {
          navigate('/');
        }, 500);
      } else {
        console.error('Add failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (

    <form onSubmit={handleSubmit} className="max-w-screen-lg mx-auto p-4">
      <h4 className="mb-4 text-4xl">Add A New Post</h4>
      <label htmlFor="title" className="block mb-2 text-sm font-medium">Title</label>
      <input
        id="title"
        className="form-control"
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="desc" className="block mb-2 text-sm font-medium">Description</label>
      <textarea
        id="desc"
        className="form-control form-control-lg"
        placeholder="Post Description"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows="4"
        required
      />
      <Button>ADD POST</Button>
      {added && (
        <div className="p-4 mb-4 text-sm rounded-lg bg-blue-50" role="alert">
          <span className="font-medium">Post Added SUCCESSFULLY</span>
        </div>
      )}
    </form>
  );
}
