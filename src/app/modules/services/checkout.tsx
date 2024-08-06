import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { assetsApi } from './assets'
import { getAuth } from '../auth'

const API_URL = process.env.REACT_APP_API_URL

export const checkoutApi = createApi({
	reducerPath: 'checkoutApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${API_URL}/asset-status/`,
		prepareHeaders: (headers) => {
			// Add the bearer token to the headers
			const auth = getAuth()
			if (auth && auth?.token) {
				headers.set('Authorization', `Bearer ${auth?.token}`);
			}
			return headers;
		},
	}),
	tagTypes: ['Checkout'],
	endpoints: (build) => ({
		// getAllCategories: build.query<any, any>({
		//   query: ({userId,page}) => `list/?page=${page}&userId=${userId}`,
		//   providesTags: ['Categories'],
		// }),
		addCheckout: build.mutation<any, any>({
			query: (data) => ({
				url: `checkout`,
				method: 'POST',
				body: data,
			}),
			onQueryStarted: (arg, api) => {
				api.queryFulfilled.then(() => {
					api.dispatch(
						assetsApi.util.invalidateTags(["Assets"])
					);
				});
			},
			invalidatesTags: () => [{ type: 'Checkout' }],
		}),
		addCheckin: build.mutation<any, any>({
			query: (data) => ({
				url: `checkin`,
				method: 'POST',
				body: data,
			}),
			onQueryStarted: (arg, api) => {
				api.queryFulfilled.then(() => {
					api.dispatch(
						assetsApi.util.invalidateTags(["Assets"])
					);
				});
			},
			invalidatesTags: () => [{ type: 'Checkout' }],
		}),
		// updateCategory: build.mutation<any, { id: any; values: any }>({
		//   query: (values) => ({
		//     url: `update`,
		//     method: 'PUT',
		//     body: values,
		//   }),
		//   invalidatesTags: (result, error) => [{ type: 'Categories' }],
		// }),
		// deleteCategory: build.mutation<any, {userId:number | undefined, id: number[]}>({
		//   query({userId, id}) {
		//     return {
		//       url: `delete/${userId}`,
		//       method: 'PUT',
		//       body: id
		//     }
		//   },
		//   invalidatesTags: (result, error, userId) => [{ type: 'Categories', userId }],
		// }),
	}),
})

export const {
	// useGetAllCategoriesQuery,
	useAddCheckoutMutation,
	useAddCheckinMutation,
	// useUpdateCategoryMutation,
	// useDeleteCategoryMutation,
} = checkoutApi
