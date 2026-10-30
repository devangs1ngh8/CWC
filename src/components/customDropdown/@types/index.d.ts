export interface Props {
  title: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}
