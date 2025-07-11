import './globals.css';
import { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { FeedbackProvider } from '@/context/FeedbackContext';

export const metadata = {
  title: 'Car Dashboard',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <FeedbackProvider>{children}</FeedbackProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
