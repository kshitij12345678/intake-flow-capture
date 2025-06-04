
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';

interface PatientProfileSectionProps {
  data: any;
  onChange: (data: any) => void;
}

const PatientProfileSection: React.FC<PatientProfileSectionProps> = ({ data, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleFieldChange = (field: string, value: string) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const handleFamilyMemberChange = (index: number, field: string, value: string) => {
    const updatedMembers = [...(data.FamilyMembers || [])];
    updatedMembers[index] = {
      ...updatedMembers[index],
      [field]: value
    };
    onChange({
      ...data,
      FamilyMembers: updatedMembers
    });
  };

  const addFamilyMember = () => {
    const newMember = {
      SlNo: (data.FamilyMembers?.length || 0) + 1,
      Name: "",
      Age: "",
      Sex: "",
      Relation: "",
      EducationOccupation: ""
    };
    onChange({
      ...data,
      FamilyMembers: [...(data.FamilyMembers || []), newMember]
    });
  };

  const removeFamilyMember = (index: number) => {
    const updatedMembers = data.FamilyMembers.filter((_: any, i: number) => i !== index);
    // Reindex SlNo
    updatedMembers.forEach((member: any, i: number) => {
      member.SlNo = i + 1;
    });
    onChange({
      ...data,
      FamilyMembers: updatedMembers
    });
  };

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <CardTitle className="flex items-center justify-between text-xl text-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            Patient Profile
          </div>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </CardTitle>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={data.Name || ''}
                onChange={(e) => handleFieldChange('Name', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={data.Age || ''}
                onChange={(e) => handleFieldChange('Age', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="sex">Sex</Label>
              <Select value={data.Sex || ''} onValueChange={(value) => handleFieldChange('Sex', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select sex" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="hmisNumber">HMIS Number</Label>
              <Input
                id="hmisNumber"
                value={data.HMISNumber || ''}
                onChange={(e) => handleFieldChange('HMISNumber', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="aadharNumber">Aadhar Number</Label>
              <Input
                id="aadharNumber"
                value={data.AadharNumber || ''}
                onChange={(e) => handleFieldChange('AadharNumber', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="mobileNo">Mobile Number</Label>
              <Input
                id="mobileNo"
                value={data.MobileNo || ''}
                onChange={(e) => handleFieldChange('MobileNo', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Address Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="panchayat">Panchayat</Label>
              <Input
                id="panchayat"
                value={data.Panchayat || ''}
                onChange={(e) => handleFieldChange('Panchayat', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="taluk">Taluk</Label>
              <Input
                id="taluk"
                value={data.Taluk || ''}
                onChange={(e) => handleFieldChange('Taluk', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="district">District</Label>
              <Input
                id="district"
                value={data.District || ''}
                onChange={(e) => handleFieldChange('District', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={data.State || ''}
                onChange={(e) => handleFieldChange('State', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="pincode">Pincode</Label>
              <Input
                id="pincode"
                value={data.Pincode || ''}
                onChange={(e) => handleFieldChange('Pincode', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                value={data.Occupation || ''}
                onChange={(e) => handleFieldChange('Occupation', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="monthlyIncome">Approximate Monthly Income</Label>
              <Input
                id="monthlyIncome"
                type="number"
                value={data.ApproxMonthlyIncome || ''}
                onChange={(e) => handleFieldChange('ApproxMonthlyIncome', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="maritalStatus">Marital Status</Label>
              <Select value={data.MaritalStatus || ''} onValueChange={(value) => handleFieldChange('MaritalStatus', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Married">Married</SelectItem>
                  <SelectItem value="Separate">Separate</SelectItem>
                  <SelectItem value="Widow">Widow</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="education">Education</Label>
              <Select value={data.Education || ''} onValueChange={(value) => handleFieldChange('Education', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select education" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Illiterate">Illiterate</SelectItem>
                  <SelectItem value="Primary School">Primary School</SelectItem>
                  <SelectItem value="Middle School">Middle School</SelectItem>
                  <SelectItem value="High School">High School</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Graduate">Graduate</SelectItem>
                  <SelectItem value="Post Graduate">Post Graduate</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Family Members Section */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Family Members</h3>
              <Button onClick={addFamilyMember} size="sm" variant="outline">
                <Plus size={16} className="mr-2" />
                Add Member
              </Button>
            </div>

            <div className="space-y-4">
              {(data.FamilyMembers || []).map((member: any, index: number) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-700">Member {member.SlNo}</span>
                    {data.FamilyMembers.length > 1 && (
                      <Button
                        onClick={() => removeFamilyMember(index)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div>
                      <Label htmlFor={`memberName${index}`}>Name</Label>
                      <Input
                        id={`memberName${index}`}
                        value={member.Name || ''}
                        onChange={(e) => handleFamilyMemberChange(index, 'Name', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`memberAge${index}`}>Age</Label>
                      <Input
                        id={`memberAge${index}`}
                        type="number"
                        value={member.Age || ''}
                        onChange={(e) => handleFamilyMemberChange(index, 'Age', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`memberSex${index}`}>Sex</Label>
                      <Select
                        value={member.Sex || ''}
                        onValueChange={(value) => handleFamilyMemberChange(index, 'Sex', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select sex" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor={`memberRelation${index}`}>Relation</Label>
                      <Input
                        id={`memberRelation${index}`}
                        value={member.Relation || ''}
                        onChange={(e) => handleFamilyMemberChange(index, 'Relation', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor={`memberEducation${index}`}>Education/Occupation</Label>
                      <Input
                        id={`memberEducation${index}`}
                        value={member.EducationOccupation || ''}
                        onChange={(e) => handleFamilyMemberChange(index, 'EducationOccupation', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default PatientProfileSection;
