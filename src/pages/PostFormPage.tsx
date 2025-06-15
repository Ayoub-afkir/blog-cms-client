import {
  useEffect,
  useState,
} from 'react';

import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import axios from '../api/axios';
import {
  createPost,
  getPost,
  updatePost,
} from '../api/posts';

export default function PostFormPage() {
  const { id } = useParams(); // if editing, `id` exists
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("draft");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [tags, setTags] = useState<number[]>([]);
  const [image, setImage] = useState<File | null>(null);

  const [categories, setCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    axios.get("/categories").then((res) => setCategories(res.data));
    axios.get("/tags").then((res) => setAllTags(res.data));

    if (id) {
      getPost(Number(id)).then((res) => {
        const post = res.data;
        setTitle(post.title);
        setBody(post.body);
        setStatus(post.status);
        setCategoryId(post.category_id);
        setTags((post.tags && post.tags.map((t: any) => t.id)) || []);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("status", status);

    if (categoryId) formData.append("category_id", categoryId.toString());
    tags.forEach((tagId) => formData.append("tags[]", tagId.toString()));
    if (image) formData.append("image", image);

    if (id) {
      await updatePost(Number(id), formData);
    } else {
      await createPost(formData);
    }

    navigate("/posts");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-4">
      <h2 className="text-xl font-semibold">{id ? "Edit" : "Create"} Post</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2"
      />

      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full border px-3 py-2"
        rows={6}
      />

      <select
        value={categoryId ?? ""}
        onChange={(e) => setCategoryId(Number(e.target.value))}
        className="w-full border px-3 py-2"
      >
        <option value="">Select category</option>
        {categories.length > 0 &&
          categories.map((cat: any) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
      </select>

      <div>
        <label className="block mb-1">Tags:</label>
        <div className="flex flex-wrap gap-2">
          {allTags.length > 0 &&
            allTags.map((tag: any) => (
              <label key={tag.id} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={tags.includes(tag.id)}
                  onChange={(e) => {
                    setTags((prev) =>
                      e.target.checked
                        ? [...prev, tag.id]
                        : prev.filter((id) => id !== tag.id)
                    );
                  }}
                />
                {tag.name}
              </label>
            ))}
        </div>
      </div>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border px-3 py-2"
      >
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>

      <input
        type="file"
        onChange={(e) => setImage(e.target.files?.[0] ?? null)}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {id ? "Update" : "Create"} Post
      </button>
    </form>
  );
}
