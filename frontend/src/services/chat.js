import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({ 
      baseUrl: '/api/v1/',
      prepareHeaders: (headers, { getState }) => {
        // By default, if we have a token in the store, let's use that for authenticated requests
        const token = getState().auth.token;
        if (token) {
          headers.set('Authorization', `Bearer ${token}`)
        }
        return headers;
      },
    }),
    endpoints: (builder) => ({
      login: builder.mutation({
        query: (body) => ({
          url: 'login',
          method: 'POST',
          body,
        }),
      }),
      signup: builder.mutation({
        query: (body) => ({
          url: 'signup',
          method: 'POST',
          body,
        }),
      }),
      getChannels: builder.query({
        query: () => 'channels',
      }),
      addChannel: builder.mutation({
        query: (body) => ({
          url: 'channels',
          method: 'POST',
          body,
        }),
      }),
      editChannel: builder.mutation({
        query: ({name, id}) => ({
          url: `channels/${id}`,
          method: 'PATCH',
          body: {name},
        }),
      }),
      removeChannel: builder.mutation({
        query: ({id}) => ({
          url: `channels/${id}`,
          method: 'DELETE',
        }),
      }),
      getMessages: builder.query({
        query: () => 'messages',
      }),
      addMessage: builder.mutation({
        query: (body) => ({
          url: 'messages',
          method: 'POST',
          body,
        }),
      }),
      // removeMessage: builder.mutation({
      //   query: ({id}) => ({
      //     url: `messages/${id}`,
      //     method: 'DELETE',
      //   }),
      // }),
    }),
});

export const { 
  useLoginMutation,
  useGetChannelsQuery,
  useGetMessagesQuery,
  useAddMessageMutation,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
  useSignupMutation,
  // useRemoveMessageMutation,
} = chatApi;