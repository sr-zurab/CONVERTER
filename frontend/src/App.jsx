import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOrganizations,
  selectOrganization,
  selectReport
} from './store/organizationSlice';
import AddOrganizationForm from './components/AddOrganizationForm';
import EditOrganizationForm from './components/EditOrganizationForm';
import OrganizationDetails from './components/OrganizationDetails';
import PlanFhdTabs from './components/PlanFhdTabs';
import Modal from './components/Modal';
import './App.css';
import { IoIosAddCircleOutline } from "react-icons/io";

const App = () => {
  const dispatch = useDispatch();
  const organizations = useSelector(state => state.organizations.list);
  const selectedOrg = useSelector(state => state.organizations.selected);
  const selectedReport = useSelector(state => state.organizations.selectedReport);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    dispatch(fetchOrganizations());
  }, [dispatch]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizing) {
        setSidebarWidth(Math.max(150, Math.min(e.clientX, 600)));
      }
    };
    const handleMouseUp = () => setIsResizing(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div className="app-container">
      <div className="sidebar" style={{ width: sidebarWidth }}>
        <button className="my-button" onClick={() => setShowAddModal(true)}>
          <IoIosAddCircleOutline className="my-icons" />
        </button>
        <ul className="org-list">
          {organizations.map(org => (
            <li key={org.id}>
              <div
                className={`org-item ${selectedOrg?.id === org.id ? 'selected' : ''}`}
                onClick={() => dispatch(selectOrganization(org))}
              >
                {org.name}
              </div>
              {selectedOrg?.id === org.id && (
                <ul className="report-submenu">
                  <li onClick={() => dispatch(selectReport('planFhd'))}>📄 План ФХД</li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="separator" onMouseDown={() => setIsResizing(true)} />

      <div className="main-content">
        {selectedOrg ? (
          selectedReport === 'planFhd' ? (
            <PlanFhdTabs organization={selectedOrg} />
          ) : (
            <OrganizationDetails org={selectedOrg} onEdit={() => setShowEditModal(true)} />
          )
        ) : (
          <p>Выберите организацию или добавьте новую</p>
        )}
      </div>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
        <AddOrganizationForm onClose={() => setShowAddModal(false)} />
      </Modal>

      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
        {selectedOrg && (
          <EditOrganizationForm
            organization={selectedOrg}
            onClose={() => setShowEditModal(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default App;
