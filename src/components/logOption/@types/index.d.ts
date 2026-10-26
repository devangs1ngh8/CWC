import { ImageSourcePropType } from 'react-native';

export interface Props {
  title: string;
  source: ImageSourcePropType;
  selected: boolean;
  selectedCard: string;
  onPress: () => void;
}
