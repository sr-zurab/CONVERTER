import React from 'react';

const FhdTable = ({ schema, data, onDataChange, onCellUpdate }) => {
  const handleChange = (rowIndex, field, value) => {
    const updated = [...data];
    const currentRow = updated[rowIndex];

    const updatedValue = value;
    updated[rowIndex] = {
      ...currentRow,
      [field]: updatedValue,
      manually: true,
    };

    onDataChange(updated);

    // Обновляем на сервере
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
    updated.splice(insertAfterIndex + 1, 0, { ...emptyRow, manually: true });
    onDataChange(updated);
  };

  const handleDeleteRow = (rowIndex) => {
    const updated = [...data];
    updated.splice(rowIndex, 1);
    onDataChange(updated);
  };

  const addRowAfterCodesList1 = ['1100', '1220', '1300', '1420', '1500', '1900', '1981', '2211', '4010'];
  const addRowAfterCodesList2 = ['26310', '26421', '26430', '26451', '26500', '26600'];

  const shouldShowAddButton = (lineCode) =>
    addRowAfterCodesList1.includes(lineCode) || addRowAfterCodesList2.includes(lineCode);

  return (
    <div className="fhd-table-wrapper">
      <table className="fhd-table">
        <thead>
          <tr>
            {schema.map(col => (
              <th key={col.field}>{col.label}</th>
            ))}
            <th /> {/* для кнопки удалить */}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <tr>
                {schema.map((col, colIndex) => (
                  <td key={col.field}>
                    <textarea
                      data-cell={`${rowIndex}-${colIndex}`}
                      value={row[col.field] ?? ''}
                      onChange={e => handleChange(rowIndex, col.field, e.target.value)}
                      onKeyDown={e => handleKeyDown(e, rowIndex, colIndex)}
                      rows={1}
                    />
                  </td>
                ))}
                <td>
                  {row.manually === true && (
                    <button onClick={() => handleDeleteRow(rowIndex)} style={{ color: 'red' }}>
                      ✕
                    </button>
                  )}
                </td>
              </tr>
              {shouldShowAddButton(row.lineCode) && (
                <tr>
                  <td colSpan={schema.length + 1}>
                    <div className="fhd-add-row">
                      <button onClick={() => handleAddRow(rowIndex)}>
                        + Добавить строку
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
