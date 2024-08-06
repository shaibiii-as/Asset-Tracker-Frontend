import React, { useState, useEffect } from 'react'
import { ProfileDetails } from './cards/ProfileDetails'
import { SignInMethod } from './cards/SignInMethod'
import { TwoFactorAuth } from './cards/TwoFactorAuth'
import { ConnectedAccounts } from './cards/ConnectedAccounts'
import { EmailPreferences } from './cards/EmailPreferences'
import { Notifications } from './cards/Notifications'
import { DeactivateAccount } from './cards/DeactivateAccount'
import { useGetProfileQuery } from 'app/modules/services/profile'
import SplashScreen from 'app/SplashScreen'
import { checkUserUnauthorized } from 'app/modules/auth'
import { useAuth } from 'app/modules/auth'
import { toast } from 'react-toastify'



export function Settings() {
	const { data, isLoading, isError, error } = useGetProfileQuery()
	const [loader, setLoader] = useState(false)
	const { saveAuth, setCurrentUser } = useAuth()

	useEffect(() => {
		if (isError) {
			const errorData = error as { data: any };
			checkUserUnauthorized(errorData?.data, saveAuth, setCurrentUser, toast)
		}
	}, [isError])

	return (
		<>
			<SplashScreen isLoadingTemplate={isLoading || loader} />
			{!(isLoading || loader) ?
				<>
					<ProfileDetails userData={data} />
					<TwoFactorAuth userData={data} setLoader={setLoader} />
					<SignInMethod />
					{/* <ConnectedAccounts /> */}
					{/* <EmailPreferences />
	<Notifications />
<DeactivateAccount /> */}
				</>
				: null
			}
		</>
	)
}
