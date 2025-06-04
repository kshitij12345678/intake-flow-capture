
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronDown, ChevronUp } from 'lucide-react';

interface HealthcareAccessSectionProps {
  data: any;
  onChange: (data: any) => void;
}

const HealthcareAccessSection: React.FC<HealthcareAccessSectionProps> = ({ data, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleFieldChange = (field: string, value: any) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const handleNestedFieldChange = (section: string, field: string, value: string) => {
    onChange({
      ...data,
      [section]: {
        ...(data[section] || {}),
        [field]: value
      }
    });
  };

  const handleCheckboxChange = (field: string, option: string, checked: boolean) => {
    const currentValues = data[field] || [];
    const newValues = checked
      ? [...currentValues, option]
      : currentValues.filter((item: string) => item !== option);
    
    handleFieldChange(field, newValues);
  };

  const previousHealthcareOptions = [
    "Sub-centre", "PHC", "Taluk hospital", "District Hospital", 
    "Private Doctor/Clinic", "Local NGO", "Traditional Healers/quacks", 
    "Local medical stores", "Not applicable", "Did not go for any treatment"
  ];

  const reasonNotSeekingOptions = [
    "High Consultation fees", "High medicines cost", "Long waiting period", 
    "Doctor not available", "Travel distance is more", "No caretaker", 
    "Loss of daily wages", "Others"
  ];

  const problemWithProviderOptions = [
    "High Consultation fees", "High medicines cost", "Long waiting period", 
    "Doctor not available", "Medicines stock out", "Travel distance is more", 
    "Not Applicable", "Others"
  ];

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <CardTitle className="flex items-center justify-between text-xl text-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            Healthcare Access
          </div>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </CardTitle>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Nearest Health Facility */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Nearest Health Facility</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="facilityName">Facility Name</Label>
                <Input
                  id="facilityName"
                  value={data.NearestHealthFacility?.Name || ''}
                  onChange={(e) => handleNestedFieldChange('NearestHealthFacility', 'Name', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="facilityCategory">Category</Label>
                <Select 
                  value={data.NearestHealthFacility?.Category || ''} 
                  onValueChange={(value) => handleNestedFieldChange('NearestHealthFacility', 'Category', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DH">DH (District Hospital)</SelectItem>
                    <SelectItem value="TH">TH (Taluk Hospital)</SelectItem>
                    <SelectItem value="CHC">CHC (Community Health Center)</SelectItem>
                    <SelectItem value="SC/AAM/HWC">SC/AAM/HWC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="facilityDistance">Distance (km)</Label>
                <Input
                  id="facilityDistance"
                  type="number"
                  value={data.NearestHealthFacility?.Distance || ''}
                  onChange={(e) => handleNestedFieldChange('NearestHealthFacility', 'Distance', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Nearest Taluk/District Hospital */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Nearest Taluk/District Hospital</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hospitalName">Hospital Name</Label>
                <Input
                  id="hospitalName"
                  value={data.NearestTalukDistrictHospital?.Name || ''}
                  onChange={(e) => handleNestedFieldChange('NearestTalukDistrictHospital', 'Name', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="hospitalDistance">Distance (km)</Label>
                <Input
                  id="hospitalDistance"
                  type="number"
                  value={data.NearestTalukDistrictHospital?.Distance || ''}
                  onChange={(e) => handleNestedFieldChange('NearestTalukDistrictHospital', 'Distance', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Health Insurance */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Health Insurance</h3>
            <div className="space-y-4">
              <div>
                <Label>Health Insurance Coverage</Label>
                <RadioGroup
                  value={data.HealthInsurance?.Covered || ''}
                  onValueChange={(value) => handleNestedFieldChange('HealthInsurance', 'Covered', value)}
                  className="flex space-x-6 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="YES" id="covered-yes" />
                    <Label htmlFor="covered-yes">YES</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="NO" id="covered-no" />
                    <Label htmlFor="covered-no">NO</Label>
                  </div>
                </RadioGroup>
              </div>

              {data.HealthInsurance?.Covered === 'YES' && (
                <div>
                  <Label htmlFor="insuranceType">Insurance Type</Label>
                  <Select 
                    value={data.HealthInsurance?.Type || ''} 
                    onValueChange={(value) => handleNestedFieldChange('HealthInsurance', 'Type', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select insurance type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AB">AB (Ayushman Bharat)</SelectItem>
                      <SelectItem value="Private">Private</SelectItem>
                      <SelectItem value="ESI">ESI</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>

          {/* Previous Healthcare */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Previous Healthcare Sought From</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {previousHealthcareOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`prev-${option}`}
                    checked={(data.PreviousHealthcareSoughtFrom || []).includes(option)}
                    onCheckedChange={(checked) => handleCheckboxChange('PreviousHealthcareSoughtFrom', option, !!checked)}
                  />
                  <Label htmlFor={`prev-${option}`} className="text-sm">{option}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Out of Pocket Expenditure */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Direct Out of Pocket Expenditure (₹)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="medicine">Medicine</Label>
                <Input
                  id="medicine"
                  type="number"
                  value={data.DirectOutOfPocketExpenditure?.Medicine || ''}
                  onChange={(e) => handleNestedFieldChange('DirectOutOfPocketExpenditure', 'Medicine', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="opdCharges">OPD Charges</Label>
                <Input
                  id="opdCharges"
                  type="number"
                  value={data.DirectOutOfPocketExpenditure?.OPDCharges || ''}
                  onChange={(e) => handleNestedFieldChange('DirectOutOfPocketExpenditure', 'OPDCharges', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="wardCharges">Ward Charges</Label>
                <Input
                  id="wardCharges"
                  type="number"
                  value={data.DirectOutOfPocketExpenditure?.WardCharges || ''}
                  onChange={(e) => handleNestedFieldChange('DirectOutOfPocketExpenditure', 'WardCharges', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Indirect Out of Pocket Expenditure */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Indirect Out of Pocket Expenditure (₹)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="travelCharges">Travel Charges</Label>
                <Input
                  id="travelCharges"
                  type="number"
                  value={data.IndirectOutOfPocketExpenditure?.TravelCharges || ''}
                  onChange={(e) => handleNestedFieldChange('IndirectOutOfPocketExpenditure', 'TravelCharges', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="food">Food</Label>
                <Input
                  id="food"
                  type="number"
                  value={data.IndirectOutOfPocketExpenditure?.Food || ''}
                  onChange={(e) => handleNestedFieldChange('IndirectOutOfPocketExpenditure', 'Food', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="lossOfWages">Loss of Wages</Label>
                <Input
                  id="lossOfWages"
                  type="number"
                  value={data.IndirectOutOfPocketExpenditure?.LossOfWages || ''}
                  onChange={(e) => handleNestedFieldChange('IndirectOutOfPocketExpenditure', 'LossOfWages', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default HealthcareAccessSection;
