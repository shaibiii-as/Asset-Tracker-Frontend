import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { assetsApi } from './assets'
import { getAuth } from '../auth'

const API_URL = process.env.REACT_APP_API_URL

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/category/`,
    prepareHeaders: (headers) => {
      // Add the bearer token to the headers
      const auth = getAuth()
      if (auth && auth?.token) {
        headers.set('Authorization', `Bearer ${auth?.token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Categories'],
  endpoints: (build) => ({
    getAllCategories: build.query<any, any>({
      query: ({ page = 0, limit = 0 }) =>
        `list/?page=${page}&limit=${limit}`,
      providesTags: ['Categories'],
    }),
    addCategory: build.mutation<any, any>({
      query: (values) => ({
        url: `create`,
        method: 'POST',
        body: values,
      }),
      invalidatesTags: () => [{ type: 'Categories' }],
    }),
    updateCategory: build.mutation<any, { id: number; values: any }>({
      query: ({ id, values }) => ({
        url: `update/${id}`,
        method: 'PUT',
        body: values,
      }),
      invalidatesTags: (result, error) => [{ type: 'Categories' }],
    }),
    deleteCategory: build.mutation<any, { cascade: number; id: any }>({
      query({ cascade, id }) {
        return {
          url: `delete?cascade=${cascade}`,
          method: 'PUT',
          body: id,
        }
      },
      onQueryStarted: (arg, api) => {
        api.queryFulfilled.then(() => {
          api.dispatch(assetsApi.util.invalidateTags(['Assets']))
        })
      },
      invalidatesTags: (result, error, userId) => [{ type: 'Categories', userId }],
    }),
  }),
})

export const {
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi
