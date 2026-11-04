import { type ReactNode } from 'react';
import { TextStyle, ViewStyle } from 'react-native';

export interface Props {
  titlePrimary?: string;
  titleSecondary?: string;
  description?: string;
  children?: React.ReactNode;
  bottomContent?: React.ReactNode;
  headingSecondaryStyle?: TextStyle;
  headingPrimaryStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  root?: ViewStyle;
  topContent?: React.ReactNode;
  showDragHandle?: boolean;
  titleContentStyle?: object;
}
