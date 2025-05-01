// src/components/EditOrganizationForm.js
import React, { useState, useEffect } from 'react';

const EditOrganizationForm = ({ organization, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState(organization);

  useEffect(() => {
    setFormData(organization);
  }, [organization]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/api/organizations/${organization.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.ok ? res.json() : Promise.reject('Ошибка при сохранении'))
      .then(() => onSuccess())
      .catch(err => alert(err));
  };

  return (
      <form onSubmit={handleSubmit}>
          <h3>Редактировать организацию</h3>
          <input name="name" value={formData.name} onChange={handleChange} required/>
          <input name="FIO" value={formData.FIO} onChange={handleChange} required/>
          <input name="UBP" value={formData.UBP} onChange={handleChange} required/>
          <input name="INN" value={formData.INN} onChange={handleChange} required/>
          <input name="KPP" value={formData.KPP} onChange={handleChange} required/>
          <input name="address" value={formData.address} onChange={handleChange} required/>
          <input name="phone" value={formData.phone} onChange={handleChange} required/>
          <textarea name="BANK" value={formData.BANK} onChange={handleChange}/>
          <div>
              <button type="submit">Сохранить</button>
              <button type="button" onClick={onCancel}>Отмена</button>
          </div>
      </form>
  );
};

export default EditOrganizationForm;
