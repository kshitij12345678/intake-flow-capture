
// API service for backend communication
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'https://api.example.com';

export const processPatientData = async (formData: FormData) => {
  try {
    console.log('Sending request to:', `${API_BASE_URL}/process`);
    
    // For demo purposes, we'll simulate the API response
    // In production, uncomment the actual API call below
    
    /*
    const response = await fetch(`${API_BASE_URL}/process`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
    */

    // Simulated response for demo
    await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate processing time
    
    return {
      PatientProfile: {
        Name: "राम कुमार",
        Age: "45",
        Sex: "Male",
        HMISNumber: "HMIS123456",
        AadharNumber: "1234-5678-9012",
        Panchayat: "Rampur Gram Panchayat",
        Taluk: "Mysore",
        District: "Mysore",
        State: "Karnataka",
        Pincode: "570001",
        MobileNo: "9876543210",
        Occupation: "Farmer",
        ApproxMonthlyIncome: "15000",
        MobileNoNextDependent: "9876543211",
        TotalNoOfFamilyMembers: "4",
        MaritalStatus: "Married",
        Education: "Primary School",
        HouseBuiltType: "Brick made",
        HouseType: "Own",
        FamilyMembers: [
          {
            SlNo: 1,
            Name: "सुनीता कुमारी",
            Age: "42",
            Sex: "Female",
            Relation: "Wife",
            EducationOccupation: "Housewife"
          },
          {
            SlNo: 2,
            Name: "अमित कुमार",
            Age: "18",
            Sex: "Male", 
            Relation: "Son",
            EducationOccupation: "Student"
          }
        ]
      },
      HealthcareAccess: {
        NearestHealthFacility: {
          Government: "Yes",
          Private: "No",
          Name: "Primary Health Center Rampur",
          Category: "PHC",
          Distance: "2"
        },
        NearestTalukDistrictHospital: {
          Name: "Mysore District Hospital",
          Distance: "15"
        },
        HealthInsurance: {
          Covered: "YES",
          Type: "AB"
        },
        PreviousHealthcareSoughtFrom: ["PHC", "District Hospital"],
        ReasonNotSeekingTreatment: ["High medicines cost", "Travel distance is more"],
        ProblemWithPreviousProvider: ["Long waiting period"],
        DirectOutOfPocketExpenditure: {
          Medicine: "500",
          OPDCharges: "200",
          WardCharges: "0",
          OTCharges: "0",
          Others: "100"
        },
        IndirectOutOfPocketExpenditure: {
          TravelCharges: "150",
          Food: "100",
          LossOfWages: "300",
          AttendersCost: "0",
          Others: "50"
        }
      },
      HabitAndLifestyle: {
        Height_cm: "165",
        Weight_kg: "70",
        BMI: "25.7",
        WaistCircumference_cm: "85",
        BP_mmHg: "120/80",
        GRBS_mgPercent: "110",
        PhysicalActivity: {
          ModeratePerWeek: "3",
          VigorousPerWeek: "1"
        },
        SubstanceUse: [
          {
            Type: "Cigarette",
            Frequency: "Never",
            Duration_years: "0",
            Quantity: "0"
          },
          {
            Type: "Bidi",
            Frequency: "Past user",
            Duration_years: "5",
            Quantity: "10"
          },
          {
            Type: "Chewables",
            Frequency: "Never",
            Duration_years: "0",
            Quantity: "0"
          },
          {
            Type: "Alcohol",
            Frequency: "Occasional",
            Duration_years: "10",
            Quantity: "2"
          }
        ],
        CancerScreeningSymptoms: ["b", "d"]
      }
    };
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to process patient data');
  }
};
