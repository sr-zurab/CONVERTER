// Компонент формы редактирования организации
// Позволяет изменять данные существующей организации
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {updateOrganization} from '../store/organizationSlice';
import {RiSave2Fill} from "react-icons/ri";
import {TbCancel} from "react-icons/tb";

// Основной компонент формы редактирования
// @param {Function} onClose - Функция закрытия формы
// @param {Object} organization - Объект с данными организации для редактирования
const EditOrganizationForm = ({onClose, organization}) => {
    // Состояние формы с данными организации
    const [formData, setFormData] = useState(organization);
    const dispatch = useDispatch();

    // Обновление данных формы при изменении организации
    useEffect(() => {
        setFormData(organization);
    }, [organization]);

    // Обработчик изменения полей формы
    // @param {Event} e - Событие изменения поля
    const handleChange = (e) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    // Обработчик отправки формы
    // @param {Event} e - Событие отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateOrganization({id: organization.id, data: formData})).unwrap();
            onClose();
        } catch (error) {
            alert('Ошибка при обновлении организации: ' + error);
        }
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
            <div className="form-buttons">
                <button type="submit" className="edit-button"><RiSave2Fill/> Сохранить</button>
                <button type="button" onClick={onClose} className="cancel-button"><TbCancel/> Отмена</button>
            </div>
        </form>
    );
};

export default EditOrganizationForm;

