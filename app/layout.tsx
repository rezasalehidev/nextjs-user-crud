"use client"
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import './globals.css';
import ErrorBoundary from '@/components/Error';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>Sample</title>
      </head>
      <body>
        <Provider store={store}>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
