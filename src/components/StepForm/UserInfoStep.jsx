import React, { useState } from 'react';

const UserInfoStep = ({ formData, updateFormData, handleNext }) => {
  const [errors, setErrors] = useState({});
  const [isBirthdateFocused, setIsBirthdateFocused] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });

    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let errorMessage = '';
    
    if (name === 'age') {
      if (value.trim() === '') {
         errorMessage = 'Age is required'; 
      } else if (parseInt(value, 10) < 18) {
        errorMessage = 'Age must be at least 18';
      }
     } else if (name === 'birthdate') {
         setIsBirthdateFocused(false); 
        if (!value) {
            errorMessage = 'Birthdate is required';
        } else {
            const birthDate = new Date(value);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (birthDate > today) {
                errorMessage = 'Birthdate cannot be in the future';
            } else {
                 // Check age based on birthdate
                 if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    // If birthday hasn't occurred yet this year, subtract one from age
                    if (age - 1 < 18) {
                         errorMessage = 'You must be at least 18 years old';
                    }
                 } else if (age < 18) {
                     errorMessage = 'You must be at least 18 years old';
                 }
            }
        }
     } else if (name === 'mobileNo') {
         if (!value.trim()) {
             errorMessage = 'Mobile Number is required';
         } else if (!/^[0-9]{10}$/.test(value)) {
             errorMessage = 'Mobile Number must be exactly 10 digits';
         }

    } else if (!value.trim()) {
      errorMessage = 'this field is required';
    }

    setErrors(prevErrors => ({ ...prevErrors, [name]: errorMessage }));
  };

    const handleFocusBirthdate = () => {
        setIsBirthdateFocused(true);
    };

  const validateStep = () => {
    const newErrors = {};
    const requiredFields = ['firstName', 'lastName', 'email', 'mobileNo', 'age', 'birthdate', 'bloodGroup', 'height', 'weight', 'gender', 'maritalStatus']; // Define required fields

    requiredFields?.forEach(field => {
      if (field === 'gender' || field === 'maritalStatus') {
        if (!formData[field]) {
          newErrors[field] = `${field} is required`;
        }
      } else if (field === 'age') {
         if (!formData[field] || !formData[field].toString().trim()) {
            newErrors[field] = 'Age is required';
         } else if (parseInt(formData[field], 10) < 18) {
            newErrors[field] = 'Age must be at least 18';
         }
      } else if (field === 'birthdate') {
           if (!formData[field]) {
            newErrors[field] = 'Birthdate is required';
        } else {
            const birthDate = new Date(formData[field]);
            const today = new Date();
             if (birthDate > today) {
                newErrors[field] = 'Birthdate cannot be in the future';
            } else {
                 // Also check age based on birthdate here for completeness
                 const age = today.getFullYear() - birthDate.getFullYear();
                 const monthDiff = today.getMonth() - birthDate.getMonth();
                 if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    // If birthday hasn't occurred yet this year, subtract one from age
                    if (age - 1 < 18) {
                         newErrors[field] = 'You must be at least 18 years old';
                    }
                 } else if (age < 18) {
                     newErrors[field] = 'You must be at least 18 years old';
                 }
            }
        }

      } else if (field === 'mobileNo') {
          if (!formData[field] || !formData[field].toString().trim()) {
              newErrors[field] = 'Mobile Number is required';
          } else if (!/^[0-9]{10}$/.test(formData[field])) {
              newErrors[field] = 'Mobile Number must be exactly 10 digits';
          }
      }
      else if (!formData[field] || !formData[field].toString().trim()) {
        newErrors[field] = `${field} is required`;
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
      <h2 className="text-xl font-semibold mb-6 text-center">User Information</h2>
      <div className="text-start grid grid-cols-1 gap-y-4 gap-x-8 md:grid-cols-2">
        <div>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} onBlur={handleBlur} className={`w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.firstName ? 'border-red-500' : ''}`} placeholder="First Name" />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} onBlur={handleBlur} className={`w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.middleName ? 'border-red-500' : ''}`} placeholder="Middle Name" />
          {errors.middleName && <p className="text-red-500 text-xs mt-1">{errors.middleName}</p>}
        </div>
        <div>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} onBlur={handleBlur} className={`w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.lastName ? 'border-red-500' : ''}`} placeholder="Last Name" />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
         <div>
          <input type="text" name="mobileNo" value={formData.mobileNo} onChange={handleChange} onBlur={handleBlur} className={`w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.mobileNo ? 'border-red-500' : ''}`} placeholder="Mobile No" />
          {errors.mobileNo && <p className="text-red-500 text-xs mt-1">{errors.mobileNo}</p>}
        </div>
        <div>
          <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} className={`w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`} placeholder="Email" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
         <div>
          <input
            type={isBirthdateFocused || formData.birthdate ? 'date' : 'text'}
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocusBirthdate}
            className={`w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.birthdate ? 'border-red-500' : ''}`}
            placeholder="DOB"
          />
           {errors.birthdate && <p className="text-red-500 text-xs mt-1">{errors.birthdate}</p>}
        </div>
        <div>
          <input type="number" name="age" value={formData.age} onChange={handleChange} onBlur={handleBlur} className={`w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.age ? 'border-red-500' : ''}`} placeholder="Age" />
           {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
        </div>
         <div>
          <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} onBlur={handleBlur} className={`w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.bloodGroup ? 'border-red-500' : ''}`} placeholder="Blood Group" />
           {errors.bloodGroup && <p className="text-red-500 text-xs mt-1">{errors.bloodGroup}</p>}
        </div>
        <div>
          <input type="text" name="height" value={formData.height} onChange={handleChange} onBlur={handleBlur} className={`w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.height ? 'border-red-500' : ''}`} placeholder="Height" />
           {errors.height && <p className="text-red-500 text-xs mt-1">{errors.height}</p>}
        </div>
         <div>
          <input type="text" name="weight" value={formData.weight} onChange={handleChange} onBlur={handleBlur} className={`w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.weight ? 'border-red-500' : ''}`} placeholder="Weight" />
           {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight}</p>}
        </div>
      </div>
      <div className="text-start grid grid-cols-1 gap-y-4 gap-x-8 md:grid-cols-2">

      <div className="mt-6">
        <label className={`block text-gray-700 text-sm font-bold mb-1 ${errors.gender ? 'text-red-500' : ''}`}>Gender:</label>
        <div className="flex items-center space-x-6">
          <label className="inline-flex items-center">
            <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} onBlur={handleBlur} className="form-radio text-blue-600" />
            <span className={`ml-2 text-gray-700 ${errors.gender ? 'text-red-500' : ''}`}>Male</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} onBlur={handleBlur} className="form-radio text-blue-600" />
            <span className={`ml-2 text-gray-700 ${errors.gender ? 'text-red-500' : ''}`}>Female</span>
          </label>
        </div>
         {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
      </div>

      <div className="mt-4">
        <label className={`block text-gray-700 text-sm font-bold mb-1 ${errors.maritalStatus ? 'text-red-500' : ''}`}>Marital Status:</label>
        <div className="flex items-center space-x-6">
          <label className="inline-flex items-center">
            <input type="radio" name="maritalStatus" value="Single" checked={formData.maritalStatus === 'Single'} onChange={handleChange} onBlur={handleBlur} className="form-radio text-blue-600" />
            <span className={`ml-2 text-gray-700 ${errors.maritalStatus ? 'text-red-500' : ''}`}>Single</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" name="maritalStatus" value="Married" checked={formData.maritalStatus === 'Married'} onChange={handleChange} onBlur={handleBlur} className="form-radio text-blue-600" />
            <span className={`ml-2 text-gray-700 ${errors.maritalStatus ? 'text-red-500' : ''}`}>Married</span>
          </label>
           <label className="inline-flex items-center">
            <input type="radio" name="maritalStatus" value="Divorced" checked={formData.maritalStatus === 'Divorced'} onChange={handleChange} onBlur={handleBlur} className="form-radio text-blue-600" />
            <span className={`ml-2 text-gray-700 ${errors.maritalStatus ? 'text-red-500' : ''}`}>Divorced</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" name="maritalStatus" value="Widowed" checked={formData.maritalStatus === 'Widowed'} onChange={handleChange} onBlur={handleBlur} className="form-radio text-blue-600" />
            <span className={`ml-2 text-gray-700 ${errors.maritalStatus ? 'text-red-500' : ''}`}>Widowed</span>
          </label>
        </div>
         {errors.maritalStatus && <p className="text-red-500 text-xs mt-1">{errors.maritalStatus}</p>}
      </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button onClick={handleNextClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Next</button>
      </div>
    </div>
  );
};

export default UserInfoStep;