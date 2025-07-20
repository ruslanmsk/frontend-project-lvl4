import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { removeChannel } from './channelsSlice'

const messagesAdapter = createEntityAdapter()

// По умолчанию: { ids: [], entities: {} }
const initialState = messagesAdapter.getInitialState()

const slice = createSlice({
  name: 'messages',
  initialState,
  // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, action) => {
      const channelId = action.payload
      messagesAdapter.removeMany(
        state,
        Object.values(state.entities)
          .filter(msg => msg.channelId === channelId)
          .map(msg => msg.id),
      )
    })
  },
})

export const { addMessages, addMessage } = slice.actions

export const selectors = messagesAdapter.getSelectors(state => state.messages)

export default slice.reducer
