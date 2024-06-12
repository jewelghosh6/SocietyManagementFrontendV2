import { FC, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'; // Import Bootstrap's Modal component with types
// import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../utils/axiosInstance';
import toast from 'react-hot-toast';


interface MyModalProps {
    show: boolean;
    handleClose: () => void;
    type: string;
    data: any
}

const AddEditFlatsModal: FC<MyModalProps> = ({ type, data, show, handleClose }) => {

    // const { handleSubmit, register, reset } = useForm();
    console.log("data", data);

    // if (type === "Edit") {
    //     const { isPending, error, data } = useQuery({
    //         queryKey: ['flatData'],
    //         queryFn: async () => {
    //             try {
    //                 let resp = await axiosInstance.get(`${config.API_URL}/flats/get-all`);
    //                 console.log("flats/get-all", resp);
    //                 // setFlatsData(resp.data.data)
    //                 return resp.data;
    //             } catch (error) {
    //                 throw error;
    //             }
    //         }
    //     })
    // }
    useEffect(() => {
        console.log("data2-------", data);

        setFormData(data)
    }, [data])

    const [formData, setFormData] = useState<any>({});

    const addFlatHandler = async (e: any) => {
        e.preventDefault()
        try {
            let resp = await axiosInstance.post('/flats/add', formData)
            console.log("resp", resp);
            if (resp.data.success) {
                toast.success(resp.data.message)
                handleModalClose();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editFlatDetailsHandler = async (e: any) => {
        e.preventDefault()
        try {
            let resp = await axiosInstance.patch(`/flats/update/${formData.id}`, formData)
            console.log("resp", resp);
            if (resp.data.success) {
                toast.success(resp.data.message)
                handleModalClose();
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleModalClose = () => {
        handleClose();
        setFormData(null)
        // reset();
    }

    const onChnageHandler = (e: any) => {

        let { name, value } = e.target;
        console.log(name, value);

        setFormData((prevValue: any) => {
            return name === "parking_space_alloted" ? { ...prevValue, [name]: !prevValue["parking_space_alloted"] } :
                { ...prevValue, [name]: value }
        })
    }


    return (
        <Modal show={show} onHide={handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>{type} Flat</Modal.Title>
            </Modal.Header>
            <form onSubmit={type === "Add" ? addFlatHandler : editFlatDetailsHandler}>

                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="flat_number">Flat Number {data?.flat_number}</label>
                                <input type="text"
                                    name='flat_number'
                                    value={formData?.flat_number ?? ""}
                                    // {...register("flat_number", { required: true })}
                                    onChange={onChnageHandler}
                                    className="form-control" id="flat_number" placeholder="" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="building_number">Building Number</label>
                                <input type="text"
                                    name="building_number" onChange={onChnageHandler}
                                    value={formData?.building_number ?? ""}
                                    // {...register("building_number", { required: true })}
                                    className="form-control" id="building_number" placeholder="" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="floor_number">Floor Number</label>
                        <input type="number"
                            name="floor_number" onChange={onChnageHandler}
                            value={formData?.floor_number ?? ""}
                            // {...register("floor_number", { required: true })}
                            className="form-control" id="floor_number" placeholder="" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="flat_area">flat_area</label>
                        <input type="text"
                            name="flat_area"
                            onChange={onChnageHandler}
                            value={formData?.flat_area ?? ""}
                            // {...register("flat_area", { required: true })}
                            className="form-control" id="flat_area" placeholder="" />
                    </div>
                    <div className="form-group">

                        <label htmlFor="total_rooms">total_rooms</label>
                        <input type="number"
                            name="total_rooms"
                            onChange={onChnageHandler}
                            value={formData?.total_rooms ?? ""}
                            // {...register("total_rooms", { required: true })}
                            className="form-control" id="total_rooms" />
                    </div>


                    <div className="form-check">
                        <input className="form-check-input"
                            name="parking_space_alloted"
                            onChange={onChnageHandler}
                            checked={formData?.parking_space_alloted ?? false}
                            // {...register("parking_space_alloted", { required: false })}
                            type="checkbox" id="parking_space_alloted" />
                        <label className="form-check-label" htmlFor="parking_space_alloted">
                            Have parking space
                        </label>
                    </div>

                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-secondary">
                        Close
                    </button>
                    <button className="btn btn-primary" type="submit">
                        {type === "Add" ? "Save" : "Update"}
                    </button>
                </Modal.Footer>
            </form>

        </Modal>
    );
};

export default AddEditFlatsModal;

