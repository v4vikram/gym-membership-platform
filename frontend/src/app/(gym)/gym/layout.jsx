// app/(gym)/gym/layout.jsx
import React from "react";

const gymLayout = ({children}) => {
  return (
    <html lang="en">
      <body className="">
        <main>{children}</main>
      </body>
    </html>
  );
};

export default gymLayout;
