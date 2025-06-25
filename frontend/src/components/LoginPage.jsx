// Страница входа пользователя
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const LoginPage = () => {
    // Состояния для полей формы
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Обработчик отправки формы входа
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const res = await fetch('/api/auth/token/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            if (!res.ok) {
                const data = await res.json();
                // Собираем все сообщения из объекта ошибок
                let errorMsg = data.detail;
                if (!errorMsg && typeof data === 'object') {
                    errorMsg = Object.values(data).flat().join(' ');
                }
                setError(errorMsg || 'Ошибка авторизации');
                return;
            }
            const data = await res.json();
            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refresh);
            navigate('/');
        } catch (e) {
            setError('Ошибка сети');
        }
    };

    // Разметка страницы входа
    return (
        <div className="auth-page">
            <h2>Вход</h2>
            {/* Форма входа */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Войти</button>
            </form>
            {/* Вывод ошибки, если есть */}
            {error && <div className="error">{error}</div>}
            <div style={{marginTop: 10}}>
                Нет аккаунта? <a href="/register">Зарегистрироваться</a>
            </div>
        </div>
    );
};

export default LoginPage; 