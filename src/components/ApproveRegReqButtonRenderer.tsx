import { FC } from "react"
import { BiUserCheck } from "react-icons/bi";
import { useNavigate } from "react-router-dom";


interface EditButtonProps {
  data: any;
  props: any,
  // onClick: (rowData: any) => void; // Function to handle edit click
}

const ApproveRegReqButtonRenderer: FC<EditButtonProps> = (props) => {
  const navigate = useNavigate()
  const handleApprove = () => {
    // Access the row data
    const rowData = props.data;
    console.log('Approve clicked for row:', rowData);
    navigate(`/manage-users/register-request/${rowData.id}`)
    // Perform your approve action here, e.g., make an API call
  };
  return (
    <button className='btn btn-primary ' onClick={handleApprove}
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title="Edit User"
      style={{ padding: "2px 5px" }}>
      <BiUserCheck size={"22px"} />
      Approve
    </button>)
}

export default ApproveRegReqButtonRenderer