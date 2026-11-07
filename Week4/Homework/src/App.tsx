import { Navigate, Route, Routes } from 'react-router-dom';

import AuthorizationPage from './pages/AuthorizationPage';
import PostListPage from './pages/PostListPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<AuthorizationPage />} />
      <Route path='/posts' element={<PostListPage />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}

export default App;
