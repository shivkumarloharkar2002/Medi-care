// src/view/Opd/Opd.js

import React, { useState } from 'react';
import './Opd.css';

const Opd = () => {
  const [formData, setFormData] = useState({
    receiptNo: '',
    receiptDate: '',
    patientName: '',
    address: '',
    age: '',
    gender: '',
    doctor: '',
    services: [
      { name: 'Blood Test', fee: 200, checked: false },
      { name: 'Heart Operation', fee: 25000, checked: false },
      { name: 'CT Scan', fee: 3000, checked: false },
      { name: 'Thyroid Checkup', fee: 250, checked: false },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleServiceChange = (index) => {
    const newServices = [...formData.services];
    newServices[index].checked = !newServices[index].checked;
    setFormData({ ...formData, services: newServices });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission logic
    console.log(formData);
  };

  const handlePrint = () => {
    // handle print logic
    window.print();
  };

  return (
    <div className="opd-container">
      <h1>Consulting for OPD</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Receipt No :</label>
          <input type="text" name="receiptNo" value={formData.receiptNo} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Receipt Date :</label>
          <input type="date" name="receiptDate" value={formData.receiptDate} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Patient Name :</label>
          <input type="text" name="patientName" value={formData.patientName} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Address :</label>
          <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Age (in years) :</label>
          <input type="number" name="age" value={formData.age} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Gender :</label>
          <select name="gender" value={formData.gender} onChange={handleInputChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Please Select Doctor :</label>
          <select name="doctor" value={formData.doctor} onChange={handleInputChange}>
            <option value="Dr. Manisha">Dr. Manisha</option>
            <option value="Dr. Sanjeev Agarwal">Dr. Sanjeev Agarwal</option>
            <option value="Dr. Ravi Kumar">Dr. Ravi Kumar</option>
          </select>
        </div>
        <div className="services-section">
          <h2>Select Services Of Rendered</h2>
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Service Name</th>
                <th>Fee</th>
              </tr>
            </thead>
            <tbody>
              {formData.services.map((service, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={service.checked}
                      onChange={() => handleServiceChange(index)}
                    />
                  </td>
                  <td>{service.name}</td>
                  <td>{service.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={handlePrint}>Print</button>
      </form>
    </div>
  );
};

export default Opd;
