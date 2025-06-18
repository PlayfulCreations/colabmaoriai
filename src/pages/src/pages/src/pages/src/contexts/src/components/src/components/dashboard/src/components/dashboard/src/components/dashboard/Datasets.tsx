import React from "react";

const Datasets: React.FC = () => (
  <section>
    <h3 className="text-xl font-semibold mb-2">Datasets</h3>
    <ul className="list-disc pl-6 space-y-1">
      <li>Upload new dataset</li>
      <li>View existing datasets</li>
      <li>Download sample datasets</li>
      {/* Add dataset management components or features here */}
    </ul>
  </section>
);

export default Datasets;
