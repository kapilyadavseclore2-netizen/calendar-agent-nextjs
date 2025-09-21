import { AuthProvider } from '@descope/nextjs-sdk';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider
      projectId={process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID as string}// Replace with your Project ID
      oidcConfig={true}  
      persistTokens={true} // set to `false` to disable token storage in browser to prevent XSS
      sessionTokenViaCookie={false} // set to `true` to store the session token in a JS cookie instead of localStorage
      storeLastAuthenticatedUser={true} // set to `false` to disable storing last user
      keepLastAuthenticatedUserAfterLogout={false} // set to `true` to persist user info after logout  // Enables OIDC redirect behavior
    >
      <html lang="en">
        <body>{children}</body>
      </html>
    </AuthProvider>
  );
}