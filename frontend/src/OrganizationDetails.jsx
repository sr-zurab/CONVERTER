import React from 'react';

const OrganizationDetails = ({ org, onEdit, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Удалить организацию \"${org.name}\"?`)) {
      fetch(`http://localhost:8000/api/organizations/${org.id}/`, { method: 'DELETE' })
        .then(res => res.ok ? onDelete() : Promise.reject('Ошибка удаления'))
        .catch(err => alert(err));
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
          <button onClick={handleDelete} style={{marginLeft: '10px', color: 'red'}}>Удалить</button>
      </div>
  );
};

export default OrganizationDetails;
