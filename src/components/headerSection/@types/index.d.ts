import {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  ViewStyle,
} from 'react-native';

export interface Props {
  width?: number | `${number}%`;
  backgroundImage?: ImageSourcePropType;
  backgroundImageStyle?: StyleProp<ImageStyle>;
  style?: StyleProp<ViewStyle>;
  logo?: ImageSourcePropType;
  logoStyle?: StyleProp<ImageStyle>;
  children?: React.ReactNode;
  showBackButton?: boolean;
}
