"use client";
import { useCallback } from 'react';
// import { useSession, useUser } from '@descope/nextjs-sdk/client';

export default function AfterconsentPage() {
  // const { isAuthenticated, isSessionLoading, sessionToken } = useSession();
  // const { user, isUserLoading } = useUser();
async function createGoogleCalenderEvent(token: string, event: any) {
    const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(event)
    });
    if (!response.ok) {
      throw new Error(`Failed to create event: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Event created', data);
    return data;
}

async function getOutboundToken(appId: string, userId: string, scopes: string[] = []) {
    const projectId = process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID;
    const managementKey = process.env.NEXT_PUBLIC_DESCOPE_MANAGEMENT_KEY;
    
    const response = await fetch('https://api.descope.com/v1/mgmt/outbound/app/user/token/latest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${projectId}:${managementKey}`
      },
      body: JSON.stringify({
        appId,
        userId,
        scopes,
        options: {
          withRefreshToken: false,
          forceRefresh: false
        }
      })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch token: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.token;
  }

    const afterConsent = useCallback(async () => {
        // const currentSession = await session();
        // if (!currentSession) {
        //     console.log('Access Denied');
        //     return;
        // }
        // const userId = "U3293XXIEdbhU4UWiL7EDsVTMMqq";
        const userId = localStorage.getItem('userId'); // This is the user ID you'll need
        console.log('User ID', userId);
        // console.log('Current Session', currentSession);
        const appId = process.env.NEXT_PUBLIC_DESCOPE_OUTBOUND_APP_ID;
        const token = await getOutboundToken(
          appId as string,
          userId as string, 
          [
            "https://www.googleapis.com/auth/calendar",
            "https://www.googleapis.com/auth/contacts.readonly"
          ]
        );
        console.log('Token', token);
        const event = {
          summary: 'Test Event',
          description: 'This is a test event',
          start: {
            dateTime: '2025-09-04T10:00:00+05:30',
            timeZone: "Asia/Kolkata"
          },
          end: {
            dateTime: '2025-09-05T11:00:00+05:30',
            timeZone: "Asia/Kolkata"
          }
        };
        const eventData = await createGoogleCalenderEvent(token.accessToken, event);
        console.log('Event data', eventData);
    }, []);
    // if (isSessionLoading || isUserLoading) {
    //   return <p>Loading...</p>;
    // }
    // if (!isAuthenticated) {
    //   return <p>Not authenticated</p>;
    // }
    return <button onClick={afterConsent}>After consent</button>;
}
