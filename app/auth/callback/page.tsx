"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDescope } from "@descope/nextjs-sdk/client";

export default function OAuthCallback() {
  const sdk = useDescope();
  const sp = useSearchParams();
  const router = useRouter();
  const [showCalendarDialog, setShowCalendarDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hasExchangedRef = useRef(false);

  useEffect(() => {
    // Prevent multiple code exchanges
    if (hasExchangedRef.current) {
      console.log('Code exchange already completed, skipping...');
      return;
    }

    const code = sp.get("code");
    console.log('Code', code);
    if (!code) {
      console.log('No code found in URL parameters');
      return;
    }

    // Mark that we're about to exchange the code
    hasExchangedRef.current = true;

    (async () => {
      console.log('Exchanging code', code);
      const resp = await sdk.oauth.exchange(code);
      console.log('Exchanged code response', resp);
      localStorage.setItem('userInfo', JSON.stringify(resp?.data?.user));
      localStorage.setItem('userId', JSON.stringify(resp?.data?.user?.userId));
      
      if (resp.ok) {
        // Ab session set ho chuka (SDK tokens store karta hai)
        console.log('OAuth exchange successful, showing calendar dialog');
        setIsLoading(false);
        setShowCalendarDialog(true);
      } else {
        console.error("OAuth exchange failed", resp);
        // Reset the flag if exchange failed so user can retry
        hasExchangedRef.current = false;
        // router.replace("/auth/callback/login?error=oauth_exchange_failed");
      }
    })();
  }, []); // Empty dependency array - runs only once on mount

  const handleGrantCalendarAccess = async () => {
    // TODO: Implement Google Calendar access logic with Descope
    console.log("Granting Google Calendar access...");
    // For now, just close the dialog and redirect
    setShowCalendarDialog(false);
    try {
      const resp = await sdk.outbound.connect('google-calendar', {// You must be logged in to use the connect() function i.e. First complete the OAuth authentication flow with sdk.oauth.exchange(code)
        redirectUrl: window.location.origin + '/auth/afterconsent',
        scopes: [
          'https://www.googleapis.com/auth/calendar', 
          'https://www.googleapis.com/auth/contacts.readonly'
        ]
      });
      console.log('Connection response', resp);
      window.location.href = resp?.data?.url || "";

    } catch (error) {
      console.error('Connection failed:', error);
    }
    // router.replace("/");
  };

  const handleSkipCalendarAccess = () => {
    setShowCalendarDialog(false);
    router.replace("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Finishing sign-in…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {showCalendarDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Connect Google Calendar</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              To provide you with the best experience, we'd like to access your Google Calendar. 
              This will help us sync your events and provide personalized features.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={handleGrantCalendarAccess}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Grant Access
              </button>
              <button
                onClick={handleSkipCalendarAccess}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Skip for Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
