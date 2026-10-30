export interface Props {
  title: string;
  time: string;
  frequency: string;
  enabled: boolean;
  isDefault?: boolean;
  weekdays?: number[];
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}
