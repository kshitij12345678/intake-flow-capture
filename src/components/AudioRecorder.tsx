
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, Square, Mic, RotateCcw } from 'lucide-react';

interface AudioRecorderProps {
  onAudioReady: (blob: Blob | null) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onAudioReady }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(blob);
        setRecordedAudio(audioUrl);
        onAudioReady(blob);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setIsPaused(false);
      setDuration(0);
      startTimer();
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        setIsPaused(false);
        startTimer();
      } else {
        mediaRecorderRef.current.pause();
        setIsPaused(true);
        stopTimer();
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      stopTimer();
    }
  };

  const playRecording = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const resetRecording = () => {
    setRecordedAudio(null);
    setDuration(0);
    setCurrentTime(0);
    setIsPlaying(false);
    onAudioReady(null);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Timer Display */}
      <div className="text-3xl font-mono font-bold text-gray-700 bg-gray-100 px-4 py-2 rounded-lg">
        {formatTime(isRecording ? duration : currentTime)}
      </div>

      {/* Recording Controls */}
      {!recordedAudio ? (
        <div className="flex flex-col items-center space-y-4">
          {!isRecording ? (
            <Button
              onClick={startRecording}
              size="lg"
              className="w-24 h-24 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Mic size={32} />
            </Button>
          ) : (
            <div className="flex space-x-4">
              <Button
                onClick={pauseRecording}
                size="lg"
                className="w-16 h-16 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg"
              >
                {isPaused ? <Play size={24} /> : <Pause size={24} />}
              </Button>
              <Button
                onClick={stopRecording}
                size="lg"
                className="w-16 h-16 rounded-full bg-gray-600 hover:bg-gray-700 text-white shadow-lg"
              >
                <Square size={24} />
              </Button>
            </div>
          )}
          
          <p className="text-center text-gray-600 text-sm">
            {!isRecording 
              ? "Tap the record button to start"
              : isPaused 
                ? "Recording paused - tap to resume or stop"
                : "Recording in progress..."
            }
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          {/* Audio Player */}
          <audio
            ref={audioRef}
            src={recordedAudio}
            onLoadedMetadata={() => {
              if (audioRef.current) {
                setDuration(Math.floor(audioRef.current.duration));
              }
            }}
            onTimeUpdate={() => {
              if (audioRef.current) {
                setCurrentTime(Math.floor(audioRef.current.currentTime));
              }
            }}
            onEnded={() => {
              setIsPlaying(false);
              setCurrentTime(0);
            }}
          />
          
          <div className="flex space-x-4">
            <Button
              onClick={playRecording}
              size="lg"
              className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </Button>
            <Button
              onClick={resetRecording}
              size="lg"
              variant="outline"
              className="w-16 h-16 rounded-full border-2 border-gray-400 hover:bg-gray-100"
            >
              <RotateCcw size={24} />
            </Button>
          </div>
          
          <p className="text-center text-green-600 text-sm font-medium">
            ✓ Recording ready for submission
          </p>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
