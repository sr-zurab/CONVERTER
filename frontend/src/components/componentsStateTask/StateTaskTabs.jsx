import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { actsSettingThePrice as schemaActs } from '../../schemas/stateTask/tableActsSettingThePriceService';
import { InformingPotentialConsumersOfTheService as schemaInform } from '../../schemas/stateTask/tableInformingPotentialConsumersOfTheService';
import { IndicatorsQuality as schemaQuality } from '../../schemas/stateTask/tableIndicatorsQualityService';
import { IndicatorsVolume as schemaVolume } from '../../schemas/stateTask/tableIndicatorsVolumeService';
import {regulatingAct as schemaRegulatingAct} from '../../schemas/stateTask/tableRegulatingAct.js';
import TableStateTask from './StateTaskTable';
import { fetchActsSettingPrice, addActsSettingPrice, updateActsSettingPrice, deleteActsSettingPrice } from '../../store/actsSettingThePriceSlice.js';
import { fetchInformingPotentialConsumers, addInformingPotentialConsumers, updateInformingPotentialConsumers, deleteInformingPotentialConsumers } from '../../store/informingPotentialConsumersSlice.js';
import { fetchIndicatorsQualityService, addIndicatorsQualityService, updateIndicatorsQualityService, deleteIndicatorsQualityService } from '../../store/qualityServiceSlice.js';
import { fetchIndicatorsVolumeService, addIndicatorsVolumeService, updateIndicatorsVolumeService, deleteIndicatorsVolumeService } from '../../store/volumeServiceSlice.js';
import {fetchRegulatingAct, addRegulatingAct, updateRegulatingAct, deleteRegulatingAct} from "../../store/regulatingActSlice.js";

const StateTaskTabs = ({ organization, section }) => {
    const dispatch = useDispatch();
    const [year, setYear] = useState(new Date().getFullYear());
    const [currentSection, setCurrentSection] = useState(section ?? 1);
    const serverActsSettingThePrice = useSelector(state => state.actsSettingPrice.list);
    const serverInformingPotentialConsumersOfTheService = useSelector(state => state.informingPotentialConsumers.list);
    const serverIndicatorsQuality = useSelector(state => state.qualityService.list);
    const serverIndicatorsVolume = useSelector(state => state.volumeService.list);
    const serverRegulatingAct = useSelector(state => state.regulatingAct.list);
    const [actsSettingThePriceData, setActsSettingThePriceData] = useState([]);
    const [informingPotentialConsumersOfTheServiceData, setInformingPotentialConsumersOfTheServiceData] = useState([]);
    const [indicatorsQualityData, setIndicatorsQualityData] = useState([]);
    const [indicatorsVolumeData, setIndicatorsVolumeData] = useState([]);
    const [regulatingActData, setRegulatingActData] = useState([]);
    
    // Синхронизация локальной секции с пропом
    useEffect(() => {
        if (section != null) setCurrentSection(section);
    }, [section]);
    
    useEffect(() => {
        if (organization?.id && year && currentSection != null) {
            dispatch(fetchActsSettingPrice({organizationId: organization.id, year, section: currentSection}));
            dispatch(fetchInformingPotentialConsumers({organizationId: organization.id, year, section: currentSection}));
            dispatch(fetchIndicatorsQualityService({organizationId: organization.id, year, section: currentSection}));
            dispatch(fetchIndicatorsVolumeService({organizationId: organization.id, year, section: currentSection}));
            dispatch(fetchRegulatingAct({organizationId: organization.id, year, section: currentSection}));
        }
    }, [organization, year, currentSection, dispatch]);

    useEffect(() => { setActsSettingThePriceData(serverActsSettingThePrice || []); }, [serverActsSettingThePrice]);
    useEffect(() => { setInformingPotentialConsumersOfTheServiceData(serverInformingPotentialConsumersOfTheService || []); }, [serverInformingPotentialConsumersOfTheService]);
    useEffect(() => { setIndicatorsQualityData(serverIndicatorsQuality || []); }, [serverIndicatorsQuality]);
    useEffect(() => { setIndicatorsVolumeData(serverIndicatorsVolume || []); }, [serverIndicatorsVolume]);
    useEffect(() => { setRegulatingActData(serverRegulatingAct || []); }, [serverRegulatingAct]);
    
   const onAddActs = () => dispatch(addActsSettingPrice({organization: organization.id, year, section: currentSection}));
   const onAddInform = () => dispatch(addInformingPotentialConsumers({organization: organization.id,year, section: currentSection}));
   const onAddQuality = () => dispatch((addIndicatorsQualityService({organization: organization.id,year, section: currentSection}))) ;
   const onAddVolume = () => dispatch(addIndicatorsVolumeService({organization: organization.id,year, section: currentSection}));
   const onAddRegulatingAct = () => dispatch(addRegulatingAct({organization: organization.id, year, section: currentSection}));
    
    const onUpdateActs = (id, field, value) => dispatch(updateActsSettingPrice({ id, data: { [field]: value } }));
    const onUpdateInform = (id, field, value) => dispatch(updateInformingPotentialConsumers({ id, data: { [field]: value } }));
    const onUpdateQuality = (id, field, value) => dispatch(updateIndicatorsQualityService({ id, data: { [field]: value } }));
    const onUpdateVolume = (id, field, value) => dispatch(updateIndicatorsVolumeService({ id, data: { [field]: value } }));
    const onUpdateRegulatingAct = (id, field, value) => dispatch(updateRegulatingAct({ id, data: { [field]: value } }));
    
    const onDeleteActs = (id) => dispatch(deleteActsSettingPrice(id));
    const onDeleteInform = (id) => dispatch(deleteInformingPotentialConsumers(id));
    const onDeleteQuality = (id) => dispatch(deleteIndicatorsQualityService(id));
    const onDeleteVolume = (id) => dispatch(deleteIndicatorsVolumeService(id));
    const onDeleteRegulatingAct= (id) => dispatch(deleteRegulatingAct(id));
    
    const handleRefreshData = () => {
        if (!organization?.id || currentSection == null) return;
        dispatch(fetchActsSettingPrice({organizationId: organization.id, year, section: currentSection}));
        dispatch(fetchInformingPotentialConsumers({organizationId: organization.id, year, section: currentSection}));
        dispatch(fetchIndicatorsQualityService({organizationId: organization.id, year, section: currentSection}));
        dispatch(fetchIndicatorsVolumeService({organizationId: organization.id, year, section: currentSection}));
        dispatch(fetchRegulatingAct({organizationId: organization.id, year, section: currentSection}));
    }
    
    const qualitySchemaNorm = { headers: schemaQuality.headers, subheaders1: schemaQuality.subHeaders1, subheaders2: schemaQuality.subHeaders2, cols: schemaQuality.cols };
    const volumeSchemaNorm = { headers: schemaVolume.headers, subheaders1: schemaVolume.subHeaders1, subheaders2: schemaVolume.subHeaders2, cols: schemaVolume.cols };
    
    return (
        <div className="planfhd-container">
            <div className="controls" style={{marginBottom: 12}}>
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
                    value={currentSection}
                    onChange={e => setCurrentSection(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
                    placeholder="Раздел"
                    style={{width: 120, padding: '8px 12px', borderRadius: 8, border: '1px solid #dee2e6'}}/>
                </label>
                <button onClick={handleRefreshData}>Обновить</button>
            </div>
            <div style={{flex: 1, minHeight: 0, overflow: 'auto'}}>
                <label style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <span style={{fontSize: '14px', fontWeight: 'bold'}}>1. Наименование муниципальной услуги </span>
                    <textarea
                        style={{width: '800px', height: '45px', fontSize: '14px'}}></textarea>
                    <span
                        style={{
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }}>Код по общероссийскому<br/>базовому перечню или<br/>федеральному перечню </span>
                    <textarea
                        style={{width: '80px', height: '30px', fontSize: '14px'}}></textarea>
                </label>
                <br/>
                <label style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <span
                        style={{
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }}>2. Категории потребителей муниципальной услуги </span>
                    <textarea
                        style={{width: '800px', height: '30px', fontSize: '18px'}}></textarea>
                </label>

                <p style={{fontSize: '14px', fontWeight: 'bold'}}>3. Показатели, характеризующие объем и (или) качество
                    муниципальной услуги</p>
                <p style={{fontSize: '14px', fontWeight: 'bold'}}>3.1. Показатели, характеризующие качество
                    муниципальной услуги</p>
                <TableStateTask schema={qualitySchemaNorm} data={indicatorsQualityData}
                                onDataChange={setIndicatorsQualityData}
                                onCellUpdate={onUpdateQuality} onDeleteRow={onDeleteQuality}
                                onAddRow={onAddQuality}/><br/>
                <p style={{fontSize: '14px', fontWeight: 'bold'}}>3.2. Показатели, характеризующие объём муниципальной
                    услуги</p>
                <TableStateTask schema={volumeSchemaNorm} data={indicatorsVolumeData}
                                onDataChange={setIndicatorsVolumeData}
                                onCellUpdate={onUpdateVolume} onDeleteRow={onDeleteVolume} onAddRow={onAddVolume}/><br/>
                <p style={{fontSize: '14px', fontWeight: 'bold'}}>4. Нормативные правовые акты, устанавливающие размер
                    платы (цену, тариф) либо порядок ее установления</p>
                <TableStateTask schema={schemaActs} data={actsSettingThePriceData}
                                onDataChange={setActsSettingThePriceData}
                                onCellUpdate={onUpdateActs} onDeleteRow={onDeleteActs} onAddRow={onAddActs}/><br/>
                <p style={{fontSize: '14px', fontWeight: 'bold'}}>5. Порядок оказания государственной услуги</p>
                <p style={{fontSize: '14px', fontWeight: 'bold'}}>5.1. Нормативные правовые акты, регулирующие порядок
                    оказания государственной услуги</p>
                <TableStateTask schema={schemaRegulatingAct} data={regulatingActData}
                                onDataChange={setRegulatingActData}
                                onCellUpdate={onUpdateRegulatingAct} onDeleteRow={onDeleteRegulatingAct} onAddRow={onAddRegulatingAct}/><br/>
                <p style={{fontSize: '14px', fontWeight: 'bold'}}>5.2. Порядок информирования потенциальных потребителей
                    государственной услуги</p>
                <TableStateTask schema={schemaInform} data={informingPotentialConsumersOfTheServiceData}
                                onDataChange={setInformingPotentialConsumersOfTheServiceData}
                                onCellUpdate={onUpdateInform} onDeleteRow={onDeleteInform} onAddRow={onAddInform}/>
            </div>
        </div>
    );
}

export default StateTaskTabs;