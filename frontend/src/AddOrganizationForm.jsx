import React, { useState } from 'react';

const AddOrganizationForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({ name: '', address: '', phone: '', UBP: '',
      BANK: '', KPP: '', INN: '', FIO: ''});

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/organizations/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.ok ? res.json() : Promise.reject('Ошибка при создании'))
      .then(() => onSuccess())
      .catch(err => alert(err));
  };

  return (
      <form onSubmit={handleSubmit}>
          <h3>Добавить организацию</h3>
          <input name="name" placeholder="Название" onChange={handleChange} required/>
          <input name="FIO" placeholder="ФИО" onChange={handleChange} required/>
          <textarea name="address" placeholder="Адрес" onChange={handleChange} required/>
          <input name="phone" placeholder="Телефон" onChange={handleChange} required/>
          <input name="UBP" placeholder="УБП" onChange={handleChange} required/>
          <input name="INN" placeholder="ИНН" onChange={handleChange} required/>
          <input name="KPP" placeholder="КПП" onChange={handleChange} required/>
          <textarea name="BANK" placeholder="Банковчкие реквизиты" onChange={handleChange}/>
          <button type="submit">Создать</button>
      </form>
  );
};

export default AddOrganizationForm;
