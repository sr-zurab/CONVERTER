// Компонент модального окна
// Используется для отображения форм и других элементов поверх основного контента
import React from 'react';
import './Modal.css';

// Основной компонент модального окна
// @param {boolean} isOpen - Флаг открытия/закрытия окна
// @param {Function} onClose - Функция закрытия окна
// @param {ReactNode} children - Дочерние элементы для отображения в окне
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-window" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

