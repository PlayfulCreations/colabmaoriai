import React from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import Overview from "../components/dashboard/Overview";
import AITools from "../components/dashboard/AITools";
import Generators from "../components/dashboard/Generators";
import Datasets from "../components/dashboard/Datasets";
import DataTraining from "../components/dashboard/DataTraining";

const Dashboard: React.FC = () => (
  <DashboardLayout>
    <Overview />
    <div className="grid md:grid-cols-2 gap-8 mt-8">
      <div>
        <AITools />
        <Generators />
      </div>
      <div>
        <Datasets />
        <DataTraining />
      </div>
    </div>
  </DashboardLayout>
);

export default Dashboard;
