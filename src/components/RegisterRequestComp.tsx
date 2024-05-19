import TableComponent from "./RegReqTableComp"

const RegisterRequestComp = () => {
    return (
        <div>
            <div className="header_reg_req mb-4">
                <h4>Process User Register Requests</h4>
                <span className="text-secondary fs-13 d-none d-lg-block">
                    The following User Requests are awaiting your approval.When you approve one or more User Requests, you will be
                    asked which Role & premissions they'll be assigned to.
                </span>
            </div>
            <TableComponent />
        </div>
    )
}

export default RegisterRequestComp