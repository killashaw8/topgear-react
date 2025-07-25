
export interface RadioOption {
  label: string;
  value: string;
}

export interface RadioProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
}