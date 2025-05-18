// Главный компонент приложения
// Управляет структурой приложения и основной навигацией
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

// Основной компонент приложения
const App = () => {
  const dispatch = useDispatch();
  // Получение данных из Redux store
  const organizations = useSelector(state => state.organizations.list);
  const selectedOrg = useSelector(state => state.organizations.selected);
  const selectedReport = useSelector(state => state.organizations.selectedReport);

  // Состояния для управления модальными окнами и шириной сайдбара
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [isResizing, setIsResizing] = useState(false);
  const [collapsedOrgs, setCollapsedOrgs] = useState(new Set());

  // Загрузка списка организаций при монтировании компонента
  useEffect(() => {
    dispatch(fetchOrganizations());
  }, [dispatch]);

  // Обработчик изменения размера сайдбара
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

  const handleOrgClick = (org) => {
    dispatch(selectOrganization(org));
    setCollapsedOrgs(prev => {
      const newCollapsed = new Set(prev);
      if (newCollapsed.has(org.id)) {
        newCollapsed.delete(org.id);
      } else {
        newCollapsed.add(org.id);
      }
      return newCollapsed;
    });
  };

  return (
    <div className="app-container">
      <div className="sidebar" style={{ width: sidebarWidth }}>
        <button className="my-button" onClick={() => setShowAddModal(true)}>
          <IoIosAddCircleOutline className="my-icons" />
        </button>
        <ul className="org-list">
          {organizations.map(org => (
            <li 
              key={org.id} 
              className={`${selectedOrg?.id === org.id ? 'selected' : ''} ${collapsedOrgs.has(org.id) ? 'collapsed' : ''}`}
            >
              <div
                className="org-header"
                onClick={() => handleOrgClick(org)}
              >
                {org.name}
              </div>
              <div className="org-content">
                {selectedOrg?.id === org.id && (
                  <div className="report-item" onClick={() => dispatch(selectReport('planFhd'))}>
                    📄 План ФХД
                  </div>
                )}
              </div>
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
