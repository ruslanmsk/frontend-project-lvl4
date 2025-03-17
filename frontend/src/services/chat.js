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
      getChannels: builder.query({
        query: () => 'channels',
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
    }),
});

export const { useLoginMutation, useGetChannelsQuery, useGetMessagesQuery, useAddMessageMutation } = chatApi;