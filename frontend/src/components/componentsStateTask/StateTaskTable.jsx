import React from "react";


const TableStateTask = ({headers, subheaders1, subheaders2, cols, data, onDataChange, onCellUpdate, onDeleteRow}) =>{





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
                        {data.map((row,rowindex)=>
                            <tr key={rowindex}>
                                {cols.map((col,colindex) =>(
                                    <td key= {`${rowindex}-${colindex}`}>
                                        <textarea
                                            value={row[col.field] || ""}
                                            onChange={() => {}}
                                            onBlur={() => {}}
                                            onKeyDown={() => {}}
                                            data-cell={`${col.field}-${colindex}`}
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
