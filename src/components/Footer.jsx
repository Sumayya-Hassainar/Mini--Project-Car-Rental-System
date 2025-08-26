
import React from "react";

function Footer() {
  return (
    <footer className="bg-indigo-950 text-white text-center p-8 mt-6 ">
      <p>© {new Date().getFullYear()} Car Rental. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
