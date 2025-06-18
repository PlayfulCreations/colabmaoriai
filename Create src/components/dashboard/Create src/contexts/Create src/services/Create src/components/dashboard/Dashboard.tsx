import React from "react";
import Generators from "./Generators";

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <Generators />
      {/* Add other dashboard widgets/components here */}
    </div>
  );
};

export default Dashboard;
