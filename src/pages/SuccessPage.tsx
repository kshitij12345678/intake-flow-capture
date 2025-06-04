
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleNewSubmission = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center">
        {/* Success Animation */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <div className="w-16 h-1 bg-green-500 mx-auto rounded-full"></div>
        </div>

        {/* Success Message */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
              Submission Successful!
            </CardTitle>
            <p className="text-gray-600 text-lg">
              Your patient intake information has been successfully submitted to our database.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Confirmation Details */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-center">
                <h3 className="font-semibold text-green-800 mb-2">What happens next?</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Your information has been securely stored</li>
                  <li>• Healthcare providers will review your intake</li>
                  <li>• You will be contacted if additional information is needed</li>
                  <li>• Keep your mobile number active for communication</li>
                </ul>
              </div>
            </div>

            {/* Reference Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-center">
                <h3 className="font-semibold text-blue-800 mb-2">Important Information</h3>
                <p className="text-sm text-blue-700">
                  Your submission has been recorded with timestamp: {new Date().toLocaleString()}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Please keep this reference for your records
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <Button
                onClick={handleNewSubmission}
                size="lg"
                className="w-full py-4 text-lg bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                <Home size={20} className="mr-2" />
                Submit Another Patient Intake
              </Button>
            </div>

            {/* Contact Information */}
            <div className="text-center text-sm text-gray-500 pt-4 border-t">
              <p>
                For questions or concerns, please contact your healthcare provider
                or call the helpline at <strong>1800-XXX-XXXX</strong>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuccessPage;
