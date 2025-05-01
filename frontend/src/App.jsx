import React, { useState, useEffect } from 'react';
import AddOrganizationForm from './AddOrganizationForm';
import EditOrganizationForm from './EditOrganizationForm';
import OrganizationDetails from './OrganizationDetails';
import Modal from './Modal';
import './App.css';

const App = () => {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/organizations/').then(res => res.json()).then(setOrganizations);
  }, []);

  const refreshData = () => {
    fetch('http://localhost:8000/api/organizations/').then(res => res.json()).then(setOrganizations);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <button onClick={() => setShowAddModal(true)}>Добавить организацию</button>
        <ul className="org-list">
          {organizations.map(org => (
            <li
              key={org.id}
              className={selectedOrg?.id === org.id ? 'selected' : ''}
              onClick={() => setSelectedOrg(org)}
            >
              {org.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="main-content">
        {selectedOrg ? (
          <OrganizationDetails
            org={selectedOrg}
            onEdit={() => setShowEditModal(true)}
            onDelete={() => {
              refreshData();
              setSelectedOrg(null);
            }}
          />
        ) : (
          <p>Выберите организацию или добавьте новую</p>
        )}
      </div>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
        <AddOrganizationForm onSuccess={() => {
          refreshData();
          setShowAddModal(false);
        }} />
      </Modal>

      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
        <EditOrganizationForm
          organization={selectedOrg}
          onSuccess={() => {
            refreshData();
            setShowEditModal(false);
          }}
          onCancel={() => setShowEditModal(false)}
        />
      </Modal>
    </div>
  );
};

export default App;
