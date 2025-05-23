export const mergeDefaultAndServerData = (defaultRows, serverRows) => {
  const result = [...defaultRows];

  serverRows.forEach(serverRow => {
    const defaultIndex = result.findIndex(r => r.lineCode === serverRow.lineCode);

    if (serverRow.afterLineCode) {
      const afterIndex = result.findIndex(r => r.lineCode === serverRow.afterLineCode);
      if (afterIndex !== -1) {
        result.splice(afterIndex + 1, 0, serverRow);
        return;
      }
    }

    if (defaultIndex !== -1 && !serverRow.manually) {
      result[defaultIndex] = { ...serverRow };
    } else if (!result.find(r => r.id === serverRow.id)) {
      result.push(serverRow);
    }
  });

  return result;
};
