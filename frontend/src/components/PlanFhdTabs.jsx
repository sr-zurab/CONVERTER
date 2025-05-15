import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fhdSchemaList1 } from '../schemas/tabelFhdSchemaList1';
import { fhdSchemaList2 } from '../schemas/tabelFhdSchemaList2';
import FhdTable from './FhdTable';
import {
  fetchPlanPaymentIndex,
  addPlanPaymentIndex,
  updatePlanPaymentIndex
} from '../store/planPaymentIndexSlice';
import {
  fetchPlanPaymentTru,
  addPlanPaymentTru,
  updatePlanPaymentTru
} from '../store/paymentTruSlice';
import { mergeDefaultAndServerData } from '../utils/mergeFhdData';

const PlanFhdTabs = ({ organization }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('list1');
  const [year, setYear] = useState(new Date().getFullYear());

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
    const merged = mergeDefaultAndServerData(
      fhdSchemaList1.defaultPaymentIndex,
      serverIndex.filter(i => i.year === year)
    );
    setIndexData(merged);
  }, [serverIndex, year]);

  useEffect(() => {
    const merged = mergeDefaultAndServerData(
      fhdSchemaList2.defaultPaymentTRU,
      serverTru.filter(i => i.year === year)
    );
    setTruData(merged);
  }, [serverTru, year]);

  const handleSave = () => {
    const rows = activeTab === 'list1' ? indexData : truData;
    const payload = rows.map(row => ({
      ...row,
      organization: organization.id,
      year,
    }));

    const addAction = activeTab === 'list1' ? addPlanPaymentIndex : addPlanPaymentTru;
    payload.forEach(row => dispatch(addAction(row)));

    setTimeout(() => {
      if (activeTab === 'list1') {
        dispatch(fetchPlanPaymentIndex({ orgId: organization.id, year }));
      } else {
        dispatch(fetchPlanPaymentTru({ organizationId: organization.id, year }));
      }
    }, 500);

    alert('Все строки отправлены на сервер');
  };

  const handleCellUpdate = (rowId, field, value) => {
    const action = activeTab === 'list1' ? updatePlanPaymentIndex : updatePlanPaymentTru;
    const parsedValue = value === '' ? null : value;
    dispatch(action({ id: rowId, data: { [field]: parsedValue } }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <div className="fhd-controls">
        <select value={year} onChange={e => setYear(parseInt(e.target.value, 10))}>
          {[2023, 2024, 2025, 2026].map(y => (
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
          />
        ) : (
          <FhdTable
            schema={fhdSchemaList2.planPaymentTRU.filter(col => col.field !== 'manually')}
            data={truData}
            onDataChange={setTruData}
            onCellUpdate={handleCellUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default PlanFhdTabs;
