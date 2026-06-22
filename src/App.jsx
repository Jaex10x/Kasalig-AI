import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import Help from './pages/Help';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import TrackApplication from './pages/TrackApplication';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/track" element={<TrackApplication />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;