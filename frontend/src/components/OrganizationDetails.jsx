import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteOrganization } from '../store/organizationSlice';
import { BsFeather } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
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
      <button className="edit-button" onClick={onEdit}><BsFeather /></button>
      <button onClick={handleDelete} className="del-button"><FiTrash2 /></button>
    </div>
  );
};

export default OrganizationDetails;

