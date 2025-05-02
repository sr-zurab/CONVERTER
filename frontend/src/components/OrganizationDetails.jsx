import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteOrganization } from '../store/organizationSlice';

const OrganizationDetails = ({ org, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm(`Удалить организацию "${org.name}"?`)) {
      dispatch(deleteOrganization(org.id));
    }
  };

  return (
    <div>
      <h2>{org.name}</h2>
      <p><strong>Ф.И.О:</strong> {org.FIO}</p>
      <p><strong>ИНН:</strong> {org.INN}</p>
      <p><strong>КПП:</strong> {org.KPP}</p>
      <p><strong>Номер по сводному реестру:</strong> {org.UBP}</p>
      <p><strong>Адрес:</strong> {org.address}</p>
      <p><strong>Телефон:</strong> {org.phone}</p>
      <p><strong>Банковские реквизиты:</strong> {org.BANK}</p>
      <button onClick={onEdit}>Редактировать</button>
      <button onClick={handleDelete} style={{ marginLeft: '10px', color: 'red' }}>Удалить</button>
    </div>
  );
};

export default OrganizationDetails;

