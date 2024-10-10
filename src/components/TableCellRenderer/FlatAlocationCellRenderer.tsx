import { FC } from "react"
import OffCanvasForFlatAllocation from "../shared/OffCanvasForFlatAllocation";
interface FlatAlocationProps {
    data: any
}
const FlatAlocationCellRenderer: FC<FlatAlocationProps> = ({ data }) => {
    console.log("rowData...", data);

    if (!data.user_id) return <OffCanvasForFlatAllocation data={data}/>
    else return <span className="badge text-bg-success">Allocated</span>

    // return (<>
    //     <OffCanvasForFlatAllocation />
    // </>)

}

export default FlatAlocationCellRenderer