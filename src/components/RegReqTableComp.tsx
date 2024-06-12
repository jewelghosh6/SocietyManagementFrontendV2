import React, { useLayoutEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import ApproveRegReqButtonRenderer from './TableCellRenderer/ApproveRegReqButtonRenderer';
import config from '../environments/config';
import { axiosInstance } from '../utils/axiosInstance';

interface RowData {
    status: string;
    name: string;
    email: string;
    organization: string;
    requestSource: string;
    requestDate: string;
}

const TableComponent: React.FC = () => {
    const [rowData, setRowData] = useState<RowData[]>([]);


    useLayoutEffect(() => {

        axiosInstance.get(`${config.API_URL}/user/register-request`).then((res: any) => {
            console.log("/register-request", res.data);
            setRowData(res.data.data)

        })


    }, [])

    const columnDefs: ColDef[] = [
        { headerName: "Id", field: "id", minWidth: 50, maxWidth: 70 },
        {
            headerName: 'Name',
            valueGetter: (params: any) => {
                return `${params.data.first_name} ${params.data.last_name}`;
            },
            width: 200
        },
        { headerName: 'Email Id', field: "email_id", minWidth: 100 },
        { headerName: 'Mobile Number', field: "mobile_number", minWidth: 100 },
        { headerName: "Status", field: "" },
        {
            headerName: "Request Date", field: "created_at",
            valueFormatter: (params: any) => {
                const date = new Date(params.value);
                return date.toLocaleString();
            }
        },
        {
            headerName: 'Approve',
            // field: 'editButton', // Field to hold the edit button data
            cellRenderer: ApproveRegReqButtonRenderer, // Use custom cell renderer for edit button
            minWidth: 50, // Adjust the width of the column as needed
            suppressMenu: true, // Hide column menu
            cellRendererParams: {
                onClick: (row: any) => handleApproveClick(row), // Callback function to handle edit button click
            },
        },
    ];

    const handleApproveClick = (row: any) => {
        console.log("handleApproveClick", row);

    }

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
            />
        </div>
    );
};

export default TableComponent;




