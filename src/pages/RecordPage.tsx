
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import AudioRecorder from '../components/AudioRecorder';
import ImageUploader from '../components/ImageUploader';
import LoadingSpinner from '../components/LoadingSpinner';
import { processPatientData } from '../services/api';

const RecordPage = () => {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [aadhaarImage, setAadhaarImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const canSubmit = audioBlob && aadhaarImage;

  const handleSubmit = async () => {
    if (!canSubmit) return;

    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('audioFile', audioBlob, 'recording.webm');
      formData.append('aadhaarImage', aadhaarImage);

      console.log('Submitting patient data...');
      const response = await processPatientData(formData);
      
      // Store the response data for the verify page
      localStorage.setItem('patientData', JSON.stringify(response));
      
      toast({
        title: "Processing Complete",
        description: "Audio and image processed successfully. Please verify the information.",
      });
      
      navigate('/verify');
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Processing Failed",
        description: "Unable to process audio/photo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return <LoadingSpinner message="Processing your audio and photo..." />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-teal-600">Step 1 of 2</span>
          <span className="text-sm text-gray-600">Capture & Upload</span>
        </div>
        <Progress value={50} className="h-2" />
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Patient Intake
        </h1>
        <p className="text-gray-600 text-lg">
          Record your information and upload your Aadhaar card
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Audio Recording Section */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-gray-800 flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              Audio Recording
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AudioRecorder onAudioReady={setAudioBlob} />
          </CardContent>
        </Card>

        {/* Image Upload Section */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-gray-800 flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Aadhaar Photo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUploader onImageSelect={setAadhaarImage} />
          </CardContent>
        </Card>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit}
          size="lg"
          className={`px-12 py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${
            canSubmit
              ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {canSubmit ? 'Submit & Process' : 'Complete Both Steps to Continue'}
        </Button>
      </div>

      {/* Status Indicators */}
      <div className="mt-6 flex justify-center gap-6 text-sm">
        <div className={`flex items-center gap-2 ${audioBlob ? 'text-green-600' : 'text-gray-400'}`}>
          <div className={`w-3 h-3 rounded-full ${audioBlob ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          Audio {audioBlob ? 'Ready' : 'Pending'}
        </div>
        <div className={`flex items-center gap-2 ${aadhaarImage ? 'text-green-600' : 'text-gray-400'}`}>
          <div className={`w-3 h-3 rounded-full ${aadhaarImage ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          Image {aadhaarImage ? 'Ready' : 'Pending'}
        </div>
      </div>
    </div>
  );
};

export default RecordPage;
