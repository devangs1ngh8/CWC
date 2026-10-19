import {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  ViewStyle,
} from 'react-native';

export interface Props {
  width?: number | `${number}%`;
  backgroundColor?: string;
  backgroundImage?: ImageSourcePropType;
  backgroundImageStyle?: StyleProp<ImageStyle>;
  style?: StyleProp<ViewStyle>;
  logo?: ImageSourcePropType;
  logoStyle?: StyleProp<ImageStyle>;
  children?: React.ReactNode;
}
