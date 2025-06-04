
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp } from 'lucide-react';

interface HabitLifestyleSectionProps {
  data: any;
  onChange: (data: any) => void;
}

const HabitLifestyleSection: React.FC<HabitLifestyleSectionProps> = ({ data, onChange }) => {
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

  const handleSubstanceUseChange = (index: number, field: string, value: string) => {
    const updatedSubstanceUse = [...(data.SubstanceUse || [])];
    updatedSubstanceUse[index] = {
      ...updatedSubstanceUse[index],
      [field]: value
    };
    handleFieldChange('SubstanceUse', updatedSubstanceUse);
  };

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    const currentSymptoms = data.CancerScreeningSymptoms || [];
    const newSymptoms = checked
      ? [...currentSymptoms, symptom]
      : currentSymptoms.filter((item: string) => item !== symptom);
    
    handleFieldChange('CancerScreeningSymptoms', newSymptoms);
  };

  const cancerSymptoms = [
    { value: 'a', label: 'Persistent cough or hoarseness' },
    { value: 'b', label: 'Difficulty swallowing' },
    { value: 'c', label: 'Unexplained weight loss' },
    { value: 'd', label: 'Persistent abdominal pain' },
    { value: 'e', label: 'Blood in stool/urine' },
    { value: 'f', label: 'Unusual bleeding/discharge' },
    { value: 'g', label: 'Lumps in breast/neck' },
    { value: 'h', label: 'Changes in mole appearance' }
  ];

  const substanceTypes = ['Cigarette', 'Bidi', 'Chewables', 'Alcohol'];
  const frequencyOptions = ['Never', 'Occasional', 'Daily', 'Past user'];

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <CardTitle className="flex items-center justify-between text-xl text-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            Habit & Lifestyle
          </div>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </CardTitle>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Physical Measurements */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Physical Measurements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={data.Height_cm || ''}
                  onChange={(e) => handleFieldChange('Height_cm', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={data.Weight_kg || ''}
                  onChange={(e) => handleFieldChange('Weight_kg', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="bmi">BMI</Label>
                <Input
                  id="bmi"
                  type="number"
                  step="0.1"
                  value={data.BMI || ''}
                  onChange={(e) => handleFieldChange('BMI', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="waist">Waist Circumference (cm)</Label>
                <Input
                  id="waist"
                  type="number"
                  value={data.WaistCircumference_cm || ''}
                  onChange={(e) => handleFieldChange('WaistCircumference_cm', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="bp">Blood Pressure (mmHg)</Label>
                <Input
                  id="bp"
                  value={data.BP_mmHg || ''}
                  onChange={(e) => handleFieldChange('BP_mmHg', e.target.value)}
                  placeholder="120/80"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="grbs">GRBS (mg%)</Label>
                <Input
                  id="grbs"
                  type="number"
                  value={data.GRBS_mgPercent || ''}
                  onChange={(e) => handleFieldChange('GRBS_mgPercent', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Physical Activity */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Physical Activity (days per week)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="moderate">Moderate Exercise</Label>
                <Input
                  id="moderate"
                  type="number"
                  min="0"
                  max="7"
                  value={data.PhysicalActivity?.ModeratePerWeek || ''}
                  onChange={(e) => handleNestedFieldChange('PhysicalActivity', 'ModeratePerWeek', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="vigorous">Vigorous Exercise</Label>
                <Input
                  id="vigorous"
                  type="number"
                  min="0"
                  max="7"
                  value={data.PhysicalActivity?.VigorousPerWeek || ''}
                  onChange={(e) => handleNestedFieldChange('PhysicalActivity', 'VigorousPerWeek', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Substance Use */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Substance Use</h3>
            <div className="space-y-4">
              {substanceTypes.map((type, index) => {
                const substance = data.SubstanceUse?.[index] || {};
                
                return (
                  <div key={type} className="bg-white p-4 rounded border">
                    <h4 className="font-medium mb-3 text-gray-700">{type}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <Label htmlFor={`freq-${index}`}>Frequency</Label>
                        <Select 
                          value={substance.Frequency || ''} 
                          onValueChange={(value) => handleSubstanceUseChange(index, 'Frequency', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            {frequencyOptions.map((option) => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor={`duration-${index}`}>Duration (years)</Label>
                        <Input
                          id={`duration-${index}`}
                          type="number"
                          value={substance.Duration_years || ''}
                          onChange={(e) => handleSubstanceUseChange(index, 'Duration_years', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                        <Input
                          id={`quantity-${index}`}
                          type="number"
                          value={substance.Quantity || ''}
                          onChange={(e) => handleSubstanceUseChange(index, 'Quantity', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cancer Screening Symptoms */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Cancer Screening Symptoms</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cancerSymptoms.map((symptom) => (
                <div key={symptom.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`symptom-${symptom.value}`}
                    checked={(data.CancerScreeningSymptoms || []).includes(symptom.value)}
                    onCheckedChange={(checked) => handleSymptomChange(symptom.value, !!checked)}
                  />
                  <Label htmlFor={`symptom-${symptom.value}`} className="text-sm">{symptom.label}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default HabitLifestyleSection;
