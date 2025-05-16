// utils/mergeFhdData.js
export const mergeDefaultAndServerData = (defaultRows, serverRows) => {
  const result = [...defaultRows];
  
  // Обрабатываем строки с сервера
  serverRows.forEach(serverRow => {
    // Если строка должна быть добавлена после определенной строки
    if (serverRow.afterLineCode) {
      const afterIndex = result.findIndex(r => r.lineCode === serverRow.afterLineCode);
      if (afterIndex !== -1) {
        // Вставляем строку после указанной
        result.splice(afterIndex + 1, 0, serverRow);
        return;
      }
    }
    
    // Если это обычная строка из шаблона
    const defaultIndex = result.findIndex(r => r.lineCode === serverRow.lineCode);
    if (defaultIndex !== -1) {
      result[defaultIndex] = { ...result[defaultIndex], ...serverRow };
    } else {
      // Если это дополнительная строка без привязки, добавляем в конец
      result.push(serverRow);
    }
  });

  return result;
};
