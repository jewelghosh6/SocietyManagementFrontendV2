
import { FC, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { axiosInstance } from '../../utils/axiosInstance';

interface Props {
    data: {
        "id": number,
        "flat_number": number,
        "building_number": string,
        "floor_number": number,
        "flat_area": number,
        "total_rooms": number,
        "parking_space_alloted": boolean,
        "user_id": number,
        "user": any
    }
}

const OffCanvasForFlatAllocation: FC<Props> = ({ data }) => {
    const [show, setShow] = useState(false);
    const [flatOwnerList, setFlatOwnerList] = useState([]);
    const [userId, setUserId] = useState<null | number>(null)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        if (show) fetchFlatOwnersList()
    }, [show])

    const fetchFlatOwnersList = async () => {
        try {
            let resp = await axiosInstance.get('/user/flat-owner-list');
            console.log(resp);
            setFlatOwnerList(resp.data.data)
        } catch (error) {
            console.error(error);
        }
    }

    const allocateFlatToUser = async () => {
        try {
            let resp = await axiosInstance.patch(`/flats/update/${data.id}`, { user_id: userId });
            console.log(resp);

        } catch (error) {
            console.error(error);
        }
    }

    const flatOwnerOptionChangeHandler = (e: any) => {
        // console.log(e.target.value);
        let user_id = e.target.value;
        setUserId(user_id);
    }



    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Allocate now
            </Button>

            <Offcanvas show={show} onHide={handleClose} placement={'end'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Flat Allocation</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {/* <form action=""> */}
                    <div className='mb-3'>
                        <h3 className='text-center'>Flat Info:</h3>
                        <div className='mb-2'>
                            <span>Flat ID: {data.id}</span>
                        </div>
                        <div className='mb-2'>
                            <span>Flat NO: {data.building_number + " " + data.flat_number}</span>
                        </div>
                        <div className='mb-2'>
                            <span>Floor Number: {data.floor_number}</span>
                        </div>
                        <div className='mb-2'>
                            <span>Area: {data.flat_area}</span>
                        </div>
                        <div className='mb-2'>
                            <span>Total Rooms: {data.total_rooms}</span>
                        </div>
                        <div className='mb-2'>
                            <span>Parking: {data.parking_space_alloted ? "Yes" : "No"}</span>
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="">Flat owners list</label>
                        <select className="form-select" aria-label="Default select example" onChange={(e) => flatOwnerOptionChangeHandler(e)}>
                            <option selected>Open this select menu</option>
                            {
                                flatOwnerList.map((item: any) => {
                                    return (<>
                                        <option value={item.id}>{item.first_name + " " + item.last_name}</option>
                                    </>)
                                })
                            }

                        </select>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button className='btn btn_primary' type="button" onClick={allocateFlatToUser}>Allocate</button>
                    </div>
                    {/* </form> */}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default OffCanvasForFlatAllocation;