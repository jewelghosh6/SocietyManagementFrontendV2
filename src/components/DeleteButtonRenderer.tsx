
import { FC } from 'react';
import { AiOutlineUserDelete } from "react-icons/ai";

interface EditButtonProps {
    onClick: (rowData: any) => void; // Function to handle edit click
}

const DeleteButtonRenderer: FC<EditButtonProps> = ({ onClick }) => {
    return (
        <button className='btn btn-primary ' onClick={onClick}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Edit User"
            style={{ padding: "2px 5px" }}>
            <AiOutlineUserDelete size={"22px"} />
        </button>
    );
};

export default DeleteButtonRenderer;