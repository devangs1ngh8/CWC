import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LogsResponse } from '../../services/logs/@types/types';

type LogsState = {
  logsByDate: Record<string, LogsResponse>;
};

type SetLogsPayload = {
  date: string;
  data: any;
};

const initialState: LogsState = {
  logsByDate: {},
};

const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    setLogsForDate: (state, action: PayloadAction<SetLogsPayload>) => {
      const { date, data } = action.payload;

      state.logsByDate[date] = data;
    },
  },
});

export const { setLogsForDate } = logsSlice.actions;

export default logsSlice.reducer;
