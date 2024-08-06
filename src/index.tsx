import {createRoot} from 'react-dom/client'
// Axios
import axios from 'axios'
import {Chart, registerables} from 'chart.js'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
// Apps
import {MetronicI18nProvider} from './_metronic/i18n/Metronici18n'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "react-datepicker/dist/react-datepicker.css";
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 **/
import 'nouislider/dist/nouislider.css'
import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/plugins.scss'
import './_metronic/assets/sass/style.react.scss'
import './_metronic/assets/sass/assets.rack.scss'
import {AppRoutes} from './app/routing/app-routes'
import {AuthProvider, setupAxios} from './app/modules/auth'
import {ThemeModeProvider} from './_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { store } from './app/store'
import { Provider } from 'react-redux';
import "../src/customStyles.css"
/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic Metronic mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */
/**
 * Inject Metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
setupAxios(axios)
Chart.register(...registerables)

const queryClient = new QueryClient()
const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
        <MetronicI18nProvider>
          <ThemeModeProvider>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </ThemeModeProvider>
          <ToastContainer />
        </MetronicI18nProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  )
}
