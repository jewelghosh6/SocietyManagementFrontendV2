import { FC } from 'react';
import { FaUserEdit } from "react-icons/fa";

interface EditButtonProps {
    onClick: (rowData: any) => void; // Function to handle edit click
    data: any;
}

const EditButtonRenderer: FC<EditButtonProps> = ({ onClick, data }) => {
    const handleClick = () => {
        // console.log("row>>>>>", data);

        onClick(data); // Pass the row data to the onClick handler
    };

    return (
        <button className='btn btn-primary ' onClick={handleClick}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Edit User"
            style={{ padding: "2px 5px" }}>
            <FaUserEdit size={"22px"} />
        </button>
    );
};



export default EditButtonRenderer;