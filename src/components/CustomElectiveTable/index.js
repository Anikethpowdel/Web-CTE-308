import React, { useEffect } from 'react';

const ElectivesTable = () => {
  useEffect(() => {
    fetch('https://node-api-6l0w.onrender.com/api/v1/students/electives/P08')
      .then(response => response.json())
      .then(data => {
        const table = document.getElementById('moduleTable');

        // Extract and reorder specific columns (mcode, ename, specilization, eid)
        const filteredData = data.map(({ mcode, ename, specilization, eid }) => ({ mcode, ename, specilization, eid }));

        // Loop through the data and identify distinct 'eid' values
        const distinctEids = [...new Set(data.map(item => item.eid))];

        // Create a row for each 'eid' value with its respective data
        distinctEids.forEach(eid => {
          const filteredByEid = filteredData.filter(row => row.eid === eid);

          // Create a header row for each 'eid'
          const headerRow = table.insertRow();
          const headerCell = headerRow.insertCell();
          headerCell.colSpan = 3;
          headerCell.textContent = `Elective ${eid}`;
          headerCell.style.textAlign = 'center';

          // Populate table with the filtered data for each 'eid'
          filteredByEid.forEach(rowData => {
            const row = table.insertRow();
            // Exclude 'eid' from being displayed in the table
            const { eid, ...rowDataWithoutEid } = rowData;
            Object.values(rowDataWithoutEid).forEach(value => {
              const cell = row.insertCell();
              cell.textContent = value;
            });
          });
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div id="table-container">
      <table border="1" id="moduleTable" style={{ borderCollapse: 'collapse' }} >
        {/* Initial Table header */}
        <thead>
          <tr>
            <th>Module Code</th>
            <th>Module Name</th>
            <th>Specialization</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default ElectivesTable;
