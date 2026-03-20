// Se portfolio est réaliser en React 19 de fais quelques signature classique
// comme JSX.Element deviennent à présent : React.JSX.Element toutefois je suis
// en Typescript 5

import './styles/index.css';
// Connection
import { useNavigate } from "react-router-dom";
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute';
import { useAuth } from './auth/AuthContext';
import Login from './template/pages/Login';

function Home() {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/user'} replace />;
  }

  return (
    <div style={{ background: 'black', color: 'white', minHeight: '100vh', padding: '24px' }}>
      <h1>Mon Portfolio</h1>
      <p>Bienvenue sur mon portfolio.</p>
      <Login />
    </div>
  );
}

function AdminPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ background: '#111', color: 'white', minHeight: '100vh', padding: '24px' }}>
      <h1>Page Admin</h1>
      <p>Bienvenue {user?.username}</p>
      <p>Rôle : {user?.role}</p>

      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
      >
        Déconnexion
      </button>
    </div>
  );
}

function UserPage() {
  const { user, logout } = useAuth();

  return (
    <div style={{ background: '#1a1a1a', color: 'white', minHeight: '100vh', padding: '24px' }}>
      <h1>Page User</h1>
      <p>Bienvenue {user?.username}</p>
      <p>Rôle : {user?.role}</p>

      <button onClick={logout} style={{ marginTop: '16px' }}>
        Déconnexion
      </button>
    </div>
  );
}

// Définir une taille de fenêtre de + de 2000px pour pouvoir scroll down ou up
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user"
        element={
          <ProtectedRoute requiredRole="user">
            <UserPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
