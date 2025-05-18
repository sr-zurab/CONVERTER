// Главная точка входа в приложение
// Инициализирует React приложение и подключает Redux store
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store";

// Получение корневого элемента для рендеринга
const container = document.getElementById("root");
const root = createRoot(container);

// Рендеринг приложения с поддержкой Redux и строгим режимом React
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

