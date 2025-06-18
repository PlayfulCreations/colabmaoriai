import React from "react";
import Overview from "../components/dashboard/Overview";
import AITools from "../components/dashboard/AITools";
import Generators from "../components/dashboard/Generators";
import Datasets from "../components/dashboard/Datasets";
import DataTraining from "../components/dashboard/DataTraining";

const Dashboard: React.FC = () => (
  <div className="min-h-screen bg-gray-100 p-4">
    <div className="max-w-3xl mx-auto">
      <Overview />
      <AITools />
      <Generators />
      <Datasets />
      <DataTraining />
    </div>
  </div>
);

export default Dashboard;
