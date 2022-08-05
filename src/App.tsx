import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import PostPage from './pages/Post';
import Login from './pages/Login';
import Layout from './components/Layout';
import { AppContext } from 'custom-types';
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
        {/* <Outlet/> */}
      </Layout>
    </AuthProvider>
  );
};