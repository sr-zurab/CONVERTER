import React, {useState} from 'react';
import {FiTrash2} from "react-icons/fi";
import {IoIosAddCircleOutline} from "react-icons/io";
import DecimalTextarea from './DecimalTextarea';

const FhdTable = ({schema, data, onDataChange, onCellUpdate, onDeleteRow, className}) => {
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
        const emptyRow = schema.reduce((acc, col) => ({...acc, [col.field]: ''}), {});
        const updated = [...data];
        const insertPosition = lastAddedIndex !== null ? lastAddedIndex + 1 : insertAfterIndex + 1;
        updated.splice(insertPosition, 0, {...emptyRow, manually: true});
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
        <div className="table-wrapper" style={{overflowX: 'auto'}}>
            <table className={`table ${className || ''}`} style={{tableLayout: 'fixed', width: '100%', minWidth: 1100, maxWidth: 1400}}>
                <thead>
                <tr>
                    {schema.map(col => (
                        <th key={col.field}>{col.label}</th>
                    ))}
                    <th key="actions-col"></th>
                </tr>
                <tr>
                    {schema.map((col, idx) => (
                        col.field === 'actions'
                            ? <th key={col.field + '-num'} style={{background: '#f8f9fa'}}></th>
                            : <th key={col.field + '-num'} style={{fontWeight: 400, background: '#f8f9fa', textAlign: 'center'}}>{idx + 1}</th>
                    ))}
                    <th key="actions-col-num" style={{background: '#f8f9fa'}}></th>
                </tr>
                </thead>
                <tbody>
                {data.map((row, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                        <tr>
                            {schema.map((col, colIndex) => (
                                <td key={col.field}>
                                    {col.field === 'actions' ? null
                                    : decimalFields.includes(col.field) ? (
                                        <DecimalTextarea
                                            value={row[col.field]}
                                            onChange={(val) => handleChange(rowIndex, col.field, val)}
                                            onBlur={() => {
                                            }}
                                            onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                                            dataCell={`${rowIndex}-${colIndex}`}
                                        />
                                    ) : col.field === 'name' && row.manually !== true ? (
                                        (() => {
                                            const value = row[col.field] || '';
                                            const lower = value.toLowerCase();
                                            let splitWord = null;
                                            let idx = -1;
                                            if (lower.includes('в том числе')) {
                                                splitWord = 'в том числе';
                                                idx = lower.indexOf(splitWord);
                                            } else if (lower.includes('из них')) {
                                                splitWord = 'из них';
                                                idx = lower.indexOf(splitWord);
                                            }
                                            if (splitWord && idx !== -1) {
                                                const before = value.slice(0, idx).trim();
                                                const after = value.slice(idx).trim();
                                                return (
                                                    <div style={{whiteSpace: 'pre-line', wordBreak: 'break-word', width: '100%', minHeight: 30, padding: 4, background: '#f0f0f0'}} title={value}>
                                                        {before}
                                                        <br/>
                                                        <span style={{display: 'block', textAlign: 'center', fontWeight: 500}}>{after}</span>
                                                    </div>
                                                );
                                            } else {
                                                return (
                                                    <div
                                                        style={{whiteSpace: 'pre-line', wordBreak: 'break-word', width: '100%', minHeight: 30, padding: 4, background: '#f0f0f0'}}
                                                        title={value}
                                                    >
                                                        {value}
                                                    </div>
                                                );
                                            }
                                        })()
                                    ) : col.field === 'lineCode' && row.manually !== true ? (
                                        <div
                                            style={{whiteSpace: 'pre-line', wordBreak: 'break-word', width: '100%', minHeight: 30, padding: 4, background: '#f0f0f0'}}
                                            title={row[col.field]}
                                        >
                                            {row[col.field]}
                                        </div>
                                    ) : (
                                        <textarea
                                            data-cell={`${rowIndex}-${colIndex}`}
                                            value={row[col.field] ?? ''}
                                            onChange={e => handleChange(rowIndex, col.field, e.target.value)}
                                            onKeyDown={e => handleKeyDown(e, rowIndex, colIndex)}
                                            rows={1}
                                            style={{whiteSpace: 'pre-line', wordBreak: 'break-word', width: '100%', minHeight: 30, padding: 4}}
                                        />
                                    )}
                                </td>
                            ))}
                            <td key="actions-btn" style={{paddingRight: 12, minWidth: 44, width: 44, textAlign: 'center'}}>
                                {row.manually === true && (
                                    <button onClick={() => handleDeleteRow(rowIndex)} className="del-button">
                                        <FiTrash2/>
                                    </button>
                                )}
                            </td>
                        </tr>
                        {shouldShowAddButton(row.lineCode) && (
                            <tr>
                                <td colSpan={schema.length}>
                                    <div className="add-row">
                                        <button onClick={() => handleAddRow(rowIndex)}>
                                            <IoIosAddCircleOutline/> Добавить строку
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