import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-700 text-gray-200 px-6 py-5">
      <div className="flex justify-between">
        <div className="">
          <h2 className="text-lg font-bold">Career Boat</h2>
          <p className="text-gray-400 text-sm">
            Empowering your career choices
          </p>
        </div>
        <div className="">
          <a href="https://x.com/Anant67584324" target="_blank" className="hover:text-blue-400">Twitter</a><br/>
          <a href="https://www.linkedin.com/in/sastrula-anant-780780212/" target="_blank" className="hover:text-blue-400">LinkedIn</a><br/>
          <a href="https://www.instagram.com/nr_anant/" target="_blank" className="hover:text-blue-400">Instagram</a>
        </div>
        <div className="text-right">
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
