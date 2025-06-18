import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-white">
    <h1 className="text-4xl font-bold mb-4">Colab Māori AI</h1>
    <p className="text-lg mb-8">A collaborative platform for Māori language and AI projects.</p>
    <Link
      to="/dashboard"
      className="bg-accent text-white px-6 py-3 rounded shadow hover:bg-opacity-90 transition"
    >
      Go to Dashboard
    </Link>
  </div>
);

export default Home;
