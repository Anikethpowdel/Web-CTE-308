import React, { useEffect, useState } from 'react';

const ModuleTable = () => {
  const [moduleData, setModuleData] = useState([]);

  const fetchAndPopulateData = async (semesterNumber) => {
    try {
      const response = await fetch(`https://node-api-6l0w.onrender.com/api/v1/students/modules/P08/${semesterNumber}`);
      const data = await response.json();

      const reorderedData = data.map(module => ({
        mid: module.mid,
        mname: module.mname,
        lecture_hour: module.lecture_hour,
        tutorial_hour: module.tutorial_hour,
        practical_hour: module.practical_hour,
        module_credit: module.module_credit,
        theory_ca_marks: module.theory_ca_marks,
        theory_exam_marks: module.theory_exam_marks,
        practical_ca_marks: module.practical_ca_marks,
        module_coordinator: module.module_coordinator,
        borrowed_module: module.borrowed_module,
        module_owner: module.module_owner
      }));

      setModuleData(prevData => [
        ...prevData,
        { semester: semesterNumber, modules: reorderedData }
      ]);
    } catch (error) {
      console.error(`Error fetching semester ${semesterNumber} data:`, error);
    }
  };

  useEffect(() => {
    const fetchAllSemestersSequentially = async () => {
      for (let i = 1; i <= 8; i++) {
        await fetchAndPopulateData(i);
      }
    };

    fetchAllSemestersSequentially();
  }, []);

  return (
    <div style={{ overflowX: 'auto' }}>
      {moduleData.map(({ semester, modules }) => (
        <div key={`semester-${semester}`}>
          <h2 style={{ textAlign: 'center' }}>Semester {semester}</h2>
          <table border="1" id={`moduleTable-${semester}`} style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th rowSpan="3">Module ID</th>
                <th rowSpan="3">Module Name</th>
                <th rowSpan="2" colSpan="3">Hours</th>
                <th rowSpan="3">Credit</th>
                <th colSpan="4">Marks</th>
                <th rowSpan="3">Module Coordinator</th>
                <th rowSpan="3">Borrowed Module</th>
                <th rowSpan="3">Module Owner</th>
                <th rowSpan="3">Action</th>
              </tr>
              <tr>
                <th colSpan="2">Theory</th>
                <th colSpan="2">Practical</th>
              </tr>
              <tr>
                <td>Lecture</td>
                <td>Tutorial</td>
                <td>Practical</td>
                <td>Theory CA Marks</td>
                <td>Theory Exam Marks</td>
                <td colSpan="2">Practical CA Marks</td>
              </tr>
            </thead>
            <tbody>
              {modules.map((module, index) => (
                <tr key={`semester-${semester}-module-${index}`}>
                  <td>{module.mid}</td>
                  <td>{module.mname}</td>
                  <td>{module.lecture_hour}</td>
                  <td>{module.tutorial_hour}</td>
                  <td>{module.practical_hour}</td>
                  <td>{module.module_credit}</td>
                  <td>{module.theory_ca_marks}</td>
                  <td>{module.theory_exam_marks}</td>
                  <td colSpan={2}>{module.practical_ca_marks}</td>
                  <td>{module.module_coordinator}</td>
                  <td>{module.borrowed_module}</td>
                  <td>{module.module_owner}</td>
                  <td>Edit</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ModuleTable;
