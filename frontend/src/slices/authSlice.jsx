import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'auth',
  initialState: {username: null, token: null},
  // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
  reducers: {
    login: (state, payload) => {
      state.username = payload.username;
      state.token = payload.token;
    },
    logout: () => {
      state.username = null;
      state.token = null;
    },
  },
});

export const { login, logout } = slice.actions;

export default slice.reducer;