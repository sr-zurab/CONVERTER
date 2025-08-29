import React from "react";


const TableStateTask = ({headers, subheaders1, subheaders2, cols, data, onDataChange, onCellUpdate, onDeleteRow}) =>{

    //Обновление строки и ячеек
    const handleChange = (rowIndex, field, value) => {
        const updated = [...data];
        const currentRow = updated[rowIndex];

        updated[rowIndex] = {
            ...currentRow,
            [field]: value,
        };

        onDataChange(updated);

        if (currentRow.id && onCellUpdate) {
            const parsedValue = value === '' ? null : value;
            onCellUpdate(currentRow.id, field, parsedValue);
        }
    };

    //Управление таблицей с помощью кнопок
    const handleKeyDown = (e, rowIndex, colIndex) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const next = document.querySelector(`[data-cell="${rowIndex + 1}-${colIndex}"]`);
            if (next) next.focus();
        }
    };

    //Вызов обновления ячейки после ввода пользователя
    const handleBlur = (rowIndex, value, data, onCellUpdate, field) => {
        const currentRow = data[rowIndex];
        const parsedValue = value === "" ? null : value;
        if (currentRow.id && typeof onCellUpdate === "function") {
            onCellUpdate(currentRow.id, field, parsedValue);
        }
    };


    return(
            <div>
                <table>
                    <thead>
                        <tr>
                            {headers.map(col => (
                                <th key={col.field} colSpan={col.colspan} rowSpan={col.rowspan}>{col.label}</th>
                            ))}
                        </tr>
                        {subheaders1 && subheaders1.length > 0 && (
                            <tr>
                                {subheaders1.map(col => (
                                    <th key={col.field} colSpan={col.colspan} rowSpan={col.rowspan}>{col.label}</th>
                                ))}
                            </tr>
                            )}
                         {subheaders2 && subheaders2.length > 0 && (
                            <tr>
                                {subheaders2.map(col => (
                                    <th key={col.field} colSpan={col.colspan} rowSpan={col.rowspan}>{col.label}</th>
                                ))}
                            </tr>
                             )}
                    </thead>
                    <tbody>
                        {data.map((row,rowIndex)=>
                            <tr key={rowIndex}>
                                {cols.map((col,colIndex) =>(
                                    <td key= {`${rowIndex}-${colIndex}`}>
                                        <textarea
                                            value={row[col.field] || ""}
                                            onChange={e => handleChange(rowIndex, col.field, e.target.value)}
                                            onBlur={e => {handleBlur(rowIndex, col.field, e.target.value)}}
                                            onKeyDown={e => {handleKeyDown(e,rowIndex,colIndex)}}
                                            data-cell={`${col.field}-${colIndex}`}
                                        />
                                    </td>
                                ))}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
