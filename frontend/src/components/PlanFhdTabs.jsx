import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fhdSchemaList1} from '../schemas/tabelFhdSchemaList1';
import {fhdSchemaList2} from '../schemas/tabelFhdSchemaList2';
import FhdTable from './FhdTable';
import {
    fetchPlanPaymentIndex,
    addPlanPaymentIndex,
    updatePlanPaymentIndex,
    deletePlanPaymentIndex
} from '../store/planPaymentIndexSlice.js';
import {
    fetchPlanPaymentTru,
    addPlanPaymentTru,
    updatePlanPaymentTru,
    deletePlanPaymentTru
} from '../store/paymentTruSlice.js';
import {mergeDefaultAndServerData} from '../utils/mergeFhdData';
import {BsFiletypeXlsx, BsFiletypeXml} from "react-icons/bs";
import {RiSave2Fill} from "react-icons/ri";
import {LuFileSpreadsheet} from "react-icons/lu";
import {FiUpload} from "react-icons/fi";
import {MdRefresh} from "react-icons/md";

const PlanFhdTabs = ({organization}) => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('list1');
    const [year, setYear] = useState(new Date().getFullYear());
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const serverIndex = useSelector(state => state.planPaymentIndex.list);
    const serverTru = useSelector(state => state.paymentTru.list);

    const [indexData, setIndexData] = useState([]);
    const [truData, setTruData] = useState([]);

    useEffect(() => {
        if (organization?.id && year) {
            dispatch(fetchPlanPaymentIndex({organizationId: organization.id, year}));
            dispatch(fetchPlanPaymentTru({organizationId: organization.id, year}));
        }
    }, [organization, year, dispatch]);

    useEffect(() => {
        const filtered = serverIndex.filter(i => i.year === year);
        setIndexData(mergeDefaultAndServerData(fhdSchemaList1.defaultPaymentIndex, filtered));
    }, [serverIndex, year]);

    useEffect(() => {
        const filtered = serverTru.filter(i => i.year === year);
        setTruData(mergeDefaultAndServerData(fhdSchemaList2.defaultPaymentTRU, filtered));
    }, [serverTru, year]);

    const showNotificationMessage = (message) => {
        setNotificationMessage(message);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    const handleSave = () => {
        const rows = activeTab === 'list1' ? indexData : truData;
        const manuallyAddedRows = rows.filter(row => row.manually === true && !row.id);

        if (manuallyAddedRows.length > 0) {
            const addAction = activeTab === 'list1' ? addPlanPaymentIndex : addPlanPaymentTru;

            manuallyAddedRows.forEach(row => {
                const rowIndex = rows.findIndex(r => r === row);
                const prevRow = rows[rowIndex - 1];
                dispatch(addAction({
                    ...row,
                    organization: organization.id,
                    year,
                    afterLineCode: prevRow?.lineCode || null
                }));
            });

            setTimeout(() => {
                if (activeTab === 'list1') {
                    dispatch(fetchPlanPaymentIndex({organizationId: organization.id, year}));
                } else {
                    dispatch(fetchPlanPaymentTru({organizationId: organization.id, year}));
                }
            }, 500);

            showNotificationMessage('Новые строки успешно сохранены');
        }
    };

    const handleCellUpdate = (rowId, field, value) => {
        if (!rowId) return;
        const action = activeTab === 'list1' ? updatePlanPaymentIndex : updatePlanPaymentTru;
        dispatch(action({id: rowId, data: {[field]: value === '' ? null : value}}));
    };

    const handleDeleteRow = (rowId) => {
        const deleteAction = activeTab === 'list1' ? deletePlanPaymentIndex : deletePlanPaymentTru;
        if (rowId) {
            dispatch(deleteAction(rowId));
            showNotificationMessage('Строка успешно удалена');
            if (activeTab === 'list1') {
                setIndexData([]);
            } else {
                setTruData([]);
            }
            setTimeout(() => {
                if (activeTab === 'list1') {
                    dispatch(fetchPlanPaymentIndex({organizationId: organization.id, year}));
                } else {
                    dispatch(fetchPlanPaymentTru({organizationId: organization.id, year}));
                }
            }, 500);
        }
    };

    const handleExportXml = async () => {
        if (!organization?.id || !year) return alert('Выберите организацию и год');
        try {
            const token = localStorage.getItem('access');
            const res = await fetch(`/api/export-fhd-xml/?org_id=${organization.id}&year=${year}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            if (!res.ok) throw new Error(await res.text());
            const blob = await res.blob();
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `fhd_${organization.id}_${year}.xml`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(a.href);
        } catch (err) {
            alert(`Ошибка XML: ${err.message}`);
        }
    };

    const handleExportXLSX = async () => {
        if (!organization?.id || !year) return alert('Выберите организацию и год');
        try {
            const token = localStorage.getItem('access');
            const formData = new FormData();
            formData.append('org_id', organization.id);
            formData.append('year', year);
            const response = await fetch('/api/export-fhd-xlsx/', {
                method: 'POST',
                body: formData,
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            if (!response.ok) return alert(await response.text());
            const blob = await response.blob();
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            const cd = response.headers.get('Content-Disposition');
            const filename = cd?.match(/filename="?(.+?)"?$/)?.[1] || `fhd_${organization.id}_${year}.xlsx`;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(a.href);
        } catch (e) {
            alert('Ошибка экспорта XLSX');
            console.error(e);
        }
    };

    const handleImportXLSX = async (e) => {
        const file = e.target.files[0];
        if (!file || !organization?.id || !year) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('org_id', organization.id);
        formData.append('year', year);
        formData.append('default_codes_list1', JSON.stringify(fhdSchemaList1.defaultPaymentIndex.map(r => r.lineCode)));
        formData.append('default_codes_list2', JSON.stringify(fhdSchemaList2.defaultPaymentTRU.map(r => r.lineCode)));

        try {
            const token = localStorage.getItem('access');
            const res = await fetch('/api/import-fhd-xlsx/', {
                method: 'POST',
                body: formData,
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            if (!res.ok) throw new Error(await res.text());
            showNotificationMessage('Файл успешно загружен');

            dispatch(fetchPlanPaymentIndex({organizationId: organization.id, year}));
            dispatch(fetchPlanPaymentTru({organizationId: organization.id, year}));
        } catch (err) {
            alert(`Ошибка загрузки XLSX: ${err.message}`);
        }
    };

    const handleRefreshData = () => {
        if (!organization?.id || !year) return alert('Выберите организацию и год');
        setIndexData([]);
        setTruData([]);
        dispatch(fetchPlanPaymentIndex({organizationId: organization.id, year}));
        dispatch(fetchPlanPaymentTru({organizationId: organization.id, year}));
        showNotificationMessage('Данные обновлены');
    };

    return (
        <div className="planfhd-container">
            {showNotification && <div className="planfhd-notification">{notificationMessage}</div>}

            <div className="fhd-controls planfhd-controls">
                <select value={year} onChange={e => setYear(parseInt(e.target.value, 10))}>
                    {[2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030].map(y => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
                <button onClick={() => setActiveTab('list1')} className={activeTab === 'list1' ? 'active' : ''}>
                    <LuFileSpreadsheet/> Раздел 1
                </button>
                <button onClick={() => setActiveTab('list2')} className={activeTab === 'list2' ? 'active' : ''}>
                    <LuFileSpreadsheet/> Раздел 2
                </button>
                <button onClick={handleSave}><RiSave2Fill/> Сохранить добавленные строки</button>
                <button onClick={handleExportXml}><BsFiletypeXml/> Xml</button>
                <button onClick={handleExportXLSX}><BsFiletypeXlsx/> Xlsx</button>
                <button><label className="custom-upload-button">
                    <FiUpload/> Загрузить XLSX
                    <input type="file" accept=".xlsx" onChange={handleImportXLSX} />
                </label></button>
                <button onClick={handleRefreshData}><MdRefresh/> Обновить</button>
            </div>
            <div className="planfhd-content">
                {activeTab === 'list1' ? (
                    <FhdTable
                        schema={fhdSchemaList1.planPaymentIndex.filter(col => col.field !== 'manually')}
                        data={indexData}
                        onDataChange={setIndexData}
                        onCellUpdate={handleCellUpdate}
                        onDeleteRow={handleDeleteRow}
                    />
                ) : (
                    <FhdTable
                        schema={fhdSchemaList2.planPaymentTRU.filter(col => col.field !== 'manually')}
                        data={truData}
                        onDataChange={setTruData}
                        onCellUpdate={handleCellUpdate}
                        onDeleteRow={handleDeleteRow}
                        className="second-sheet"
                    />
                )}
            </div>
        </div>
    );
};

export default PlanFhdTabs;