import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fhdSchemaList1 } from '../schemas/tabelFhdSchemaList1';
import { fhdSchemaList2 } from '../schemas/tabelFhdSchemaList2';
import FhdTable from './FhdTable';
import {
  fetchPlanPaymentIndex,
  addPlanPaymentIndex,
  updatePlanPaymentIndex,
  deletePlanPaymentIndex
} from '../store/planPaymentIndexSlice';
import {
  fetchPlanPaymentTru,
  addPlanPaymentTru,
  updatePlanPaymentTru,
  deletePlanPaymentTru
} from '../store/paymentTruSlice';
import { mergeDefaultAndServerData } from '../utils/mergeFhdData';

const notificationStyle = {
  position: 'fixed',
  top: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '15px 30px',
  borderRadius: '4px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  zIndex: 1000,
  animation: 'fadeOut 3s forwards',
  fontSize: '16px'
};

const PlanFhdTabs = ({ organization }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('list1');
  const [year, setYear] = useState(new Date().getFullYear());
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const serverIndex = useSelector(state => state.planPaymentIndex.items);
  const serverTru = useSelector(state => state.paymentTru.list);

  const [indexData, setIndexData] = useState([]);
  const [truData, setTruData] = useState([]);

  useEffect(() => {
    if (organization?.id && year) {
      dispatch(fetchPlanPaymentIndex({ orgId: organization.id, year }));
      dispatch(fetchPlanPaymentTru({ organizationId: organization.id, year }));
    }
  }, [organization, year, dispatch]);

  useEffect(() => {
    if (serverIndex.length) {
      const merged = mergeDefaultAndServerData(
        fhdSchemaList1.defaultPaymentIndex,
        serverIndex.filter(i => i.year === year)
      );
      setIndexData(merged);
    }
  }, [serverIndex, year]);

  useEffect(() => {
    if (serverTru.length) {
      const merged = mergeDefaultAndServerData(
        fhdSchemaList2.defaultPaymentTRU,
        serverTru.filter(i => i.year === year)
      );
      setTruData(merged);
    }
  }, [serverTru, year]);

  const showNotificationMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
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
          dispatch(fetchPlanPaymentIndex({ orgId: organization.id, year }));
        } else {
          dispatch(fetchPlanPaymentTru({ organizationId: organization.id, year }));
        }
      }, 500);

      showNotificationMessage('Новые строки успешно сохранены');
    }
  };

  const handleCellUpdate = (rowId, field, value) => {
    if (!rowId) return;
    const action = activeTab === 'list1' ? updatePlanPaymentIndex : updatePlanPaymentTru;
    const parsedValue = value === '' ? null : value;
    dispatch(action({ id: rowId, data: { [field]: parsedValue } }));
  };

  const handleDeleteRow = (rowId) => {
    const deleteAction = activeTab === 'list1' ? deletePlanPaymentIndex : deletePlanPaymentTru;
    if (rowId) {
      dispatch(deleteAction(rowId));
      showNotificationMessage('Строка успешно удалена');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      {showNotification && (
        <div style={notificationStyle}>
          {notificationMessage}
        </div>
      )}
      <div className="fhd-controls">
        <select value={year} onChange={e => setYear(parseInt(e.target.value, 10))}>
          {[2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030].map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <button
          onClick={() => setActiveTab('list1')}
          className={activeTab === 'list1' ? 'active' : ''}
        >
          Лист 1
        </button>
        <button
          onClick={() => setActiveTab('list2')}
          className={activeTab === 'list2' ? 'active' : ''}
        >
          Лист 2
        </button>
        <button onClick={handleSave}>Сохранить</button>
      </div>

      <div style={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
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
