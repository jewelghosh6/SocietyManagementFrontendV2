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

interface VoiceRecognitionProps {
    setTranscript: (transcript: string) => void;
    onChange?: (event: any) => void; // Optional onChange prop
}

const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;

const VoiceRecognition: React.FC<VoiceRecognitionProps> = ({ setTranscript, onChange }) => {
    const [listening, setListening] = useState<boolean>(false);
    const playerRef = useRef<Player | null>(null);

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
            let finalTranscript = '';
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript + ' ';
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            if (finalTranscript) {
                setTranscript(finalTranscript.trim());
                if (onChange) {
                    onChange({ target: { value: finalTranscript.trim() } });
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

    return (
        <div>
            <div className="voice_type_msg_input" onClick={handleListen}>
                <Player
                    className='cursor_pointer'
                    src={animation}
                    ref={playerRef}
                    style={{ width: "46px", height: "46px" }}
                    loop={false}
                    autoplay={listening}
                />
            </div>
        </div>
    );
};

export default VoiceRecognition;
