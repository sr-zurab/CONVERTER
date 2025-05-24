import React, { useState, useEffect } from 'react';

const DecimalTextarea = ({ value, onChange, onKeyDown, dataCell }) => {
  const [localValue, setLocalValue] = useState(value ?? '');

  useEffect(() => {
    if (value !== localValue) {
      setLocalValue(value ?? '');
    }
  }, [value]);

  const handleChange = (e) => {
    let input = e.target.value;

    // Заменить русскую "ю" на точку
    input = input.replace(/ю/g, '.');

    // Только допустимые символы: цифры, точка, до 2 знаков после точки
    const regex = /^-?\d*\.?\d{0,2}$/;

    if (input === '' || regex.test(input)) {
      setLocalValue(input);
    }
  };

  const handleBlur = () => {
    if (localValue === '') {
      onChange(null);
      return;
    }

    const parsed = parseFloat(localValue);
    if (!isNaN(parsed)) {
      const formatted = parsed.toFixed(2);
      setLocalValue(formatted);
      onChange(formatted);
    } else if (/^\d+\.$/.test(localValue)) {
      const formatted = parseFloat(localValue).toFixed(2);
      setLocalValue(formatted);
      onChange(formatted);
    } else {
      setLocalValue('');
      onChange(null);
    }
  };

  return (
    <textarea
      data-cell={dataCell}
      value={localValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={onKeyDown}
      rows={1}
    />
  );
};

export default DecimalTextarea;
