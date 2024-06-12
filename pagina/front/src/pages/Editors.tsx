// import React, { useEffect, useState } from 'react';
// import { fetchProjects } from '../services/api';
// import Table from '../components/Table';

// const Projects: React.FC = () => {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     const getProjects = async () => {
//       const token = localStorage.getItem('token') || '';
//       const data = await fetchProjects(token);
//       setProjects(data);
//     };

//     getProjects();
//   }, []);

//   const columns = React.useMemo(
//     () => [
//       {
//         Header: 'Project ID',
//         accessor: 'id', // Chave correspondente no objeto de dados
//       },
//       {
//         Header: 'Name',
//         accessor: 'name',
//       },
//       {
//         Header: 'Description',
//         accessor: 'description',
//       },
//       {
//         Header: 'Status',
//         accessor: 'status',
//       },
//       // Adicione mais colunas conforme necessário
//     ],
//     []
//   );

//   return (
//     <div>
//       <h1>Projects</h1>
//       <Table columns={columns} data={projects} />
//     </div>
//   );
// };

// export default Projects;
export{}