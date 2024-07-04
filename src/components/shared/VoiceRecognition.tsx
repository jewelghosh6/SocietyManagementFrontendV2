// src/VoiceRecognition.tsx
import { Player } from '@lottiefiles/react-lottie-player';
import React, { useState, useEffect, useRef } from 'react';
import animation from "../../Lottie/voice.json"


interface SpeechRecognitionEvent extends Event {
    resultIndex: number;
    results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string;
}

type VoiceRecognitionProps = {
    setTranscript: (a: any) => void;
}

const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;

const VoiceRecognition: React.FC<VoiceRecognitionProps> = ({ setTranscript }) => {
    const [listening, setListening] = useState<boolean>(false);

    useEffect(() => {
        if (!SpeechRecognition) {
            alert('Your browser does not support speech recognition. Please try Chrome.');
        }
    }, []);

    const handleListen = () => {
        if (playerRef.current) {
            playerRef.current.play();
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setListening(true);
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    setTranscript((prevTranscript: string) => prevTranscript + " " + event.results[i][0].transcript);
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            console.error('Error occurred in recognition: ' + event.error);
        };

        recognition.onend = () => {
            setListening(false);
        };

        if (listening) {
            recognition.stop();
        } else {
            recognition.start();
        }
    };

    const playerRef = useRef<Player | null>(null); // Explicitly type the ref as Player or null

    // const handleLottieIconClick = () => {
    //     if (playerRef.current) {
    //         playerRef.current.play();
    //     }
    // };

    return (
        <div>
            {/* <button className='btn btn_primary' onClick={handleListen}>
                {listening ? 'Stop Listening' : 'Start Listening'}
            </button> */}
            <div className=" voice_type_msg_input " onClick={handleListen}>
                <Player className='cursor_pointer'
                    src={animation} ref={playerRef}
                    style={{ width: "46px", height: "46px" }}
                    loop={false}
                    autoplay={listening} // Set autoplay to false to control playback manually
                />
            </div>
            {/* <p>{transcript}</p> */}
        </div>
    );
};

export default VoiceRecognition;
