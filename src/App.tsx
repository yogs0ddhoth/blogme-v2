import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import PostPage from './pages/Post';
import Login from './pages/Login';

import { AuthProvider } from './utils/context/contexts';

export default function App() {

  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path='/'>
            <Route index element={<Home/>} />
            <Route path='dashboard' element={<Dashboard/>} />
            <Route path='post/:postId' element={<PostPage/>} />
            <Route path='login' element={<Login/>} />
          </Route>
        </Routes>
      </Layout>
    </AuthProvider>
  );
};