import { Navigate, Route, Routes } from 'react-router-dom';

import BoardLayout from '../components/BoardLayout';
import RequireAuth from '../components/RequireAuth';
import AuthorizationPage from '../pages/AuthorizationPage/AuthorizationPage';
import PostListPage from '../pages/PostListPage/PostListPage';
import PostCreatePage from '../pages/PostCreatePage/PostCreatePage';
import PostDetailPage from '../pages/PostDetailPage/PostDetailPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<AuthorizationPage />} />

      <Route element={<BoardLayout />}>
        <Route path='/posts' element={<PostListPage />} />
        <Route path='/posts/:postId' element={<PostDetailPage />} />

        <Route element={<RequireAuth />}>
          <Route path='/posts/new' element={<PostCreatePage />} />
        </Route>
      </Route>

      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}

export default AppRoutes;
