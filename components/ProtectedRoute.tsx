'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'customer';
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        router.push('/auth/login');
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        
        if (payload.exp <= currentTime) {
          localStorage.removeItem('token');
          router.push('/auth/login');
          return;
        }

        if (requiredRole && payload.role !== requiredRole) {
          router.push('/auth/login');
          return;
        }

        setIsAuthorized(true);
      } catch (error) {
        localStorage.removeItem('token');
        router.push('/auth/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
    
    // Check token expiration every 30 seconds
    const interval = setInterval(checkToken, 30000);
    
    return () => clearInterval(interval);
  }, [router, requiredRole]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}