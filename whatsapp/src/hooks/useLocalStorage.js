import { useEffect, useState } from 'react'

const PREFIX = 'whatsapp-';
export default function useLocalStorage(key, initialValue) {
    console.log('hook rerender', key, initialValue)
    const prefixedKey = PREFIX + key;
    const [value, setValue] = useState(() => {
        const JSONValue = localStorage.getItem(prefixedKey);
        if (JSONValue != null) {
            return JSON.parse(JSONValue);
        }
        if (typeof initialValue === 'function') {
            return initialValue();
        } else {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value));
    }, [prefixedKey, value]);


    return [value, setValue];
}
