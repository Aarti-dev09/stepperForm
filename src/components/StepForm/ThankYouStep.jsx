import React from 'react';

const ThankYouStep = ({ formData, handleBack }) => {
  return (
    <div className="space-y-4 bg-gray-100 p-8 rounded-lg">
      <h1 className="text-4xl font-semibold mb-6 text-center">Thank You!</h1>
      <h3 className="text-xl font-semibold mb-6 text-center">Your Form has been submitted successfully.</h3>
      <h2 className="text-xl font-semibold mb-6 text-center">Your details are as follows:</h2>
<div className="grid grid-cols-1 gap-y-4 gap-x-8 md:grid-cols-2">
      <div className="text-start space-y-2">
        <h3 className="text-lg font-semibold">User Information:</h3>
        {formData.firstName && <p><span className="font-bold">First Name:</span> {formData.firstName}</p>}
        {formData.middleName && <p><span className="font-bold">Middle Name:</span> {formData.middleName}</p>}
        {formData.lastName && <p><span className="font-bold">Last Name:</span> {formData.lastName}</p>}
        {formData.mobileNo && <p><span className="font-bold">Mobile No:</span> {formData.mobileNo}</p>}
        {formData.email && <p><span className="font-bold">Email:</span> {formData.email}</p>}
        {formData.birthdate && <p><span className="font-bold">Birthdate:</span> {formData.birthdate}</p>}
        {formData.age && <p><span className="font-bold">Age:</span> {formData.age}</p>}
        {formData.bloodGroup && <p><span className="font-bold">Blood Group:</span> {formData.bloodGroup}</p>}
        {formData.height && <p><span className="font-bold">Height:</span> {formData.height}</p>}
        {formData.weight && <p><span className="font-bold">Weight:</span> {formData.weight}</p>}
        {formData.gender && <p><span className="font-bold">Gender:</span> {formData.gender}</p>}
        {formData.maritalStatus && <p><span className="font-bold">Marital Status:</span> {formData.maritalStatus}</p>}
      </div>

      <div className="text-start space-y-2">
         <h3 className="text-lg font-semibold">Address Details:</h3>
        {formData.addressLine1 && <p><span className="font-bold">Address Line 1:</span> {formData.addressLine1}</p>}
        {formData.addressLine2 && <p><span className="font-bold">Address Line 2:</span> {formData.addressLine2}</p>}
        {formData.city && <p><span className="font-bold">City:</span> {formData.city}</p>}
        {formData.state && <p><span className="font-bold">State:</span> {formData.state}</p>}
        {formData.country && <p><span className="font-bold">Country:</span> {formData.country}</p>}
        {formData.pincode && <p><span className="font-bold">Pincode:</span> {formData.pincode}</p>}
      </div>
      </div>
      <div className="mt-8 flex justify-start">
        <button onClick={handleBack} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Back</button>
      </div>
    </div>
  );
};

export default ThankYouStep;