import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import DashboardLayout from './pages/DashboardLayout';
import LoginPage from './pages/LoginPage';
// import PostsPage from './pages/PostsPage'; // create later
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<div>Welcome to Dashboard</div>} />
          {/* <Route path="posts" element={<PostsPage />} /> */}
          {/* add more nested routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
