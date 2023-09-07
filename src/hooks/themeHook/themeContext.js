import {
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';

const DARK_LOCAL_STORAGE_KEY = 'light';

export const ThemeContext = createContext({
  light: true,
  toggle: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [light, setDark] = useState(true); // dark by default

  const toggleTheme = useCallback(() => {
    setDark((prevDark) => {
      localStorage.setItem(
        DARK_LOCAL_STORAGE_KEY,
        JSON.stringify(!prevDark),
      );

      document.body.classList.toggle('dark', prevDark);
      document.body.classList.toggle('light', !prevDark);

      return !prevDark;
    });
  }, []);

  useEffect(() => {
    const localValue = JSON.parse(
      localStorage.getItem(DARK_LOCAL_STORAGE_KEY),
    );

    if (localValue === null) {
      document.body.classList.add('light');
    } else {
      setDark(localValue);
      document.body.classList.add(localValue ? 'light' : 'dark');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ light, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
