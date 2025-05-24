import React, { useState } from 'react';
import { FiTrash2 } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";
import DecimalTextarea from './DecimalTextarea';

const FhdTable = ({ schema, data, onDataChange, onCellUpdate, onDeleteRow, className }) => {
  const [lastAddedIndex, setLastAddedIndex] = useState(null);

  const decimalFields = ['financialYearSum', 'planFirstYearSum', 'planLastYearSum', 'AutPlanYearSumm'];

  const handleChange = (rowIndex, field, value) => {
    const updated = [...data];
    const currentRow = updated[rowIndex];

    updated[rowIndex] = {
      ...currentRow,
      [field]: value,
      manually: currentRow.manually
    };

    onDataChange(updated);

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
    const insertPosition = lastAddedIndex !== null ? lastAddedIndex + 1 : insertAfterIndex + 1;
    updated.splice(insertPosition, 0, { ...emptyRow, manually: true });
    setLastAddedIndex(insertPosition);
    onDataChange(updated);
  };

  const handleDeleteRow = (rowIndex) => {
    const row = data[rowIndex];
    const updated = [...data];

    if (row.id) {
      onDeleteRow(row.id);
    }

    updated.splice(rowIndex, 1);

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
                    ) : decimalFields.includes(col.field) ? (
                      <DecimalTextarea
                        value={row[col.field]}
                        onChange={(val) => handleChange(rowIndex, col.field, val)}
                        onBlur={() => {}}
                        onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                        dataCell={`${rowIndex}-${colIndex}`}
                      />
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
