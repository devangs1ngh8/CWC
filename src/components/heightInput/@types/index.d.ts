import { ViewStyle } from 'react-native';

export interface Props {
  feet: string;
  inches: string;
  onFeetChange: (value: string) => void;
  onInchesChange: (value: string) => void;
  feetPlaceholder: string;
  inchesPlaceholder: string;
  placeholderColor: string;
  inputStyle?: StyleProp<ViewStyle>;
}
