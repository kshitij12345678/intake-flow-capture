
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import PatientProfileSection from '../components/form-sections/PatientProfileSection';
import HealthcareAccessSection from '../components/form-sections/HealthcareAccessSection';
import HabitLifestyleSection from '../components/form-sections/HabitLifestyleSection';
import { submitToFirebase } from '../services/firebase';

const VerifyPage = () => {
  const [patientData, setPatientData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem('patientData');
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setPatientData(data);
        console.log('Loaded patient data:', data);
      } catch (error) {
        console.error('Error parsing patient data:', error);
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleDataChange = (section: string, newData: any) => {
    setPatientData((prev: any) => ({
      ...prev,
      [section]: newData
    }));
    setHasChanges(true);
  };

  const handleSubmitToFirebase = async () => {
    if (!patientData) return;

    setIsSubmitting(true);
    
    try {
      console.log('Submitting to Firebase:', patientData);
      const docId = await submitToFirebase(patientData);
      
      toast({
        title: "Success!",
        description: `Patient data submitted successfully. Document ID: ${docId}`,
      });
      
      // Clear stored data
      localStorage.removeItem('patientData');
      
      navigate('/success');
    } catch (error) {
      console.error('Firebase submission error:', error);
      toast({
        title: "Submission Failed",
        description: "Check your internet connection and retry.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    navigate('/');
  };

  if (!patientData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-teal-600">Step 2 of 2</span>
          <span className="text-sm text-gray-600">Verify & Confirm</span>
        </div>
        <Progress value={100} className="h-2" />
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Verify Information
        </h1>
        <p className="text-gray-600 text-lg">
          Please review and confirm all information before submitting
        </p>
      </div>

      {/* Form Sections */}
      <div className="space-y-8">
        <PatientProfileSection
          data={patientData.PatientProfile}
          onChange={(data) => handleDataChange('PatientProfile', data)}
        />
        
        <HealthcareAccessSection
          data={patientData.HealthcareAccess}
          onChange={(data) => handleDataChange('HealthcareAccess', data)}
        />
        
        <HabitLifestyleSection
          data={patientData.HabitAndLifestyle}
          onChange={(data) => handleDataChange('HabitAndLifestyle', data)}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 mb-8">
        <Button
          onClick={goBack}
          variant="outline"
          size="lg"
          className="px-8 py-4 text-lg"
        >
          Back to Recording
        </Button>
        
        <Button
          onClick={handleSubmitToFirebase}
          disabled={isSubmitting}
          size="lg"
          className="px-8 py-4 text-lg bg-teal-600 hover:bg-teal-700 text-white"
        >
          {isSubmitting ? 'Submitting...' : 'Confirm & Submit to Firebase'}
        </Button>
      </div>

      {hasChanges && (
        <div className="text-center text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-3">
          ⚠️ You have made changes. Please review before submitting.
        </div>
      )}
    </div>
  );
};

export default VerifyPage;
