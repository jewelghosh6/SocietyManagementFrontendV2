import { FC } from 'react';
import { FaUserEdit } from "react-icons/fa";

interface EditButtonProps {
    onClick: (rowData: any) => void; // Function to handle edit click
}

const EditButtonRenderer: FC<EditButtonProps> = ({ onClick }) => {
    return (
        <button className='btn btn-primary ' onClick={onClick}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Edit User"
            style={{ padding: "2px 5px" }}>
            <FaUserEdit size={"22px"} />
        </button>
    );
};



export default EditButtonRenderer;