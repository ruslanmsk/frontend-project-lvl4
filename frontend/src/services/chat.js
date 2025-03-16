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
        query: ({username, password}) => ({
          url: 'login',
          method: 'POST',
          body: { username, password },
        }),
      }),
      getChannels: builder.query({
        query: () => 'channels',
      }),
      getMessages: builder.query({
        query: () => 'messages',
      }),
    }),
});

export const { useLoginMutation, useGetChannelsQuery, useGetMessagesQuery } = chatApi;