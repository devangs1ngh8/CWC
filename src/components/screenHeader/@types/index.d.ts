import { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';

export interface Props {
  title: string;
  backgroundImage: ImageSourcePropType;
  onBackPress?: () => void;
  style?: StyleProp<ViewStyle>;
}
