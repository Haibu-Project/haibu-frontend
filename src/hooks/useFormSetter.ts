import { useState } from "react";

type FormState<T> = {
  [K in keyof T]: T[K];
};

const useFormSetter = <T extends Record<string, unknown>>(initialState: T) => {
    const [formState, setFormState] = useState<FormState<T>>(initialState);
  
    const createFormSetter = <K extends keyof T>(fieldName: K) => {
        const setter = (fieldValue: T[K]) => {
            setFormState((prevState) => ({
                ...prevState,
                [fieldName]: fieldValue,
            }));
        };
  
        return setter;
    };
  
    return [formState, createFormSetter] as const; 
};

export default useFormSetter;