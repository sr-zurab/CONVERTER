import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addOrganization } from '../store/organizationSlice';

const AddOrganizationForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '', address: '', phone: '', UBP: '', BANK: '', KPP: '', INN: '', FIO: ''
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addOrganization(formData)).then(() => onClose());
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Добавить организацию</h3>
      <input name="name" placeholder="Название" onChange={handleChange} required />
      <input name="FIO" placeholder="ФИО" onChange={handleChange} required />
      <textarea name="address" placeholder="Адрес" onChange={handleChange} required />
      <input name="phone" placeholder="Телефон" onChange={handleChange} required />
      <input name="UBP" placeholder="УБП" onChange={handleChange} required />
      <input name="INN" placeholder="ИНН" onChange={handleChange} required />
      <input name="KPP" placeholder="КПП" onChange={handleChange} required />
      <textarea name="BANK" placeholder="Банковские реквизиты" onChange={handleChange} />
      <button type="submit">Создать</button>
    </form>
  );
};

export default AddOrganizationForm;

