import React, { useState, useEffect } from 'react';

const DecimalTextarea = ({ value, onChange, onKeyDown, dataCell }) => {
    const [localValue, setLocalValue] = useState(value ?? '');
    const [allowSpace, setAllowSpace] = useState(false);

    useEffect(() => {
        setLocalValue(value ?? '');

        // Если value пришло с пробелом — включаем allowSpace
        if (typeof value === 'string' && value.includes(' ')) {
            setAllowSpace(true);
        }

        // Если это одна из первых 4 колонок — тоже разрешаем пробел
        const colIndex = parseInt(dataCell?.split('-')[1], 10);
        if (!isNaN(colIndex) && colIndex < 4) {
            setAllowSpace(true);
        }

    }, [value, dataCell]);

    const handleChange = (e) => {
        let input = e.target.value;

        // Разрешаем ввод пробела, если хотя бы один раз его ввели или колонка < 4
        if (input.includes(' ')) {
            setAllowSpace(true);
        }

        // Заменяем только ю и , на точку
        input = input.replace(/ю|,/g, '.');

        if (!allowSpace) {
            input = input.replace(/\s/g, '');
        }

        setLocalValue(input);
    };

    const handleBlur = () => {
        const cleaned = localValue;

        if (cleaned.trim() === '') {
            onChange(null);
            return;
        }

        const parsed = parseFloat(cleaned);
        if (!isNaN(parsed)) {
            const formatted = parsed.toFixed(2);
            setLocalValue(formatted);
            onChange(formatted);
        } else {
            // если не число — сохранить как есть (например, текст с пробелом)
            setLocalValue(cleaned);
            onChange(cleaned);
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