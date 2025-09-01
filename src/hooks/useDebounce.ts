import {useState, useRef, useCallback} from 'react';

export const useDebounce = <T>(value: T, delay: number) => {
    const [debouncedValue, _setDebouncedValue] = useState(value);
    const timeoutHandlerRef = useRef<NodeJS.Timeout>(undefined);

    const setDebouncedValue=useCallback( (value:T)=>{
        clearTimeout(timeoutHandlerRef.current)
        timeoutHandlerRef.current = setTimeout(() => {
            _setDebouncedValue(value);
        }, delay);
    },[delay])

    return [debouncedValue, setDebouncedValue] as const;
}