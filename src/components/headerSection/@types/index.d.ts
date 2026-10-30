import {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  ViewStyle,
} from 'react-native';

export interface Props {
  backgroundImage?: ImageSourcePropType;
  backgroundImageStyle?: StyleProp<ImageStyle>;
  style?: StyleProp<ViewStyle>;
  logo?: ImageSourcePropType;
  logoStyle?: StyleProp<ImageStyle>;
  showBackButton?: boolean;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
}
