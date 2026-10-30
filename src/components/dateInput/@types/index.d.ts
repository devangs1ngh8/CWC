export interface Props {
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder: string;
  error?: string;
  inputStyle?: StyleProp<TextStyle>;
}
