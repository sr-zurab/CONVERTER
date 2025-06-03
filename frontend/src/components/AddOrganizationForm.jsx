// Компонент формы добавления новой организации
// Позволяет создать новую организацию с заполнением всех необходимых полей
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addOrganization} from '../store/organizationSlice';
import {IoIosAddCircleOutline} from "react-icons/io";
import {TbCancel} from "react-icons/tb";

// Основной компонент формы добавления организации
// @param {Function} onClose - Функция закрытия формы
const AddOrganizationForm = ({onClose}) => {
    // Состояние формы с пустыми начальными значениями
    const [formData, setFormData] = useState({
        name: '', address: '', phone: '', UBP: '', BANK: '', KPP: '', INN: '', FIO: ''
    });
    const dispatch = useDispatch();

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
            await dispatch(addOrganization(formData)).unwrap();
            onClose();
        } catch (error) {
            alert('Ошибка при добавлении организации: ' + error);
        }
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
            <textarea name="BANK" placeholder="Банковские реквизиты" onChange={handleChange}/>
            <div className="form-buttons">
                <button type="submit" className="add-button"><IoIosAddCircleOutline/> Создать</button>
                <button type="button" onClick={onClose} className="cancel-button"><TbCancel/> Отмена</button>
            </div>
        </form>
    );
};

export default AddOrganizationForm;

