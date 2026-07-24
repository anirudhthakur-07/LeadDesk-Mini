import './globals.css';

export const metadata = {
  title: 'LeadDesk Digital | Premium Web Engineering & Lead Infrastructure',
  description:
    'High-performance web applications, revenue systems, and digital marketing engines built for scaling businesses.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-dark-bg text-slate-100 min-h-screen flex flex-col font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
