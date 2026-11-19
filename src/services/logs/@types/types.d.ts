export interface LogOption {
  optionNameKey: string;
  isSelected?: boolean;
}

export interface LogEntry {
  category: number;
  categoryNameKey: string;
  selectedOption?: LogOption | LogOption[];
}

export interface BasalBodyTemperature {
  category: number;
  categoryNameKey: string;
  unit: number;
  value: number;
}

export interface UrinaryHormoneOption {
  optionNameKey: string;
  value: number;
  unit: string;
}

export interface UrinaryHormones {
  category: number;
  categoryNameKey: string;
  selectedOption: UrinaryHormoneOption[];
}

export interface LogNotes {
  category: number;
  categoryNameKey: string;
  note: string;
}

export interface SaveLogRequest {
  logType: 1 | 2 | 3 | 4;
  logDate: string;
  logEntry?: LogEntry;
  basalBodyTemperature?: BasalBodyTemperature;
  urinaryHormones?: UrinaryHormones;
  notes?: LogNotes;
}

export interface LogCategoryOption {
  optionNameKey: string;
  order: number;
  status: number;
  optionName: string;
}

export interface LogCategory {
  category: number;
  categoryNameKey: string;
  order: number;
  status: number;
  options?: LogCategoryOption[];
  medications?: unknown[];
  categoryName: string;
}

export interface LogsData {
  logDate: string;
  logs: LogCategory[];
  isEditable: boolean;
}

export interface LogsResponse {
  status: number;
  message: string;
  data: LogsData;
  timestamp: string;
}
