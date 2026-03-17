import { createContext, useContext } from 'react';

const LocaleContext = createContext({ locale: 'hu', setLocale: () => {} });

export function LocaleProvider({ children }) {
  return <LocaleContext.Provider value={{ locale: 'hu', setLocale: () => {} }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}
