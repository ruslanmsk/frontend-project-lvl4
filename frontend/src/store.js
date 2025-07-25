import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import authReducer from './slices/authSlice'
import channelsReducer from './slices/channelsSlice'
import messageReducer from './slices/messagesSlice'
import { chatApi } from './services/chat'

const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [chatApi.reducerPath]: chatApi.reducer,
    auth: authReducer,
    channels: channelsReducer,
    messages: messageReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(chatApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

export default store
