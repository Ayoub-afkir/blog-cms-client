import {
  useEffect,
  useState,
} from 'react';

import { Link } from 'react-router-dom';

import {
  deletePost,
  getPosts,
} from '../api/posts';

interface Post {
  id: number;
  title: string;
  status: string;
  category: { name: string } | null;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then(res => setPosts(res.data));
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure?')) {
      await deletePost(id);
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Posts</h1>
        <Link to="/posts/create" className="bg-blue-600 text-white px-4 py-2 rounded">New Post</Link>
      </div>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id} className="text-center border-t">
              <td className="p-2 border">{post.title}</td>
              <td className="p-2 border">{post.status}</td>
              <td className="p-2 border">{post.category?.name || '-'}</td>
              <td className="p-2 border">
                <Link to={`/posts/${post.id}/edit`} className="text-blue-600 mr-2">Edit</Link>
                <button onClick={() => handleDelete(post.id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
