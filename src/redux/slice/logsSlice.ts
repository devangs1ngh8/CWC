import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LogsResponse } from '../../services/logs/@types/types';

type LogsState = {
  logsByDate: Record<string, LogsResponse>;
};

type SetLogsPayload = {
  userId: string;
  date: string;
  data: LogsResponse;
};

const initialState: LogsState = {
  logsByDate: {},
};

const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    setLogsForDate: (state, action: PayloadAction<SetLogsPayload>) => {
      const { userId, date, data } = action.payload;

      const cacheKey = `${userId}_${date}`;

      state.logsByDate[cacheKey] = data;
    },
  },
});

export const { setLogsForDate } = logsSlice.actions;

export default logsSlice.reducer;
