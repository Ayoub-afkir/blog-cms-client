import {
  Link,
  Outlet,
} from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div>
      <nav className="bg-gray-800 text-white p-4">
        <Link to="/" className="mr-4">
          Dashboard
        </Link>
        <Link to="/posts" className="mr-4">
          Posts
        </Link>
        <Link to="/categories" className="mr-4">
          Categories
        </Link>
        <Link to="/logout" className="float-right">
          Logout
        </Link>
      </nav>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
