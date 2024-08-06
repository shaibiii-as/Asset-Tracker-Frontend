import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getAuth } from '../auth'

const API_URL = process.env.REACT_APP_API_URL

export const assetsApi = createApi({
	reducerPath: 'assetsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${API_URL}/user-assets/`,
		prepareHeaders: (headers) => {
			// Add the bearer token to the headers
			const auth = getAuth()
			if (auth && auth?.token) {
				headers.set('Authorization', `Bearer ${auth?.token}`);
			}
			return headers;
		},
	}),
	tagTypes: ['Assets', 'Asset'],
	endpoints: (build) => ({
		getAllAssets: build.query<any, { body: any, page: any, limit: any }>({
			query: ({ body, page, limit }) => ({
				url: `list/?${body}&page=${page}&limit=${limit}`,
				method: 'GET',
			}),
			providesTags: ['Assets'],
		}),
		getSingleAsset: build.query<any, { assetId: any }>({
			query: ({ assetId }) => ({
				url: `get/${assetId}`,
				method: 'GET',
			}),
			providesTags: ['Assets'],
		}),
		addAsset: build.mutation<any, FormData>({
			query: (formData) => ({
				url: `create`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: () => [{ type: 'Assets' }],
		}),
		updateAsset: build.mutation<any, { assetId: any; formData: FormData }>({
			query: ({ assetId, formData }) => ({
				url: `update/${assetId}`,
				method: 'PUT',
				body: formData,
			}),
			invalidatesTags: (result, error, { assetId }) => [{ type: 'Assets' }],
		}),
		deleteAssets: build.mutation<any, { id: any }>({
			query({ id }) {
				return {
					url: `delete-all`,
					method: 'DELETE',
					body: id
				}
			},
			invalidatesTags: (userId, id) => [{ type: 'Assets' }],
		}),
		// searchAssets: build.mutation<any, any>({
		//     query: (body) => ({
		//       url: ``,
		//       method: 'POST',
		//       body,
		//     }),
		//     invalidatesTags: () => [{ type: 'Assets'}],
		//   })
	}),
})

export const {
	useGetAllAssetsQuery,
	useGetSingleAssetQuery,
	useAddAssetMutation,
	useUpdateAssetMutation,
	useDeleteAssetsMutation,
} = assetsApi
