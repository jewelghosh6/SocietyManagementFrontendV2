// QRCodeGenerator.tsx
import React from 'react';
// import QRCode from 'qrcode.react';

interface QRCodeGeneratorProps {
    upiUrl: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ upiUrl }) => {
    return (
        <div>
            {/* <QRCode value={upiUrl} /> */}
        </div>
    );
};

export default QRCodeGenerator;
