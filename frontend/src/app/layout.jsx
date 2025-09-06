import React from "react";
import "@/assets/globals.css";

const rootLayout = ({children}) => {
  return (
    <html lang="en">
      <body className="">
        <main>{children}</main>
      </body>
    </html>
  );
};

export default rootLayout;
