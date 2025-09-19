import React, { useState } from "react";
import StateTaskSheet1 from "./StateTaskSheet1";
import {MdRefresh} from "react-icons/md";
import {LuFileSpreadsheet} from "react-icons/lu";

const StateTaskControls = ({ organization }) => {
	 const [year, setYear] = useState(new Date().getFullYear());
	 const [section, setSection] = useState(1);
	 const [activeSheet, setActiveSheet] = useState(1); // переключение листов
	 const [refreshKey, setRefreshKey] = useState(0);
	 const handleRefresh = () => {
		 setRefreshKey(prev => prev + 1);
	 }
	 return (
	 	 <div className="planfhd-container">
	 	 	 {/* Панель управления */}
			 <div className="controls" style={{marginBottom: 12, display: "flex", alignItems: "center", gap: "12px"}}>
				 <select value={year} onChange={e => setYear(parseInt(e.target.value, 10))}>
					 {[2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030].map(y => (
						 <option key={y} value={y}>{y}</option>
					 ))}
				 </select>
				 <label>
					 Номер раздела:
					 <input
						 type="number"
						 min={1}
						 value={section}
						 onChange={e => setSection(e.target.value === "" ? "" : parseInt(e.target.value, 10))}
						 style={{width: 120, padding: "8px 12px", borderRadius: 8, border: "1px solid #dee2e6"}}
					 />
				 </label>
				 <button onClick={handleRefresh}><MdRefresh/> Обновить</button>
				 <button onClick={() => setActiveSheet(1)} className={activeSheet === 1 ? 'active' : ''}><LuFileSpreadsheet/> Часть 1: Услуги</button>
				 <button onClick={() => setActiveSheet(2)} className={activeSheet === 2 ? 'active' : ''}><LuFileSpreadsheet/> Часть 2: Работы</button>
				 <button onClick={() => setActiveSheet(3)} className={activeSheet === 3 ? 'active' : ''}><LuFileSpreadsheet/> Часть 3: Прочие сведения</button>
			 </div>

			 {/* Рендер листов, виден только активный */}
			 {activeSheet === 1 && <StateTaskSheet1 organization={organization} year={year} section={section} />}
	 	 </div>
	 );
};

export default StateTaskControls;