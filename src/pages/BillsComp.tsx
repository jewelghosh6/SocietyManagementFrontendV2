// import WebcamCapture from "./shared/WebcamCapture"

const BillsComp = () => {
  return (
    <div className="m-3  p-4 shadow h-100">
      <div>
        <h5>Manage Bills</h5>
      </div>
      {/* <WebcamCapture /> */}
      <div className="d-flex justify-content-end">
        <button className="btn btn_primary me-4">Configure Bills</button>
        <button className="btn btn_primary">Generated Bills</button>
        {/* <button>Configure Bills</button> */}
      </div>
    </div>
  )
}

export default BillsComp