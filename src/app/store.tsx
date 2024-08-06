import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/dist/query'
import {companyApi} from './modules/services/company'
import {sitesApi} from './modules/services/sites'
import {personsApi} from './modules/services/persons'
import {customersApi} from './modules/services/customers'
import {assetsApi} from './modules/services/assets'
import {optionApi} from './modules/services/option'
import {tableOptionApi} from './modules/services/tableOption'
import {eventsApi} from './modules/services/events'
import {locationsApi} from './modules/services/locations'
import {categoriesApi} from './modules/services/categories'
import {departmentsApi} from './modules/services/departments'
import {checkoutApi} from './modules/services/checkout'
import {leaseApi} from './modules/services/lease'
import {moveApi} from './modules/services/move'
import {maintenanceApi} from './modules/services/maintenance'
import {disposeApi} from './modules/services/dispose'
import {leaseReturnApi} from './modules/services/leaseReturn'
import {reserveApi} from './modules/services/reserve'
import {exportsApi} from './modules/services/exports'
import {importsApi} from './modules/services/imports'
import {emailTemplateApi} from './modules/services/emailTemplate'
import {profileApi} from './modules/services/profile'
import {subUserApi} from './modules/services/sub-user'

export const store = configureStore({
  reducer: {
    [companyApi.reducerPath]: companyApi.reducer,
    [sitesApi.reducerPath]: sitesApi.reducer,
    [personsApi.reducerPath]: personsApi.reducer,
    [customersApi.reducerPath]: customersApi.reducer,
    [optionApi.reducerPath]: optionApi.reducer,
    [tableOptionApi.reducerPath]: tableOptionApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [locationsApi.reducerPath]: locationsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [departmentsApi.reducerPath]: departmentsApi.reducer,
    [assetsApi.reducerPath]: assetsApi.reducer,
    [checkoutApi.reducerPath]: checkoutApi.reducer,
    [leaseApi.reducerPath]: leaseApi.reducer,
    [moveApi.reducerPath]: moveApi.reducer,
    [maintenanceApi.reducerPath]: maintenanceApi.reducer,
    [disposeApi.reducerPath]: disposeApi.reducer,
    [leaseReturnApi.reducerPath]: leaseReturnApi.reducer,
    [reserveApi.reducerPath]: reserveApi.reducer,
    [exportsApi.reducerPath]: exportsApi.reducer,
    [importsApi.reducerPath]: importsApi.reducer,
    [emailTemplateApi.reducerPath]: emailTemplateApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [subUserApi.reducerPath]: subUserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      companyApi.middleware,
      sitesApi.middleware,
      personsApi.middleware,
      customersApi.middleware,
      optionApi.middleware,
      tableOptionApi.middleware,
      eventsApi.middleware,
      locationsApi.middleware,
      categoriesApi.middleware,
      departmentsApi.middleware,
      assetsApi.middleware,
      checkoutApi.middleware,
      leaseApi.middleware,
      moveApi.middleware,
      maintenanceApi.middleware,
      disposeApi.middleware,
      leaseReturnApi.middleware,
      reserveApi.middleware,
      exportsApi.middleware,
      importsApi.middleware,
      emailTemplateApi.middleware,
      profileApi.middleware,
      subUserApi.middleware
    ),
})

setupListeners(store.dispatch)
