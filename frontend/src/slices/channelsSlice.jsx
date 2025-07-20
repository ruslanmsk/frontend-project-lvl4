import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

const channelsAdapter = createEntityAdapter()

// По умолчанию: { ids: [], entities: {} }
const initialState = channelsAdapter.getInitialState()

const slice = createSlice({
  name: 'channels',
  initialState,
  // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    editChannel: channelsAdapter.updateOne,
    removeChannel: channelsAdapter.removeOne,
  },
})

export const {
  addChannels, addChannel, editChannel, removeChannel,
} = slice.actions

export const selectors = channelsAdapter.getSelectors(state => state.channels)

export default slice.reducer
