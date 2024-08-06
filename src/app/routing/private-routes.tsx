import { lazy, FC, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { MenuTestPage } from '../pages/MenuTestPage'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import Checkout from '../pages/checkout/Checkout'
import Reserve from 'app/pages/reserve/Reserve'
import Checkin from '../pages/checkin/Checkin'
import AddAssets from 'app/modules/apps/company-setup/asset/components/AssetsInfo'
import Lease from '../modules/lease/Lease'
import LeaseReturn from '../modules/leaseReturn/LeaseReturn'
import Move from '../modules/move/move'
import Maintenance from '../modules/maintenance/Maintenance'
import Dispose from '../modules/dispose/Dispose'
import Import from "../modules/import/Import"
import Export from 'app/modules/export/Export'
import Customers from '../modules/apps/company-setup/customers/customers'
import Persons from '../modules/apps/company-setup/persons/persons'
import Users from "../modules/apps/company-setup/users/Users"
import SecurityGroups from "../modules/apps/company-setup/securityGroups/SecurityGroups"
import UserAssets from '../modules/apps/company-setup/asset/Assets'
// import AssetPage from '../modules/apps/company-setup/AssetPage'
import AssetDetails from '../modules/apps/company-setup/asset/components/AssetDetail'
import ProfilePage from '../modules/profile/ProfilePage'
import WizardsPage from '../modules/wizards/WizardsPage'
import AccountPage from '../modules/accounts/account-page'
import AccountDetailsPage from '../modules/account-details/Account-detailsPage'
import WidgetsPage from '../modules/widgets/WidgetsPage'
import ChatPage from '../modules/apps/chat/chat-page'
import UsersPage from '../modules/apps/user-management/users-page'
import SetupPage from '../modules/apps/company-setup/SetupPage'
import AssetPage from '../modules/apps/company-setup/AssetPage'
import AddUsers from 'app/modules/apps/company-setup/users/components/AddUsers'
import CreateGroup from 'app/modules/apps/company-setup/securityGroups/components/CreateGroup'


const PrivateRoutes = () => {
	// const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
	// const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
	// const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
	// const AccountDetailsPage = lazy(() => import('../modules/account-details/Account-detailsPage'))
	// const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
	// const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
	// const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
	// const SetupPage = lazy(() => import('../modules/apps/company-setup/SetupPage'))
	// const AssetPage = lazy(() => import('../modules/apps/company-setup/AssetPage'))
	// const AssetDetails = lazy(() => import('../modules/apps/company-setup/asset/components/AssetDetail'))


	return (
		<Routes>
			<Route element={<MasterLayout />}>
				<Route path='auth/*' element={<Navigate to='/dashboard' />} />
				<Route path='dashboard' element={<DashboardWrapper />} />
				<Route path='checkout' element={<Checkout />} />
				<Route path='checkin' element={<Checkin />} />
				<Route path='asset/add' element={<AddAssets />} />
				<Route path='asset/edit/:id' element={<AddAssets />} />
				<Route path='asset/view/:id' element={<AssetDetails />} />
				<Route path='lease' element={<Lease />} />
				<Route path='lease-return' element={<LeaseReturn />} />
				<Route path='maintenance' element={<Maintenance />} />
				<Route path='dispose' element={<Dispose />} />
				<Route path='move' element={<Move />} />
				<Route path='assets' element={<UserAssets />} />
				<Route path='import' element={<Import />} />
				<Route path='export' element={<Export />} />
				<Route path='persons' element={<Persons />} />
				<Route path='customers' element={<Customers />} />
				<Route path='users' element={<Users />} />
				<Route path='users/add' element={<AddUsers />} />
				<Route path='groupmanager' element={<SecurityGroups />}/>
				<Route path='groupmanager/creategroup' element={<CreateGroup />}/>
				<Route path='reserve' element={<Reserve />} />
				{/* <Route
          path='builder'
          element={
            <SuspensedView>
              <BuilderPageWrapper />
            </SuspensedView>
          }
        /> */}
				<Route path='menu-test' element={<MenuTestPage />} />
				{/* Lazy Modules */}
				<Route
					path='crafted/pages/profile/*'
					element={
						<SuspensedView>
							<ProfilePage />
						</SuspensedView>
					}
				/>
				<Route
					path='crafted/pages/account-details/*'
					element={
						<SuspensedView>
							<AccountDetailsPage />
						</SuspensedView>
					}
				/>
				<Route
					path='crafted/pages/wizards/*'
					element={
						<SuspensedView>
							<WizardsPage />
						</SuspensedView>
					}
				/>
				<Route
					path='crafted/widgets/*'
					element={
						<SuspensedView>
							<WidgetsPage />
						</SuspensedView>
					}
				/>
				<Route
					path='crafted/account/*'
					element={
						<SuspensedView>
							<AccountPage />
						</SuspensedView>
					}
				/>
				{/* <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        /> */}
				<Route
					path='apps/user-management/*'
					element={
						<SuspensedView>
							<UsersPage />
						</SuspensedView>
					}
				/>
				<Route
					path='apps/setup/*'
					element={
						<SuspensedView>
							<SetupPage />
						</SuspensedView>
					}
				/>
				<Route
					path='apps/asset/*'
					element={
						<SuspensedView>
							<AssetPage />
						</SuspensedView>
					}
				/>
				{/* Page Not Found */}
				<Route path='*' element={<Navigate to='/error/404' />} />
			</Route>
		</Routes>
	)
}

const SuspensedView: FC<WithChildren> = ({ children }) => {
	const baseColor = getCSSVariableValue('--bs-primary')
	TopBarProgress.config({
		barColors: {
			'0': baseColor,
		},
		barThickness: 1,
		shadowBlur: 5,
	})
	return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export { PrivateRoutes }
