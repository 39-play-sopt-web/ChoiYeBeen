import { Navigate, Route, Routes } from 'react-router-dom';

import BoardLayout from './components/BoardLayout';
import AuthorizationPage from './pages/AuthorizationPage';
import PostListPage from './pages/PostListPage';
import PostCreatePage from './pages/PostCreatePage';
import PostDetailPage from './pages/PostDetailPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<AuthorizationPage />} />

      <Route element={<BoardLayout />}>
        <Route path='/posts' element={<PostListPage />} />
        <Route path='/posts/new' element={<PostCreatePage />} />
        <Route path='/posts/:postId' element={<PostDetailPage />} />
      </Route>

      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}

export default App;
