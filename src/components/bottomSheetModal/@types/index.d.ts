import { ReactNode } from 'react';

export interface Props {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}
