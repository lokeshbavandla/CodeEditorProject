import { useEffect, useState } from "react";

function useLocalStorage(key,intialvalue){

    const PREFIX = 'CodePlayground';

    const prefixedKey = PREFIX + key;

    const [value,setValue] = useState(()=>{
        const storedValue = localStorage.getItem(prefixedKey);

        if(storedValue != null) return JSON.parse(storedValue);

        if(typeof intialvalue == 'function'){
            return intialvalue();
        } else {
            return intialvalue;
        }
    });

    useEffect(()=>{
        localStorage.setItem(prefixedKey,JSON.stringify(value));
    }, [prefixedKey,value])

    return [value,setValue]
}

export default useLocalStorage;