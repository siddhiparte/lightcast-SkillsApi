import React from "react";
import "./globals.css"; // Import global styles if you have any

export const metadata = {
  title: "Skill Mapping",
  description: "A page to fetch and display related skills using Lightcast API",
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>Lightcast Skills </h1>
          
        </header>
        <main>{children}</main>
        
      </body>
    </html>
  );
};

export default Layout;
