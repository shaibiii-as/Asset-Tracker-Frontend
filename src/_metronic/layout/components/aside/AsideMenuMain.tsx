import React, {useEffect} from 'react'
import {useIntl} from 'react-intl'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'
import {useGetCompanyQuery} from 'app/modules/services/company'
import {useAuth} from 'app/modules/auth'
import {useNavigate, useLocation} from 'react-router-dom'
import {toast} from 'react-toastify'
import SplashScreen from 'app/SplashScreen'

export function AsideMenuMain() {
  const intl = useIntl()
  const {currentUser} = useAuth()
  const {data: companyData, isLoading} = useGetCompanyQuery()
  type CustomAsideMenuItemIcon = React.ReactElement<any, string | React.JSXElementConstructor<any>>
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isLoading) {
      // if (Array.isArray(companyData?.company) && location.pathname !== '/apps/setup/company') {
      if (!companyData) {
        toast.dismiss()
        navigate('/apps/setup/company')
        toast.info('Company information is requmainRouteActiveired!')
      }
    }
  }, [location.pathname, isLoading])

  return (
    <>
      <SplashScreen isLoadingTemplate={isLoading} />
      {!isLoading ? (
        <>
          {!companyData?.company ? (
            <span></span>
          ) : (
            <AsideMenuItemWithSub
              to='/apps/asset'
              title={`${currentUser?.firstName} ${currentUser?.lastName}`}
              photo={'true'}
            >
              <AsideMenuItem
                to='/crafted/account/settings'
                title='My Profile'
                icon={'la la-user fs-2 me-3'}
              />
              <AsideMenuItem
                to='/crafted/account/change-password'
                icon={'la la-key fs-2 me-3'}
                title='Change Password'
              />
              <AsideMenuItem
                actionType={1}
                to='/auth/login'
                title='Logout'
                icon={'la la-sign-out fs-2 me-3'}
              />
              <AsideMenuItem
                to='/crafted/pages/account-details/overview'
                title='Account Details'
                icon={'la la-user fs-2 me-3'}
              />
            </AsideMenuItemWithSub>
          )}

          {!companyData?.company ? (
            <span></span>
          ) : (
            <AsideMenuItem to='/dashboard' icon={'las la-home fs-2 me-3'} title={'Dashboard'} />
          )}
          {!companyData?.company ? (
            <span></span>
          ) : (
            <AsideMenuItemWithSub
              to='/apps/asset'
              title='Assets'
              icon={'las la-puzzle-piece fs-2 me-3'}
            >
              <AsideMenuItem to='/assets' title='List of Assets' icon={'las la-list fs-2 me-3'} />
              <AsideMenuItem
                to='/asset/add'
                icon={'la la-plus-circle fs-2 me-3'}
                title={'Add an Asset'}
              />
              <AsideMenuItem
                to='/checkout'
                icon={'las la-user-check fs-2 me-3'}
                title={'Check out'}
              />
              <AsideMenuItem
                to='/checkin'
                icon={'las la-user-times fs-2 me-3'}
                title={'Check in'}
              />
              <AsideMenuItem to='/lease' icon={'las la-paper-plane fs-2 me-3'} title={'Lease'} />
              <AsideMenuItem
                to='/lease-return'
                icon={'las la-paper-plane fs-2 me-3'}
                title={'Lease Return'}
              />
              <AsideMenuItem to='/dispose' icon={'las la-recycle fs-2 me-3'} title={'Dispose'} />
              <AsideMenuItem
                to='/maintenance'
                icon={'las la-cogs fs-2 me-3'}
                title={'Maintenance'}
              />
              <AsideMenuItem to='/move' icon={'las la-arrows-alt fs-2 me-3'} title={'Move'} />
              <AsideMenuItem to='/reserve' icon={'la la-calendar fs-2 me-3'} title={'Reserve'} />
              {/* <AsideMenuItem to='/crafted/pages/account-details/overview' title='Account-Details' hasBullet={true} /> */}
            </AsideMenuItemWithSub>
          )}

          {!companyData?.company ? (
            <AsideMenuItemWithSub to='/apps/setup' title='Setup' icon={'las la-cog fs-2 me-3'}>
              <AsideMenuItem
                to='/apps/setup/company'
                title='Company Info.'
                icon={'las la-briefcase fs-2 me-3'}
              />
            </AsideMenuItemWithSub>
          ) : (
            <AsideMenuItemWithSub to='/apps/setup' title='Setup' icon={'las la-cog fs-2 me-3'}>
              <AsideMenuItem
                to='/apps/setup/company'
                title='Company Info.'
                icon={'las la-briefcase fs-2 me-3'}
              />
              <AsideMenuItem
                to='/apps/setup/sites'
                title='Sites'
                icon={'las la-map-marker fs-2 me-3'}
              />
              <AsideMenuItem
                to='/apps/setup/location'
                title='Location'
                icon={'las la-map-signs fs-2 me-3'}
              />
              <AsideMenuItem
                to='/apps/setup/categories'
                title='Categories'
                icon={'far fa-list-alt fs-3 me-3'}
              />
              <AsideMenuItem
                to='/apps/setup/department'
                title='Departments'
                icon={'las la-border-all fs-2 me-3'}
              />
              <AsideMenuItemWithSub
                to='/apps/setup/database'
                title='Databases'
                icon={'las la-database fs-2 me-3'}
              >
                <AsideMenuItem
                  to='/apps/setup/database/asset'
                  title='Assets Table'
                  hasBullet={true}
                />
                <AsideMenuItem
                  to='/apps/setup/database/person'
                  title='Persons/Employees'
                  hasBullet={true}
                />
                <AsideMenuItem
                  to='/apps/setup/database/customer'
                  title='Customer Table'
                  hasBullet={true}
                />
                <AsideMenuItem
                  to='/apps/setup/database/maintenance'
                  title='Maintenance Table'
                  hasBullet={true}
                />
                <AsideMenuItem
                  to='/apps/setup/database/warranty'
                  title='Warranties Table'
                  hasBullet={true}
                />
                <AsideMenuItem
                  to='/apps/setup/database/contract'
                  title='Contract Table'
                  hasBullet={true}
                />
              </AsideMenuItemWithSub>
              <AsideMenuItem
                to='/apps/setup/events'
                title='Events'
                icon={'las la-calendar-check fs-1 me-3'}
              />
              <AsideMenuItem
                to='/apps/setup/table'
                title='Table Options'
                icon={'las la-table fs-1 me-3'}
              />
              <AsideMenuItem
                to='/apps/setup/options'
                title='Options'
                icon={'lab la-elementor fs-1 me-3'}
              />
              <AsideMenuItem
                to='/apps/setup/customEmails'
                title='Customize Emails'
                icon={'lab la la-mail-bulk fs-1 me-3'}
              />
            </AsideMenuItemWithSub>
          )}
          {!companyData?.company ? (
            <span></span>
          ) : (
            <AsideMenuItemWithSub to='/apps/tools' title='Tools' icon={'la la-wrench fs-2 me-3'}>
              <AsideMenuItem to='/import' title='Import' icon={'la la-cloud-download fs-2 me-15'} />
              <AsideMenuItem to='/export' title='Export' icon={'la la-cloud-upload fs-2 me-15'} />
            </AsideMenuItemWithSub>
          )}
          {!companyData?.company ? (
            <span></span>
          ) : (
            <AsideMenuItemWithSub
              to='/apps/advanced'
              title='Advanced'
              icon={'la la-toolbox fs-2 me-3'}
            >
              <AsideMenuItem
                to='/persons'
                title='Persons/Employees'
                icon={'la la-user-tie fs-2 me-15'}
              />
              <AsideMenuItem to='/customers' title='Customers' icon={'la la-users fs-2 me-15'} />
              <AsideMenuItem to='/users' title='Users' icon={'la la-user-friends fs-2 me-15'} />
              <AsideMenuItem
                to='/groupmanager'
                title='Security Groups'
                icon={'la la-users-cog fs-2 me-15'}
              />
            </AsideMenuItemWithSub>
          )}
        </>
      ) : null}
    </>
  )
}
