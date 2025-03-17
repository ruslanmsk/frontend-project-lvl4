import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();

// По умолчанию: { ids: [], entities: {} }
const initialState = messagesAdapter.getInitialState();

const slice = createSlice({
  name: 'messages',
  initialState,
  // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
});

export const { addMessages, addMessage } = slice.actions;

export const selectors = messagesAdapter.getSelectors((state) => state.messages);

export default slice.reducer;