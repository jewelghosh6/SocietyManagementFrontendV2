import { FC } from "react"
interface FlatAlocationProps {
    data: any
}
const FlatAlocationCellRenderer: FC<FlatAlocationProps> = ({ data }) => {
    console.log("rowData...", data);

    if (!data.user_id) return <span className="badge text-bg-info">Not allocated</span>
    else return <span className="badge text-bg-success">Allocated</span>

}

export default FlatAlocationCellRenderer