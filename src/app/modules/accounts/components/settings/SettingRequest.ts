import { IProfileDetails, UserResponse } from './SettingsModel'
import axios from 'axios'
import { setupAxios } from '../../../../../app/modules/auth'

const API_URL = process.env.REACT_APP_API_URL
export const USER_VIEW_PROFILE = `${API_URL}/user`
export const USER_UPDATE_PROFILE = `${API_URL}/user`
export function UpdateProfile(values: IProfileDetails) {
	const formData = new FormData();
	for (const key of Object.keys(values)) {
		if (Object.prototype.hasOwnProperty.call(values, key)) {
			if (values) {
				const value = values[key as keyof IProfileDetails];
				formData.append(key, value);
			}
		}
	}
	return axios.put(`${USER_UPDATE_PROFILE}/profile`, formData);
}

export function GetProfileDetail() {
	setupAxios(axios)
	return axios.get(`${USER_VIEW_PROFILE}/getProfile`)
		.then(response => {
			return response.data; // return the data property of the response object
		})
}

export function deleteAllData() {
	setupAxios(axios)
	return axios.get(`${USER_VIEW_PROFILE}/delete`)
		.then(response => {
			return response.data; // return the data property of the response object
		})
}