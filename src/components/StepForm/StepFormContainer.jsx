import React, { useState } from 'react';
import UserInfoStep from './UserInfoStep.jsx';
import AddressDetailsStep from './AddressDetailsStep.jsx';
import ThankYouStep from './ThankYouStep.jsx';

const StepFormContainer = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      age: '',
      height: '',
      gender: '', 
      middleName: '',
      mobileNo: '',
      birthdate: '',
      bloodGroup: '',
      weight: '',
      maritalStatus: '', 
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
    });
  
    const handleNext = () => {
      setCurrentStep(currentStep + 1);
    };
  
    const handleBack = () => {
      setCurrentStep(currentStep - 1);
    };
  
    const updateFormData = (newData) => {
      setFormData(prevData => ({ ...prevData, ...newData }));
    };
  
    const renderStep = () => {
      switch (currentStep) {
        case 1:
          return (
            <UserInfoStep
              formData={formData}
              updateFormData={updateFormData}
              handleNext={handleNext}
            />
          );
        case 2:
          return (
            <AddressDetailsStep
              formData={formData}
              updateFormData={updateFormData}
              handleBack={handleBack}
              handleNext={handleNext}
            />
          );
        case 3:
          return (
            <ThankYouStep
              formData={formData}
              handleBack={handleBack}
            />
          );
        default:
          return <div>Unknown Step</div>;
      }
    };
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-8 text-center">Step Form</h1>

        <div className="flex items-center justify-between mb-8">
          <div className="flex-1 flex flex-col items-center">
            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${currentStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
              1
            </div>
            <p className={`text-sm mt-1 ${currentStep >= 1 ? 'text-blue-500 font-semibold' : 'text-gray-600'}`}>User Information</p>
          </div>
          <div className={`flex-1 h-1 ${currentStep > 1 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>

          <div className="flex-1 flex flex-col items-center">
            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${currentStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
              2
            </div>
            <p className={`text-sm mt-1 ${currentStep >= 2 ? 'text-blue-500 font-semibold' : 'text-gray-600'}`}>Address Details</p>
          </div>
           <div className={`flex-1 h-1 ${currentStep > 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>

          <div className="flex-1 flex flex-col items-center">
            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${currentStep >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
              3
            </div>
            <p className={`text-sm mt-1 ${currentStep >= 3 ? 'text-blue-500 font-semibold' : 'text-gray-600'}`}>Thank You</p>
          </div>
        </div>

        {renderStep()}
        
      </div>
    );
  };
  
  export default StepFormContainer;