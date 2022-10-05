import { Route, Routes } from 'react-router-dom';

import Layout from './components/layout';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import PostPage from './pages/Post';
import Login from './pages/Login';

import { AuthProvider } from './utils/context/contexts';
import Signup from './pages/Signup';

export default function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="post/:postId" element={<PostPage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </Layout>
    </AuthProvider>
  );
}
