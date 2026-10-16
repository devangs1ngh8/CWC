import React, { createContext, useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

const BASE_DESIGN_HEIGHT = 932;
const BASE_DESIGN_WIDTH = 430;

interface DimensionContextType {
  width: number;
  height: number;
  isLandscape: boolean;
  isPortrait: boolean;
}

type DimensionSnapshot = {
  width: number;
  height: number;
  isLandscape: boolean;
  isPortrait: boolean;
};

let latestDimensions: DimensionSnapshot = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  isLandscape: Dimensions.get('window').width > Dimensions.get('window').height,
  isPortrait: Dimensions.get('window').width <= Dimensions.get('window').height
};

export const DimensionContext = createContext<DimensionContextType>({
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  isLandscape: Dimensions.get('window').width > Dimensions.get('window').height,
  isPortrait: Dimensions.get('window').width <= Dimensions.get('window').height
});

export const DimensionProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [dimensions, setDimensions] = useState(() => {
    const { width, height } = Dimensions.get('window');
    return {
      width,
      height,
      isLandscape: width > height,
      isPortrait: width <= height
    };
  });

  useEffect(() => {
    latestDimensions = dimensions;
  }, [dimensions]);

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({ window }: { window: ScaledSize; screen: ScaledSize }) => {
        const nextDimensions = {
          width: window.width,
          height: window.height,
          isLandscape: window.width > window.height,
          isPortrait: window.width <= window.height
        };
        latestDimensions = nextDimensions;
        setDimensions(nextDimensions);
      }
    );

    return () => subscription?.remove();
  }, []);

  return (
    <DimensionContext.Provider value={dimensions}>
      {children}
    </DimensionContext.Provider>
  );
};

export const useDimensions = () => {
  const context = React.useContext(DimensionContext);
  if (!context) {
    throw new Error('useDimensions must be used within DimensionProvider');
  }
  return context;
};

export const getDesignWidth = () =>
  latestDimensions.isLandscape ? BASE_DESIGN_HEIGHT : BASE_DESIGN_WIDTH;

export const getDesignHeight = () =>
  latestDimensions.isLandscape ? BASE_DESIGN_WIDTH : BASE_DESIGN_HEIGHT;
