export interface Props {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}
