import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {FiTrash2} from "react-icons/fi";
import {IoIosAddCircleOutline} from "react-icons/io";


const TableStateTask = ({schema, data, onDataChange, onCellUpdate, onDeleteRow, onAddRow}) =>{

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
    const handleBlur = (rowIndex, field, value) => {
        const currentRow = data[rowIndex];
        const parsedValue = value === "" ? null : value;
        if (currentRow?.id && typeof onCellUpdate === "function") {
            onCellUpdate(currentRow.id, field, parsedValue);
        }
    };

    // Добавление новой строки в конец
    const handleAddRow = () => {
        if (typeof onAddRow ==="function"){
            onAddRow();
        } else {
            const newRow = (schema?.cols || []).reduce((acc,col) => {
                acc[col.field] = "";
                return acc;
            },{});
            onDataChange([...(data || []), newRow]);
        }
    };


    // Удаление строки: если есть id и передан onDeleteRow — делегируем; иначе удаляем локально
    const handleDeleteRow = (rowIndex) => {
        const row = data[rowIndex];
        if (row?.id && typeof onDeleteRow === "function") {
            onDeleteRow(row.id);
            return;
        }
        const updated = (data || []).filter((_, idx) => idx !== rowIndex);
        onDataChange(updated);
    };


    const headerDepth = 1 + (Array.isArray(schema?.subheaders1) && schema.subheaders1.length > 0 ? 1 : 0) + (Array.isArray(schema?.subheaders2) && schema.subheaders2.length > 0 ? 1 : 0);
    const [focusedRow, setFocusedRow] = useState(null);
    const wrapperRef = useRef(null);
    const rowRefs = useRef([]);
    const [, force] = useState(0);

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;
        const onScroll = () => force(v => v + 1);
        el.addEventListener('scroll', onScroll);
        return () => el.removeEventListener('scroll', onScroll);
    }, []);

    useLayoutEffect(() => {
        // Re-render to align buttons after DOM updates
        force(v => v + 1);
    }, [data]);

    return(
            <div ref={wrapperRef} className="table-wrapper" style={{overflow: 'auto', WebkitOverflowScrolling: 'touch', position: 'relative', paddingRight: 48}}>
                <table className="table state-task-table" style={{tableLayout: 'auto', width: 'auto', minWidth: '100%'}}>
                    <thead>
                        <tr>
                            {schema.headers.map(col => (
                                <th key={col.field} colSpan={col.colspan} rowSpan={col.rowspan}>{col.label}</th>
                            ))}
                        </tr>
                        {Array.isArray(schema?.subheaders1) && schema.subheaders1.length > 0 && (
                            <tr>
                                {schema.subheaders1.map(col => (
                                    <th key={col.field} colSpan={col.colspan} rowSpan={col.rowspan}>{col.label}</th>
                                ))}
                            </tr>
                            )}
                         {Array.isArray(schema?.subheaders2) && schema.subheaders2.length > 0 && (
                            <tr>
                                {schema.subheaders2.map(col => (
                                    <th key={col.field} colSpan={col.colspan} rowSpan={col.rowspan}>{col.label}</th>
                                ))}
                            </tr>
                             )}
                    </thead>
                    <tbody>
                        {data.map((row,rowIndex)=>
                            <tr key={row.id ?? rowIndex} ref={el => rowRefs.current[rowIndex] = el}>
                                {schema.cols.map((col,colIndex) =>(
                                    <td key= {`${rowIndex}-${colIndex}`}>
                                        <textarea
                                            value={row[col.field] || ""}
                                            onChange={e => handleChange(rowIndex, col.field, e.target.value)}
                                            onBlur={e => handleBlur(rowIndex, col.field, e.target.value)}
                                            onKeyDown={e => handleKeyDown(e,rowIndex,colIndex)}
                                            onFocus={() => setFocusedRow(rowIndex)}
                                            data-cell={`${rowIndex}-${colIndex}`}
                                        />
                                    </td>
                                ))}
                            </tr>
                        )}
                    </tbody>
                </table>
                {/* Внешняя колонка кнопок удаления, выровненная по строкам */}
                <div className="row-actions-rail">
                    {data.map((row, rowIndex) => {
                        const tr = rowRefs.current[rowIndex];
                        const wrapper = wrapperRef.current;
                        const top = tr && wrapper ? (tr.offsetTop - wrapper.scrollTop + (tr.offsetHeight / 2)) : 0;
                        return (
                            <button
                                key={`del-${row.id ?? rowIndex}`}
                                className="del-button row-rail-btn"
                                style={{ top }}
                                title="Удалить строку"
                                onClick={() => handleDeleteRow(rowIndex)}
                            >
                                <FiTrash2/>
                            </button>
                        );
                    })}
                </div>
                <div className="add-row" style={{marginTop: 8}}>
                    <button onClick={handleAddRow}><IoIosAddCircleOutline/> Добавить строку</button>
                </div>
            </div>
        );
    }

export default TableStateTask;
