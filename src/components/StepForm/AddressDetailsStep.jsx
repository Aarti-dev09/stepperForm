import React, { useState } from 'react';

const AddressDetailsStep = ({ formData, updateFormData, handleBack, handleNext }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
     if (!value.trim()) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: 'this field is required' }));
    } else {
       setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    const requiredFields = ['addressLine1', 'city', 'state', 'country', 'pincode']; 
    requiredFields.forEach(field => {
       if (!formData[field] || !formData[field].toString().trim()) {
        newErrors[field] = 'this field is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = () => {
    const isValid = validateStep();
    if (isValid) {
      handleNext();
    } else {
       console.log("Validation errors:", errors);
    }
  };


  return (
    <div className="space-y-4 bg-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-6 text-center">Address Details</h2>
      <div className="text-start grid grid-cols-1 gap-y-4 gap-x-8 md:grid-cols-2">
        <div>
          <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} onBlur={handleBlur} className={`w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.addressLine1 ? 'border-red-500' : ''}`} placeholder="Address Line 1" />
           {errors.addressLine1 && <p className="text-red-500 text-xs mt-1">{errors.addressLine1}</p>}
        </div>
        <div>
          <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} onBlur={handleBlur} className={`w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.addressLine2 ? 'border-red-500' : ''}`} placeholder="Address Line 2" />
           {errors.addressLine2 && <p className="text-red-500 text-xs mt-1">{errors.addressLine2}</p>}
        </div>
        <div>
          <input type="text" name="city" value={formData.city} onChange={handleChange} onBlur={handleBlur} className={`w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.city ? 'border-red-500' : ''}`} placeholder="City" />
           {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
        </div>
        <div>
          <input type="text" name="state" value={formData.state} onChange={handleChange} onBlur={handleBlur} className={`w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.state ? 'border-red-500' : ''}`} placeholder="State" />
           {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
        </div>
        <div>
          <input type="text" name="country" value={formData.country} onChange={handleChange} onBlur={handleBlur} className={`w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.country ? 'border-red-500' : ''}`} placeholder="Country" />
           {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
        </div>
        <div>
          <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} onBlur={handleBlur} className={`w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.pincode ? 'border-red-500' : ''}`} placeholder="Pincode" />
           {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button onClick={handleBack} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Back</button>
        <button onClick={handleNextClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Next</button>
      </div>
    </div>
  );
};

export default AddressDetailsStep;