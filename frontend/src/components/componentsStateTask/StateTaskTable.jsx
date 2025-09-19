import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";

const TableStateTask = ({ schema, data, onDataChange, onCellUpdate, onDeleteRow, onAddRow }) => {
	 	 const saveTimeouts = useRef({});
	 	 const handleChange = (rowIndex, field, value) => {
	 	 	 	 const updated = [...data];
	 	 	 	 const currentRow = updated[rowIndex];

	 	 	 	 updated[rowIndex] = {
	 	 	 	 	 	 ...currentRow,
	 	 	 	 	 	 [field]: value,
	 	 	 	 };
	 	 	 	 onDataChange(updated);
	 	 	 	 const key = `${rowIndex}-${field}`;
	 	 	 	 if (saveTimeouts.current[key]) {
	 	 	 	 	 	 clearTimeout(saveTimeouts.current[key]);
	 	 	 	 }

	 	 	 	 saveTimeouts.current[key] = setTimeout(() => {
	 	 	 	 	 	 if (currentRow.id && onCellUpdate) {
	 	 	 	 	 	 	 	 const parsedValue = value === '' ? null : value;
	 	 	 	 	 	 	 	 onCellUpdate(currentRow.id, field, parsedValue);
	 	 	 	 	 	 }
	 	 	 	 }, 1000);
	 	 };
	 	 const handleKeyDown = (e, rowIndex, colIndex) => {
	 	 	 	 const value = e.target.value;
	 	 	 	 const field = schema.cols[colIndex].field;

	 	 	 	 if (["Enter", "ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].includes(e.key)) {
	 	 	 	 	 	 e.preventDefault();
	 	 	 	 	 	 handleChange(rowIndex, field, value);
	 	 	 	 	 	 handleBlur(rowIndex, field, value);
	 	 	 	 }
	 	 	 	 let nextRow = rowIndex;
	 	 	 	 let nextCol = colIndex;
	 	 	 	 switch (e.key) {
	 	 	 	 	 	 case "Enter":
	 	 	 	 	 	 case "ArrowRight":
	 	 	 	 	 	 	 	 nextCol += 1;
	 	 	 	 	 	 	 	 if (nextCol >= schema.cols.length) {
	 	 	 	 	 	 	 	 	 	 nextCol = 0;
	 	 	 	 	 	 	 	 	 	 nextRow += 1;
	 	 	 	 	 	 	 	 }
	 	 	 	 	 	 	 	 break;
	 	 	 	 	 	 case "ArrowLeft":
	 	 	 	 	 	 	 	 nextCol -= 1;
	 	 	 	 	 	 	 	 if (nextCol < 0) {
	 	 	 	 	 	 	 	 	 	 nextCol = schema.cols.length - 1;
	 	 	 	 	 	 	 	 	 	 nextRow -= 1;
	 	 	 	 	 	 	 	 }
	 	 	 	 	 	 	 	 break;
	 	 	 	 	 	 case "ArrowDown":
	 	 	 	 	 	 	 	 nextRow += 1;
	 	 	 	 	 	 	 	 break;
	 	 	 	 	 	 case "ArrowUp":
	 	 	 	 	 	 	 	 nextRow -= 1;
	 	 	 	 	 	 	 	 break;
	 	 	 	 	 	 default:
	 	 	 	 	 	 	 	 return;
	 	 	 	 }

	 	 	 	 if (nextRow < 0 || nextCol < 0) return;

	 	 	 	 const next = document.querySelector(`[data-cell="${nextRow}-${nextCol}"]`);
	 	 	 	 if (next) {
	 	 	 	 	 	 next.focus();
	 	 	 	 } else if (nextRow >= data.length) {
	 	 	 	 	 	 handleAddRow();
	 	 	 	 	 	 setTimeout(() => {
	 	 	 	 	 	 	 	 const newCell = document.querySelector(`[data-cell="${nextRow}-${nextCol}"]`);
	 	 	 	 	 	 	 	 if (newCell) newCell.focus();
	 	 	 	 	 	 }, 0);
	 	 	 	 }
	 	 };

	 	 const handleBlur = (rowIndex, field, value) => {
	 	 	 	 const currentRow = data[rowIndex];
	 	 	 	 const parsedValue = value === "" ? null : value;
	 	 	 	 if (currentRow?.id && typeof onCellUpdate === "function") {
	 	 	 	 	 	 onCellUpdate(currentRow.id, field, parsedValue);
	 	 	 	 }
	 	 };

	 	 const handleAddRow = () => {
	 	 	 	 if (typeof onAddRow === "function") {
	 	 	 	 	 	 onAddRow();
	 	 	 	 } else {
	 	 	 	 	 	 const newRow = (schema?.cols || []).reduce((acc, col) => {
	 	 	 	 	 	 	 	 acc[col.field] = "";
	 	 	 	 	 	 	 	 return acc;
	 	 	 	 	 	 }, {});
	 	 	 	 	 	 onDataChange([...(data || []), newRow]);
	 	 	 	 }
	 	 };

	 	 const handleDeleteRow = (rowIndex) => {
	 	 	 	 const row = data[rowIndex];
	 	 	 	 if (row?.id && typeof onDeleteRow === "function") {
	 	 	 	 	 	 onDeleteRow(row.id);
	 	 	 	 	 	 return;
	 	 	 	 }
	 	 	 	 const updated = (data || []).filter((_, idx) => idx !== rowIndex);
	 	 	 	 onDataChange(updated);
	 	 };

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

	 	 useEffect(() => {
	 	 	 	 return () => {
	 	 	 	 	 	 Object.values(saveTimeouts.current).forEach(clearTimeout);
	 	 	 	 };
	 	 }, []);

	 	 useLayoutEffect(() => {
	 	 	 	 force(v => v + 1);
	 	 }, [data]);

	 	 return (
	 	 	 	 <div ref={wrapperRef} className="table-wrapper" style={{ overflow: 'auto', WebkitOverflowScrolling: 'touch', position: 'relative', paddingRight: 48 }}>
	 	 	 	 	 	 <table className="table state-task-table" style={{ tableLayout: 'auto', width: 'auto', minWidth: '100%' }}>
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
	 	 	 	 	 	 	 	 	 	 {data.map((row, rowIndex) =>
	 	 	 	 	 	 	 	 	 	 	 	 <tr key={row.id ?? rowIndex} ref={el => rowRefs.current[rowIndex] = el}>
	 	 	 	 	 	 	 	 	 	 	 	 	 	 {schema.cols.map((col, colIndex) => (
	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 <td key={`${rowIndex}-${colIndex}`}>
	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 <textarea
	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 value={row[col.field] || ""}
	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 onChange={e => handleChange(rowIndex, col.field, e.target.value)}
	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 onBlur={e => handleBlur(rowIndex, col.field, e.target.value)}
	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 onKeyDown={e => handleKeyDown(e, rowIndex, colIndex)}
	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 data-cell={`${rowIndex}-${colIndex}`}
	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 />
	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 </td>
	 	 	 	 	 	 	 	 	 	 	 	 	 	 ))}
	 	 	 	 	 	 	 	 	 	 	 	 </tr>
	 	 	 	 	 	 	 	 	 	 )}
	 	 	 	 	 	 	 	 </tbody>
	 	 	 	 	 	 </table>
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
	 	 	 	 	 	 	 	 	 	 	 	 	 	 <FiTrash2 />
	 	 	 	 	 	 	 	 	 	 	 	 </button>
	 	 	 	 	 	 	 	 	 	 );
	 	 	 	 	 	 	 	 })}
	 	 	 	 	 	 </div>
	 	 	 	 	 	 <div className="add-row" style={{ marginTop: 8 }}>
	 	 	 	 	 	 	 	 <button onClick={handleAddRow}><IoIosAddCircleOutline /> Добавить строку</button>
	 	 	 	 	 	 </div>
	 	 	 	 </div>
	 	 );
};

export default TableStateTask;