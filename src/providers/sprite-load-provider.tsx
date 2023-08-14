// SpriteLoadContext.tsx
import React, { createContext, useContext, useState } from "react";

interface SpriteLoadContextType {
  spritesLoaded: boolean;
  setSpritesLoaded: (loaded: boolean) => void;
}

const SpriteLoadContext = createContext<SpriteLoadContextType | undefined>(undefined);

export const SpriteLoadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [spritesLoaded, setSpritesLoaded] = useState(false);
  return (
    <SpriteLoadContext.Provider value={{ spritesLoaded, setSpritesLoaded }}>
      {children}
    </SpriteLoadContext.Provider>
  );
};

export const useSpriteLoad = () => {
  const context = useContext(SpriteLoadContext);
  if (!context) {
    throw new Error("useSpriteLoad must be used within a SpriteLoadProvider");
  }
  return context;
};
