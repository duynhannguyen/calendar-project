import { useState } from "react";
import { Event } from "../context/Event";

const useLocalStorage = (key: string, initialValue: Event[]) => {
  const [value, setValue] = useState<Event[]>(() => {
    const jsonValue = "";
  });
};

export default useLocalStorage;
