import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actsSettingThePrice as schemaActs } from "../../schemas/stateTask/tableActsSettingThePriceService";
import { InformingPotentialConsumersOfTheService as schemaInform } from "../../schemas/stateTask/tableInformingPotentialConsumersOfTheService";
import { IndicatorsQuality as schemaQuality } from "../../schemas/stateTask/tableIndicatorsQualityService";
import { IndicatorsVolume as schemaVolume } from "../../schemas/stateTask/tableIndicatorsVolumeService";
import { regulatingAct as schemaRegulatingAct } from "../../schemas/stateTask/tableRegulatingAct";
import TableStateTask from "./StateTaskTable";
import {
	 fetchActsSettingPrice, addActsSettingPrice, updateActsSettingPrice, deleteActsSettingPrice
} from "../../store/actsSettingThePriceSlice";
import {
	 fetchInformingPotentialConsumers, addInformingPotentialConsumers, updateInformingPotentialConsumers, deleteInformingPotentialConsumers
} from "../../store/informingPotentialConsumersSlice";
import {
	 fetchIndicatorsQualityService, addIndicatorsQualityService, updateIndicatorsQualityService, deleteIndicatorsQualityService
} from "../../store/qualityServiceSlice";
import {
	 fetchIndicatorsVolumeService, addIndicatorsVolumeService, updateIndicatorsVolumeService, deleteIndicatorsVolumeService
} from "../../store/volumeServiceSlice";
import {
	 fetchRegulatingAct, addRegulatingAct, updateRegulatingAct, deleteRegulatingAct
} from "../../store/regulatingActSlice";

const StateTaskSheet1 = ({ organization, year, section, refreshKey}) => {
	 const dispatch = useDispatch();

	 // Данные из Redux
	 const serverActs = useSelector(state => state.actsSettingPrice.list);
	 const serverInform = useSelector(state => state.informingPotentialConsumers.list);
	 const serverQuality = useSelector(state => state.qualityService.list);
	 const serverVolume = useSelector(state => state.volumeService.list);
	 const serverRegAct = useSelector(state => state.regulatingAct.list);

	 // Локальные состояния для таблиц
	 const [actsData, setActsData] = useState([]);
	 const [informData, setInformData] = useState([]);
	 const [qualityData, setQualityData] = useState([]);
	 const [volumeData, setVolumeData] = useState([]);
	 const [regActData, setRegActData] = useState([]);

	 // Загрузка данных при изменении organization, year или section
	 useEffect(() => {
	 	 if (organization?.id && year && section != null) {
	 	 	 dispatch(fetchActsSettingPrice({ organizationId: organization.id, year, section }));
	 	 	 dispatch(fetchInformingPotentialConsumers({ organizationId: organization.id, year, section }));
	 	 	 dispatch(fetchIndicatorsQualityService({ organizationId: organization.id, year, section }));
	 	 	 dispatch(fetchIndicatorsVolumeService({ organizationId: organization.id, year, section }));
	 	 	 dispatch(fetchRegulatingAct({ organizationId: organization.id, year, section }));
	 	 }
	 }, [organization, year, section, refreshKey, dispatch]);

	 // Синхронизация с Redux
	 useEffect(() => { setActsData(serverActs || []); }, [serverActs]);
	 useEffect(() => { setInformData(serverInform || []); }, [serverInform]);
	 useEffect(() => { setQualityData(serverQuality || []); }, [serverQuality]);
	 useEffect(() => { setVolumeData(serverVolume || []); }, [serverVolume]);
	 useEffect(() => { setRegActData(serverRegAct || []); }, [serverRegAct]);
	 // CRUD
	 const onAddActs = () => dispatch(addActsSettingPrice({ organization: organization.id, year, section }));
	 const onUpdateActs = (id, field, value) => dispatch(updateActsSettingPrice({ id, data: { [field]: value } }));
	 const onDeleteActs = (id) => dispatch(deleteActsSettingPrice(id));

	 const onAddInform = () => dispatch(addInformingPotentialConsumers({ organization: organization.id, year, section }));
	 const onUpdateInform = (id, field, value) => dispatch(updateInformingPotentialConsumers({ id, data: { [field]: value } }));
	 const onDeleteInform = (id) => dispatch(deleteInformingPotentialConsumers(id));

	 const onAddQuality = () => dispatch(addIndicatorsQualityService({ organization: organization.id, year, section }));
	 const onUpdateQuality = (id, field, value) => dispatch(updateIndicatorsQualityService({ id, data: { [field]: value } }));
	 const onDeleteQuality = (id) => dispatch(deleteIndicatorsQualityService(id));

	 const onAddVolume = () => dispatch(addIndicatorsVolumeService({ organization: organization.id, year, section }));
	 const onUpdateVolume = (id, field, value) => dispatch(updateIndicatorsVolumeService({ id, data: { [field]: value } }));
	 const onDeleteVolume = (id) => dispatch(deleteIndicatorsVolumeService(id));

	 const onAddRegAct = () => dispatch(addRegulatingAct({ organization: organization.id, year, section }));
	 const onUpdateRegAct = (id, field, value) => dispatch(updateRegulatingAct({ id, data: { [field]: value } }));
	 const onDeleteRegAct = (id) => dispatch(deleteRegulatingAct(id));

	 const qualitySchemaNorm = { headers: schemaQuality.headers, subheaders1: schemaQuality.subHeaders1, subheaders2: schemaQuality.subHeaders2, cols: schemaQuality.cols };
	 const volumeSchemaNorm = { headers: schemaVolume.headers, subheaders1: schemaVolume.subHeaders1, subheaders2: schemaVolume.subHeaders2, cols: schemaVolume.cols };

	 return (
	 	 <div style={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
	 	 	 <label style={{ display: "flex", alignItems: "center", gap: "12px" }}>
	 	 	 	 <span style={{ fontSize: "14px", fontWeight: "bold" }}>1. Наименование муниципальной услуги</span>
	 	 	 	 <textarea style={{ width: "800px", height: "45px", fontSize: "14px" }}></textarea>
	 	 	 	 <span style={{ fontSize: "14px", fontWeight: "bold" }}>Код по общероссийскому<br/>базовому перечню или<br/>федеральному перечню</span>
	 	 	 	 <textarea style={{ width: "80px", height: "30px", fontSize: "14px" }}></textarea>
	 	 	 </label>

	 	 	 <br />

	 	 	 <label style={{ display: "flex", alignItems: "center", gap: "12px" }}>
	 	 	 	 <span style={{ fontSize: "14px", fontWeight: "bold" }}>2. Категории потребителей муниципальной услуги</span>
	 	 	 	 <textarea style={{ width: "800px", height: "30px", fontSize: "18px" }}></textarea>
	 	 	 </label>

	 	 	 <p style={{ fontSize: "14px", fontWeight: "bold" }}>3. Показатели, характеризующие объем и (или) качество муниципальной услуги</p>
	 	 	 <p style={{ fontSize: "14px", fontWeight: "bold" }}>3.1. Показатели, характеризующие качество муниципальной услуги</p>
	 	 	 <TableStateTask schema={qualitySchemaNorm} data={qualityData} onDataChange={setQualityData} onCellUpdate={onUpdateQuality} onDeleteRow={onDeleteQuality} onAddRow={onAddQuality}/>
	 	 	 <br/>
	 	 	 <p style={{ fontSize: "14px", fontWeight: "bold" }}>3.2. Показатели, характеризующие объём муниципальной услуги</p>
	 	 	 <TableStateTask schema={volumeSchemaNorm} data={volumeData} onDataChange={setVolumeData} onCellUpdate={onUpdateVolume} onDeleteRow={onDeleteVolume} onAddRow={onAddVolume}/>
	 	 	 <br/>
	 	 	 <p style={{ fontSize: "14px", fontWeight: "bold" }}>4. Нормативные правовые акты, устанавливающие размер платы (цену, тариф) либо порядок ее установления</p>
	 	 	 <TableStateTask schema={schemaActs} data={actsData} onDataChange={setActsData} onCellUpdate={onUpdateActs} onDeleteRow={onDeleteActs} onAddRow={onAddActs}/>
	 	 	 <br/>
	 	 	 <p style={{ fontSize: "14px", fontWeight: "bold" }}>5. Порядок оказания государственной услуги</p>
	 	 	 <p style={{ fontSize: "14px", fontWeight: "bold" }}>5.1. Нормативные правовые акты, регулирующие порядок оказания государственной услуги</p>
	 	 	 <TableStateTask schema={schemaRegulatingAct} data={regActData} onDataChange={setRegActData} onCellUpdate={onUpdateRegAct} onDeleteRow={onDeleteRegAct} onAddRow={onAddRegAct}/>
	 	 	 <br/>
	 	 	 <p style={{ fontSize: "14px", fontWeight: "bold" }}>5.2. Порядок информирования потенциальных потребителей государственной услуги</p>
	 	 	 <TableStateTask schema={schemaInform} data={informData} onDataChange={setInformData} onCellUpdate={onUpdateInform} onDeleteRow={onDeleteInform} onAddRow={onAddInform}/>
	 	 </div>
	 );
};

export default StateTaskSheet1;