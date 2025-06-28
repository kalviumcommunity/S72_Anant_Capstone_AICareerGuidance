import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-700 text-gray-200 px-4 md:px-6 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:gap-0">
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold">Career Boat</h2>
          <p className="text-gray-400 text-sm">Empowering your career choices</p>
        </div>
        <div className="text-center">
          <a href="https://x.com/Anant67584324" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 block">Twitter</a>
          <a href="https://www.linkedin.com/in/sastrula-anant-780780212/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 block">LinkedIn</a>
          <a href="https://www.instagram.com/nr_anant/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 block">Instagram</a>
        </div>
        <div className="text-center md:text-right">
          <p>Email: support@example.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>
      </div>
      <div className="text-center mt-6 text-gray-500 text-sm">
        © 2025 CareerBoat. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
