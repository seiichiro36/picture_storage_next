import  { atom } from "jotai"

const getStoredValue = <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue;
    
    const stored = sessionStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  };
  
  // emailアトム
  export const emailAtom = atom(getStoredValue('email', ''));
  
  // emailの更新時にsessionStorageに保存するラッパーアトム
  export const persistentEmailAtom = atom(
    (get) => get(emailAtom),
    (get, set, newValue: string) => {
      set(emailAtom, newValue);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('email', JSON.stringify(newValue));
      }
    }
  );