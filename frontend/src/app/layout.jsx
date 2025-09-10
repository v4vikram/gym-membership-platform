import React from "react";
import "@/assets/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const rootLayout = ({children}) => {
  return (
    <html lang="en">
      <body className="">
        <Navbar/>
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
};

export default rootLayout;
