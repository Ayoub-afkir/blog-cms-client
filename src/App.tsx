import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* Add more routes later */}
      </Routes>
    </Router>
  );
}

export default App;