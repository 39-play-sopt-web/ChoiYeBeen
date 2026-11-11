import { useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function RequireAuth() {
  const navigate = useNavigate();
  const hasNotified = useRef(false);

  const authorizationCode = localStorage.getItem('authorizationCode');

  useEffect(() => {
    if (authorizationCode || hasNotified.current) {
      return;
    }

    hasNotified.current = true;

    alert('먼저 회원 코드를 발급받아 주세요.');
    navigate('/', { replace: true });
  }, [authorizationCode, navigate]);

  return authorizationCode ? <Outlet /> : null;
}

export default RequireAuth;
