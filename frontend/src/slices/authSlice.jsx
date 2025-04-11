/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'auth',
  initialState: { username: null, token: null },
  // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
  reducers: {
    setCredentials: (state, { payload }) => {
      state.username = payload.username;
      state.token = payload.token;
    },
    logout: (state) => {
      state.username = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = slice.actions;

export default slice.reducer;
