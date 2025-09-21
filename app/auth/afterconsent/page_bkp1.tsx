'use client';
import { useSession, useUser } from '@descope/nextjs-sdk/client';
import { useState } from 'react';

function AfterConsentPage() {
  const { isAuthenticated, isSessionLoading, sessionToken } = useSession();
  const { user, isUserLoading } = useUser();
  const [outboundToken, setOutboundToken] = useState(null);
  


  if (isSessionLoading || isUserLoading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <p>Not authenticated</p>;
  }

  const fetchOutboundToken = async () => {
    try {
      const response = await fetch('/api/outbound-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.userId, // or user.loginId depending on your setup
          appId: 'google-calendar'
        })
      });
      
      const data = await response.json();
      setOutboundToken(data.token);
    } catch (error) {
      console.error('Failed to fetch outbound token:', error);
    }
  };

  return (
    <div>
      <h1>Connection Successful!</h1>
      <p>Welcome, {user?.name}</p>
      <button onClick={fetchOutboundToken}>
        Get Google Calendar Token
      </button>
      {outboundToken && (
        <p>Token retrieved successfully!</p>
      )}
    </div>
  );
}
export default AfterConsentPage;