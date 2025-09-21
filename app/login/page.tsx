"use client";
import { useDescope } from "@descope/nextjs-sdk/client";
import { useCallback } from "react";

export default function LoginPage() {
  const sdk = useDescope();

  const handleGoogleLogin = useCallback(async () => {
    const redirectURL = `${window.location.origin}/auth/callback`; // tumhara callback
    // Descope OAuth start -> Google pe redirect
    const resp = await sdk.oauth.start.google(redirectURL);
    console.log('OAuth start response', resp);
    if (resp.ok) {
      // resp.data.url me provider URL milta hai; SDK usually redirect kar deta hai.

      console.log("OAuth start successful, redirecting to:", resp?.data?.url);
      console.log('response url', resp?.data?.url);
      console.log('response data', resp?.data);
      setTimeout(() => {
        window.location.href = resp?.data?.url || "";
      }, 1000);
    } else {
      console.error("OAuth start failed", resp);
    }
  }, [sdk]);

  return <button onClick={handleGoogleLogin}>Continue with Google</button>;
}
