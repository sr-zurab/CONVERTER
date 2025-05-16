import React, { useState } from 'react';
import { FiTrash2 } from "react-icons/fi";
import { BsFeather } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";

const FhdTable = ({ schema, data, onDataChange, onCellUpdate, onDeleteRow, className }) => {
  const [lastAddedIndex, setLastAddedIndex] = useState(null);

  const handleChange = (rowIndex, field, value) => {
    const updated = [...data];
    const currentRow = updated[rowIndex];

    updated[rowIndex] = {
      ...currentRow,
      [field]: value,
      manually: currentRow.manually
    };

    onDataChange(updated);

    // Обновляем на сервере только если строка уже существует
    if (currentRow.id && onCellUpdate) {
      const parsedValue = value === '' ? null : value;
      onCellUpdate(currentRow.id, field, parsedValue);
    }
  };

  const handleKeyDown = (e, rowIndex, colIndex) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const next = document.querySelector(`[data-cell="${rowIndex + 1}-${colIndex}"]`);
      if (next) next.focus();
    }
  };

  const handleAddRow = (insertAfterIndex) => {
    const emptyRow = schema.reduce((acc, col) => ({ ...acc, [col.field]: '' }), {});
    const updated = [...data];
    
    // Определяем позицию для вставки
    const insertPosition = lastAddedIndex !== null ? lastAddedIndex + 1 : insertAfterIndex + 1;
    
    // Вставляем новую строку и явно помечаем её как добавленную
    updated.splice(insertPosition, 0, { ...emptyRow, manually: true });
    
    // Обновляем последнюю позицию добавления
    setLastAddedIndex(insertPosition);
    
    onDataChange(updated);
  };

  const handleDeleteRow = (rowIndex) => {
    const row = data[rowIndex];
    const updated = [...data];
    
    // Если строка существует в базе данных, удаляем её
    if (row.id) {
      onDeleteRow(row.id);
    }
    
    // Удаляем строку из локального состояния
    updated.splice(rowIndex, 1);
    
    // Обновляем lastAddedIndex
    if (rowIndex === lastAddedIndex) {
      setLastAddedIndex(null);
    } else if (rowIndex < lastAddedIndex) {
      setLastAddedIndex(lastAddedIndex - 1);
    }
    
    onDataChange(updated);
  };

  const addRowAfterCodesList1 = ['1100', '1220', '1300', '1420', '1500', '1900', '1981', '2211', '4010'];
  const addRowAfterCodesList2 = ['26310', '26421', '26430', '26451', '26500', '26600'];

  const shouldShowAddButton = (lineCode) =>
    addRowAfterCodesList1.includes(lineCode) || addRowAfterCodesList2.includes(lineCode);

  return (
    <div className="fhd-table-wrapper">
      <table className={`fhd-table ${className || ''}`}>
        <thead>
          <tr>
            {schema.map(col => (
              <th key={col.field}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <tr>
                {schema.map((col, colIndex) => (
                  <td key={col.field}>
                    {col.field === 'actions' ? (
                      row.manually === true && (
                        <button onClick={() => handleDeleteRow(rowIndex)} className="del-button">
                          <FiTrash2 />
                        </button>
                      )
                    ) : (
                      <textarea
                        data-cell={`${rowIndex}-${colIndex}`}
                        value={row[col.field] ?? ''}
                        onChange={e => handleChange(rowIndex, col.field, e.target.value)}
                        onKeyDown={e => handleKeyDown(e, rowIndex, colIndex)}
                        rows={1}
                      />
                    )}
                  </td>
                ))}
              </tr>
              {shouldShowAddButton(row.lineCode) && (
                <tr>
                  <td colSpan={schema.length}>
                    <div className="fhd-add-row">
                      <button onClick={() => handleAddRow(rowIndex)}>
                        <IoIosAddCircleOutline /> Добавить строку
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FhdTable;
