import React from 'react'
import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import { Overview } from './components/overview'
import { Settings } from './components/settings/Settings'
import { AccountHeader } from './account-header'
import { SignInMethod } from './components/settings/cards/SignInMethod'

const accountBreadCrumbs: Array<PageLink> = [
	{
		title: 'Account',
		path: '/crafted/account/overview',
		isSeparator: false,
		isActive: false,
	},
	{
		title: '',
		path: '',
		isSeparator: true,
		isActive: false,
	},
]

const AccountPage: React.FC = () => {
	return (
		<Routes>
			<Route
				element={
					<>
						<AccountHeader />
						<Outlet />
					</>
				}
			>
				<Route
					path='overview'
					element={
						<>
							<PageTitle breadcrumbs={accountBreadCrumbs}>Overview</PageTitle>
							<Overview />
						</>
					}
				/>
				<Route
					path='settings'
					element={
						<>
							<PageTitle breadcrumbs={accountBreadCrumbs}>Settings</PageTitle>
							<Settings />
						</>
					}
				/>
				<Route index element={<Navigate to='/crafted/account/overview' />} />
			</Route>
				<Route
					path='change-password'
					element={
						<>
							<PageTitle breadcrumbs={accountBreadCrumbs}>Change Password</PageTitle>
							<SignInMethod />
						</>
					}
				/>
		</Routes>
	)
}

export default AccountPage
