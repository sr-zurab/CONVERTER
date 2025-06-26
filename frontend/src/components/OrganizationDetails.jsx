// Компонент отображения детальной информации об организации
// Показывает все поля организации и кнопки для редактирования/удаления
import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteOrganization} from '../store/organizationSlice';
import {BsFeather} from "react-icons/bs";
import {FiTrash2} from "react-icons/fi";

// Основной компонент деталей организации
// @param {Object} org - Объект с данными организации
// @param {Function} onEdit - Функция вызова редактирования
const OrganizationDetails = ({org, onEdit}) => {
    const dispatch = useDispatch();

    // Обработчик удаления организации
    // Запрашивает подтверждение перед удалением
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
            <p><strong>Номер по сводному реестру Учредителя:</strong> {org.founderAuthority}</p>
            <p><strong>Адрес:</strong> {org.address}</p>
            <p><strong>Телефон:</strong> {org.phone}</p>
            <p><strong>Банковские реквизиты:</strong> {org.BANK}</p>
            <button className="edit-button" onClick={onEdit}><BsFeather/></button>
            <button onClick={handleDelete} className="del-button"><FiTrash2/></button>
        </div>
    );
};

export default OrganizationDetails;

