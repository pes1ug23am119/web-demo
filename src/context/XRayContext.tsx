import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface XRayContextValue {
  xray: boolean;
  toggle: () => void;
  setXray: (value: boolean) => void;
}

const XRayContext = createContext<XRayContextValue | undefined>(undefined);

export function XRayProvider({ children }: { children: ReactNode }) {
  const [xray, setXray] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (xray) {
      root.classList.add('xray');
    } else {
      root.classList.remove('xray');
    }
  }, [xray]);

  const toggle = () => setXray((prev) => !prev);

  return (
    <XRayContext.Provider value={{ xray, toggle, setXray }}>
      {children}
    </XRayContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useXRay() {
  const ctx = useContext(XRayContext);
  if (!ctx) throw new Error('useXRay must be used within XRayProvider');
  return ctx;
}
