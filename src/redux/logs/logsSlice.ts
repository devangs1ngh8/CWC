import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LogsState = {
  logsByDate: Record<string, any>;
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
