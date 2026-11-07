import { Outlet } from 'react-router-dom';

import Header from './Header';

function BoardLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default BoardLayout;
