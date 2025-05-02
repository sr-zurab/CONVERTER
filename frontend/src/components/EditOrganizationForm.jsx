import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateOrganization } from '../store/organizationSlice';

const EditOrganizationForm = ({ onClose, organization }) => {
  const [formData, setFormData] = useState(organization);
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData(organization);
  }, [organization]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateOrganization({ id: organization.id, data: formData }))
      .then(() => onClose());
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Редактировать организацию</h3>
      <input name="name" value={formData.name} onChange={handleChange} required />
      <input name="FIO" value={formData.FIO} onChange={handleChange} required />
      <input name="UBP" value={formData.UBP} onChange={handleChange} required />
      <input name="INN" value={formData.INN} onChange={handleChange} required />
      <input name="KPP" value={formData.KPP} onChange={handleChange} required />
      <input name="address" value={formData.address} onChange={handleChange} required />
      <input name="phone" value={formData.phone} onChange={handleChange} required />
      <textarea name="BANK" value={formData.BANK} onChange={handleChange} />
      <div>
        <button type="submit">Сохранить</button>
        <button type="button" onClick={onClose}>Отмена</button>
      </div>
    </form>
  );
};

export default EditOrganizationForm;

