// utils/mergeFhdData.js
export const mergeDefaultAndServerData = (defaultRows, serverRows) => {
  const result = defaultRows.map(def => {
    const match = serverRows.find(s => s.lineCode === def.lineCode);
    return match ? { ...def, ...match } : { ...def };
  });

  // добавляем оставшиеся строки, которых нет в шаблоне
  const unmatched = serverRows.filter(
    s => !defaultRows.some(def => def.lineCode === s.lineCode)
  );

  return [...result, ...unmatched];
};
