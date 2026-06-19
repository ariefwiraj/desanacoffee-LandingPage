import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from '@/pages/LandingPage';
import { OwnerLoginPage } from '@/pages/OwnerLoginPage';
import { useAuthStore } from '@/store/authStore';

function App() {
  const checkAuth = useAuthStore((s) => s.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/owner/login" element={<OwnerLoginPage />} />
    </Routes>
  );
}

export default App;
