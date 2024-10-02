// import {
//   useQuery,
// } from '@tanstack/react-query'
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import EditButtonRenderer from '../components/TableCellRenderer/EditButtonRenderer';
import DeleteButtonRenderer from '../components/TableCellRenderer/DeleteButtonRenderer';
import AddEditFlatsModal from '../components/Modals/AddEditFlatsModal';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../utils/axiosInstance';
import config from '../environments/config';
import FlatAlocationCellRenderer from '../components/TableCellRenderer/FlatAlocationCellRenderer';



// Row Data Interface
interface IRow {
  id: number;
  flat_number: string;
  building_number: string;
  floor_number: string;
  flat_area: string;
  total_rooms: string;
  parking_space_alloted: boolean;
  is_allocated: boolean;
  user_id: number;
}


// function Example() {
//   const { isPending, error } = useQuery({
//     queryKey: ['repoData'],
//     queryFn: () =>
//       fetch('https://api.github.com/repos/TanStack/query').then((res) =>
//         res.json(),
//       ),
//   })

//   if (isPending) return 'Loading...'

//   if (error) return 'An error has occurred: ' + error.message

//   return (
//     <div>
//       {/* <h1>{data.name}</h1>
//       <p>{data.description}</p>
//       <strong>👀 {data.subscribers_count}</strong>{' '}
//       <strong>✨ {data.stargazers_count}</strong>{' '}
//       <strong>🍴 {data.forks_count}</strong> */}
//     </div>
//   )
// }

const ManageFlatsComp = () => {

  const { isPending } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () => {
      try {
        let resp = await axiosInstance.get(`${config.API_URL}/flats/get-all`);
        console.log("flats/get-all", resp);
        setFlatsData(resp.data.data)
        return resp.data;
      } catch (error) {
        throw error;
      }
    }
  })
  const [modalType, setModalType] = useState("Add")

  console.log("ispending", isPending);

  const [flatsData, setFlatsData] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [dataToEdit, setDataToEdit] = useState<IRow | null>(null)



  const [colDefs] = useState<ColDef<IRow>[]>([
    { headerName: 'Id', field: "id", minWidth: 30, maxWidth: 50 },
    {
      headerName: 'Flat Info',
      valueGetter: (params: any) => {
        return `${params.data.building_number} ${params.data.flat_number}`;
      },
      minWidth: 80,
      maxWidth: 120
    },
    { headerName: 'Flat Area', field: "flat_area", minWidth: 60, maxWidth: 150 },
    { headerName: 'Total Rooms', field: "total_rooms", minWidth: 60, maxWidth: 150 },
    { headerName: 'Parking space available', field: "parking_space_alloted", minWidth: 80, maxWidth: 180 },
    {
      headerName: 'Allocated ?',
      cellRenderer: FlatAlocationCellRenderer, // Use custom cell renderer for edit button
      editable: true, minWidth: 80, maxWidth: 150,  // Make the column editable if needed
      cellRendererParams: {
        rowData: (params: any) => params.data
      },
    },
    {
      headerName: 'Owner Info',
      valueGetter: (params: any) => {
        return params.data.user ? `${params.data.user.first_name} ${params.data.user.last_name}(${params.data.user_id})` :
          "Not Available"
      },
      minWidth: 80,
      maxWidth: 160
    },
    {
      headerName: 'Edit',
      cellRenderer: EditButtonRenderer, // Use custom cell renderer for edit button
      minWidth: 35, // Adjust the width of the column as needed
      maxWidth: 90,
      suppressMenu: true, // Hide column menu
      cellRendererParams: {
        onClick: handleEditClick,
        rowData: (params: any) => params.data
      },
    },
    {
      headerName: 'Delete',
      cellRenderer: DeleteButtonRenderer, // Use custom cell renderer for edit button
      minWidth: 35, // Adjust the width of the column as needed
      maxWidth: 90,
      suppressMenu: true, // Hide column menu
    },
  ]);

  const modalCloseHandler = () => {
    setShowModal(false);
    setModalType('Add');
  }

  function handleEditClick(row: any) {
    console.log("Row Data", row);
    setModalType('Edit');
    setDataToEdit(row)
    setShowModal(true);
  }

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h5>Manage Flats</h5>
        <div>
          <Link to={'#'} type='button' onClick={() => { setShowModal(true) }} className='btn btn_primary '>Add Flat</Link>
          <Link to={'allocate-flats'} type='button' className='ms-3 btn btn_primary'>Allocate Flat</Link>
        </div>
      </div>
      <div className="flat_table_div">
        <div
          className={"ag-theme-quartz table-container"}
          style={{ width: "100%", height: "300px" }}
        >
          <AgGridReact
            rowData={flatsData}
            columnDefs={colDefs}
            // defaultColDef={defaultColDef}
            // quickFilterText={searchText} // Apply search filter
            pagination={true}
            paginationPageSize={10}
          />
        </div>
      </div>
      <AddEditFlatsModal type={modalType} data={dataToEdit} show={showModal} handleClose={modalCloseHandler} />
    </>
  )
}

export default ManageFlatsComp


