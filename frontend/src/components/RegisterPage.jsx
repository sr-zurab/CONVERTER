// Страница регистрации пользователя
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const RegisterPage = () => {
    // Состояния для полей формы
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Обработчик отправки формы регистрации
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const res = await fetch('/api/auth/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });
            if (!res.ok) {
                const data = await res.json();
                // Собираем все сообщения из объекта ошибок
                let errorMsg = data.detail;
                if (!errorMsg && typeof data === 'object') {
                    errorMsg = Object.values(data).flat().join(' ');
                }
                setError(errorMsg || 'Ошибка регистрации');
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

    // Разметка страницы регистрации
    return (
        <div className="auth-page">
            <h2>Регистрация</h2>
            {/* Форма регистрации */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Зарегистрироваться</button>
            </form>
            {/* Вывод ошибки, если есть */}
            {error && <div className="error">{error}</div>}
            <div style={{marginTop: 10}}>
                Уже есть аккаунт? <a href="/login">Войти</a>
            </div>
        </div>
    );
};

export default RegisterPage; 