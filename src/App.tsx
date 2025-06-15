import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import DashboardLayout from './pages/DashboardLayout';
import LoginPage from './pages/LoginPage';
import PostFormPage from './pages/PostFormPage';
import PostsPage from './pages/PostsPage';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<div>Welcome to Dashboard</div>} />
          <Route path="posts" element={<PostsPage />} />
          <Route path="posts/create" element={<PostFormPage />} />
          <Route path="posts/:id/edit" element={<PostFormPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
