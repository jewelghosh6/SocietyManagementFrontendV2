import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Tag } from 'primereact/tag';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { useLayoutEffect, useState } from 'react';
import axios from 'axios';
import config from '../environments/config';
const ManageUsers2 = () => {
    const [userData, setUserData] = useState([])
    // const navigate = useNavigate();

    const [registerRequestsData, setRegisterRequestsData] = useState([]);
    const [userToEdit, setUserToEdit] = useState<number>(0);
    useLayoutEffect(() => {
        //For getting all users whose acoount is not under review
        axios.get(`${config.API_URL}/user/view-all`).then(res => {
            // console.log(res);
            setUserData(res.data)
        }).catch(err => console.error(err))

        //For getting No of Register request
        axios.get(`${config.API_URL}/user/register-request`).then((res: any) => {
            console.log("/register-request", res.data);
            setRegisterRequestsData(res.data.data)

        })


    }, [])
    // const [customers, setCustomers] = useState(null);
    // const [filters, setFilters] = useState({
    //     global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    //     name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    //     'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    //     representative: { value: null, matchMode: FilterMatchMode.IN },
    //     status: { value: null, matchMode: FilterMatchMode.EQUALS },
    //     verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    // });
    // const [loading, setLoading] = useState(true);
    return (
        <div className="card">
            <DataTable value={userData} paginator rows={10} dataKey="id" filterDisplay="row"
                emptyMessage="No customers found.">
                <Column field="first_name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                <Column header="last_name" field="last_name" style={{ minWidth: '12rem' }} filter filterPlaceholder="Search by country" />
                <Column header="email_id" field="email_id" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }}
                    filter />
                <Column field="mobile_number" header="mobile_number" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} filter />
                <Column field="is_active" header="is_active" dataType="boolean" style={{ minWidth: '6rem' }} filter />
            </DataTable>
        </div>
    )
}

export default ManageUsers2