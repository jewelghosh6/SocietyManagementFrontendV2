// WebcamCapture.tsx
import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture: React.FC = () => {
    const webcamRef = useRef<Webcam>(null);
    const [imageSrc, setImageSrc] = useState<string[]>([]);

    const capture = useCallback(() => {
        if (webcamRef.current) {
            const image = webcamRef.current.getScreenshot();
            if (image) {
                setImageSrc((pre) => { return [...pre, image] });
            }
        }
    }, [webcamRef]);

    return (
        <div>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={320}
                height={240}
                videoConstraints={{ facingMode: 'user' }}
            />
            <button className='btn btn_primary' onClick={capture}>Capture photo</button>
            {imageSrc && (
                <div>
                    <h2>Captured Photo:</h2>
                    {
                        imageSrc.map(item => {
                            return <>
                                <img src={item} alt="Captured" />
                            </>
                        }
                        )
                    }
                </div>
            )}
        </div>
    );
};

export default WebcamCapture;
