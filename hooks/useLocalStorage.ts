import React, { useState, useEffect } from 'react';

function useLocalStorage<T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const parseStoredValue = (raw: string | null): T => {
        if (raw === null) return initialValue;
        try {
            return JSON.parse(raw) as T;
        } catch {
            // Corrupted storage should not crash the app.
            return initialValue;
        }
    };

    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return parseStoredValue(item);
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            const valueToStore = storedValue;
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    }, [key, storedValue]);

    useEffect(() => {
        const handleStorageUpdate = (event: StorageEvent) => {
            if (event.key !== key) return;
            setStoredValue(parseStoredValue(event.newValue));
        };

        window.addEventListener('storage', handleStorageUpdate);
        return () => window.removeEventListener('storage', handleStorageUpdate);
    }, [key]);

    return [storedValue, setStoredValue];
}

export default useLocalStorage;
