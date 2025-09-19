// Главный компонент приложения
// Управляет структурой приложения и основной навигацией
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import {
    fetchOrganizations,
    selectOrganization,
    selectReport
} from './store/organizationSlice.js';
import AddOrganizationForm from './components/AddOrganizationForm';
import EditOrganizationForm from './components/EditOrganizationForm';
import OrganizationDetails from './components/OrganizationDetails';
import PlanFhdTabs from './components/PlanFhdTabs';
import Modal from './components/Modal';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import './App.css';
import {IoIosAddCircleOutline} from "react-icons/io";
import {FiLogOut} from "react-icons/fi";
import StateTaskControls from "./components/componentsStateTask/StateTaskTableControls.jsx";
// Основной компонент приложения (левая панель, контент, модальные окна)
const MainApp = () => {
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

    // --- Авторизация ---
    const [isAuth, setIsAuth] = useState(!!localStorage.getItem('access'));
    const navigate = useNavigate();

    // Загрузка организаций при входе
    useEffect(() => {
        if (isAuth) {
            dispatch(fetchOrganizations());
        }
    }, [dispatch, isAuth]);

    // Обработчик выхода пользователя
    const handleLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setIsAuth(false);
        navigate('/login');
    };

    // Обработчик изменения размера сайдбара мышью
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

    // Обработчик клика по организации (выбор/сворачивание)
    const handleOrgClick = (org) => {
        if (!selectedOrg || selectedOrg.id !== org.id) {
            dispatch(selectOrganization(org));
            // Не трогаем collapsedOrgs при первом выборе
        } else {
            // При повторном клике по выбранной организации — показываем детали
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
        }
    };

    // Основная разметка приложения
    return (
        <>
            {/* Кнопка выхода */}
            <div className="logout-bar">
                <button className="logout-button" onClick={handleLogout} title="Выйти">
                    <FiLogOut style={{marginRight: 6, fontSize: 18}}/> Выйти
                </button>
            </div>
            <div className="app-container">
                {/* Боковая панель с организациями */}
                <div className="sidebar" style={{width: sidebarWidth}}>
                    <button className="my-button" onClick={() => setShowAddModal(true)}>
                        <IoIosAddCircleOutline className="my-icons"/>
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
                                        <>
                                            <div className="report-item" onClick={() => dispatch(selectReport('planFhd'))}>
                                                📄 План ФХД
                                            </div>
                                            <div className="report-item" onClick={() => dispatch(selectReport('stateTask'))}>
                                                🧩 Госзадание
                                            </div>
                                        </>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Разделитель для изменения ширины сайдбара */}
                <div className="separator" onMouseDown={() => setIsResizing(true)}/>

                {/* Основной контент */}
                <div className="main-content">
                    {selectedOrg ? (
                        selectedReport === 'planFhd' ? (
                            <PlanFhdTabs organization={selectedOrg}/>
                        ) : selectedReport === 'stateTask' ? (
                            <StateTaskControls organization={selectedOrg}/>
                        ) : (
                            <OrganizationDetails org={selectedOrg} onEdit={() => setShowEditModal(true)}/>
                        )
                    ) : (
                        <p>Выберите организацию или добавьте новую</p>
                    )}
                </div>

                {/* Модальное окно добавления организации */}
                <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
                    <AddOrganizationForm onClose={() => setShowAddModal(false)}/>
                </Modal>

                {/* Модальное окно редактирования организации */}
                <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
                    {selectedOrg && (
                        <EditOrganizationForm
                            organization={selectedOrg}
                            onClose={() => setShowEditModal(false)}
                        />
                    )}
                </Modal>
            </div>
        </>
    );
};

// Защищённый маршрут (только для авторизованных пользователей)
function PrivateRoute({children}) {
    const isAuth = !!localStorage.getItem('access');
    return isAuth ? children : <Navigate to="/login" />;
}

// Основной роутинг приложения
const App = () => (
    <Router>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/*" element={
                <PrivateRoute>
                    <MainApp />
                </PrivateRoute>
            } />
        </Routes>
    </Router>
);

export default App;
