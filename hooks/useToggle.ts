import { useCallback, useState } from "react";

const useToggle = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback((value: boolean) => {
    const newValue = value === undefined ? (prev: boolean) => !prev : value;
    setValue(newValue);
  }, []);

  return [value, toggle] as const;
};

export default useToggle;
