import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import DailyGoals from './pages/DailyGoals';
import AIGenerateMyDay from './pages/AIGenerateMyDay';
import EnglishCoach from './pages/EnglishCoach';
import PublicSpeaking from './pages/PublicSpeaking';
import BodyLanguage from './pages/BodyLanguage';
import Fitness from './pages/Fitness';
import InterviewPrep from './pages/InterviewPrep';
import LearningHub from './pages/LearningHub';
import Progress from './pages/Progress';
import Achievements from './pages/Achievements';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { useAuth } from './contexts/AuthContext';

// Redirects unauthenticated users to /login
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a1a',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <div style={{
          width: '40px', height: '40px',
          border: '3px solid rgba(99,102,241,0.2)',
          borderTopColor: '#6366f1',
          borderRadius: '50%',
          animation: 'spin 0.7s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', fontFamily: 'Inter, sans-serif' }}>
          Loading…
        </p>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Protected — all app routes */}
      <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard"       element={<Dashboard />} />
        <Route path="daily-goals"     element={<DailyGoals />} />
        <Route path="generate-my-day" element={<AIGenerateMyDay />} />
        <Route path="english-coach"   element={<EnglishCoach />} />

        {/* Existing secondary sections — preserved */}
        <Route path="public-speaking" element={<PublicSpeaking />} />
        <Route path="body-language"   element={<BodyLanguage />} />
        <Route path="fitness"         element={<Fitness />} />
        <Route path="interview-prep"  element={<InterviewPrep />} />
        <Route path="learning-hub"    element={<LearningHub />} />
        <Route path="progress"        element={<Progress />} />
        <Route path="achievements"    element={<Achievements />} />
        <Route path="profile"         element={<Profile />} />
        <Route path="*"               element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
