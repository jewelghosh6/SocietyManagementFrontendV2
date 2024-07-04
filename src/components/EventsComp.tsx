import { useState } from "react";
import QRCodeGenerator from "./QRCodeGenerator";

const EventsComp = () => {
  const [payeeAddress, setPayeeAddress] = useState<string>('');
  const [payeeName, setPayeeName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [transactionNote, setTransactionNote] = useState<string>('');
  const [upiUrl, setUpiUrl] = useState<string>('');

  const generateUpiUrl = () => {
    const url = `upi://pay?pa=${payeeAddress}&pn=${payeeName}&am=${amount}&cu=INR&tn=${transactionNote}`;
    console.log(url);

    setUpiUrl(url);
  };
  return (
    <div>EventsComp
      <div>
        <h1>UPI Payment QR Code Generator</h1>
        <input
          type="text"
          value={payeeAddress}
          onChange={(e) => setPayeeAddress(e.target.value)}
          placeholder="Payee VPA (e.g., example@upi)"
        />
        <input
          type="text"
          value={payeeName}
          onChange={(e) => setPayeeName(e.target.value)}
          placeholder="Payee Name"
        />
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <input
          type="text"
          value={transactionNote}
          onChange={(e) => setTransactionNote(e.target.value)}
          placeholder="Transaction Note"
        />
        <button onClick={generateUpiUrl}>Generate QR Code</button>

        <div className="d-flex justify-content-center m-3">

          {upiUrl && <QRCodeGenerator upiUrl={upiUrl} />}
        </div>
      </div>

    </div>
  )
}

export default EventsComp