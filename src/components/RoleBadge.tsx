import { FC } from "react"

interface RoleBadgeProps {
    data: any;
    roleName: any,
    onClick: (rowData: any) => void; // Function to handle edit click
}

const RoleBadge: FC<RoleBadgeProps> = (roleName) => {
    console.log("roleName.data.value", roleName.data.roles[0]?.role_name);

    return (
        <span className="badge text-bg-primary role_badge">{roleName.data.roles[0]?.role_name}</span>
    )
}

export default RoleBadge