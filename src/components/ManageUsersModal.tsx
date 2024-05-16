import { FC } from 'react';
import Modal from 'react-bootstrap/Modal'; // Import Bootstrap's Modal component with types

interface MyModalProps {
    show: boolean;
    handleClose: () => void;
    userData?: any
    // children: React.ReactNode;
}

const ManageUsersModal: FC<MyModalProps> = ({ show, handleClose, userData }) => {
    console.log("userData", userData);

    const onChangeHandler = (e: any) => {
        console.log(e.target?.value);

    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update user details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="first-name">First name</label>
                                <input type="text" value={userData?.first_name} onChange={onChangeHandler} className="form-control" id="first-name" placeholder="Enter your first name" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="last-name">Last name</label>
                                <input type="text" className="form-control" id="last-name" placeholder="Enter your last name" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile-number">Mobile number</label>
                        <input type="text" className="form-control" id="mobile-number" placeholder="Enter your mobile number" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="position">Roles</label>
                        <input type="text" className="form-control" id="position" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="course">Permissions</label>
                        <input type="text" className="form-control" id="course" />
                    </div>
                </form>
            </Modal.Body>

            <Modal.Footer>
                <button className="btn btn-secondary" onClick={handleClose}>
                    Close
                </button>
                <button className="btn btn-primary" onClick={handleClose}>
                    Save
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default ManageUsersModal;
