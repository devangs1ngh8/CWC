import { Dimensions, PixelRatio, Platform } from "react-native";
import { getDesignHeight, getDesignWidth } from '../context/DimensionContext';

const IPHONE_6_SCREEN_WIDTH = 402;

/** First-load window width; prefer `windowMetrics.width` or `getScreenWidth()` after rotation. */
export const SCREEN_WIDTH = Dimensions.get("window").width;
/** First-load window height; prefer `windowMetrics.height` or `getScreenHeight()` after rotation. */
export const SCREEN_HEIGHT = Dimensions.get("window").height;
export const SCREEN_HEIGHT_SCREEN = Dimensions.get("screen").height;
export const DESIGN_HEIGHT = getDesignHeight();
export const DESIGN_WIDTH = getDesignWidth();
export const SMALL_DEVICE = SCREEN_WIDTH < IPHONE_6_SCREEN_WIDTH;
export const MEDIUM_DEVICE = SCREEN_WIDTH <= IPHONE_6_SCREEN_WIDTH;
export const LARGE_DEVICE = SCREEN_WIDTH > IPHONE_6_SCREEN_WIDTH;
export const hundred = 100;
export const isIOS = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";
export const platformVersion = Platform.Version;

export function getScreenWidth(): number {
  return Dimensions.get("window").width;
}

export function getScreenHeight(): number {
  return Dimensions.get("window").height;
}

export function normalize(size: number) {
  const scale = Dimensions.get("window").width / getDesignWidth();
  return PixelRatio.roundToNearestPixel(size * scale);
}

export const vw = (width: number) => {
  const W = Dimensions.get("window").width;
  let percent = (width / getDesignWidth()) * hundred;
  const elemWidth = parseFloat(`${percent}`);
  return PixelRatio.roundToNearestPixel((W * elemWidth) / hundred);
};

export const vh = (height: number) => {
  const H = Dimensions.get("window").height;
  let percent = (height / getDesignHeight()) * hundred;
  const elemHeight = parseFloat(`${percent}`);
  return PixelRatio.roundToNearestPixel((H * elemHeight) / hundred);
};

export default {
  vh,
  vw,
  normalize,
  get DESIGN_HEIGHT() {
    return getDesignHeight();
  },
  get DESIGN_WIDTH() {
    return getDesignWidth();
  },
};
