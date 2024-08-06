/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../../app/modules/auth'
import { Languages } from './Languages'
import { toAbsoluteUrlImage } from '../../../helpers'
import Avatar from "../../../assets/images/avatar.jpg"

const HeaderUserMenu: FC = () => {
  const { currentUser, logout } = useAuth()
  function truncateEmail(email: string | undefined | null): string {
    if (!email) {
      return ''; // Handle the case where email is undefined or null
    }

    const atTheIndex = email.indexOf('@'); // Find the position of the "@" symbol
    const atIndex = atTheIndex - 3;
    if (atIndex === -1) {
      return email; // Return the full email if "@" is not found
    }

    const firstPart = email.slice(0, atIndex); // Extract the part before "@"
    const secondPart = email.slice(atIndex); // Extract the part after "@"

    // Truncate the first part to a desired length (e.g., 6 characters)
    const truncatedFirstPart = firstPart.slice(0, 7);

    return `${truncatedFirstPart}...${secondPart}`;
  }
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px custom-menu-dropdown'
      data-kt-menu='true'
      data-popper-placement=''
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-3'>
            <img className='image-input-wrapper ' src={currentUser?.photo ? toAbsoluteUrlImage(currentUser?.photo) : Avatar} alt="profile" crossOrigin="anonymous" />
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5 text-capitalize'>
              {currentUser?.firstName} {currentUser?.lastName}
              {/* <span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>Pro</span> */}
            </div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
              {truncateEmail(currentUser?.email)}
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>

      <div className='menu-item px-5'>
        <Link to={'/crafted/account/settings'} className='menu-link px-5'>
          My Profile
        </Link>
      </div>

      {/* <div className='menu-item px-5'>
        <a href='#' className='menu-link px-5'>
          <span className='menu-text'>My Projects</span>
          <span className='menu-badge'>
            <span className='badge badge-light-danger badge-circle fw-bolder fs-7'>3</span>
          </span>
        </a>
      </div> */}

      {/* <div
        className='menu-item px-5'
        data-kt-menu-trigger='hover'
        data-kt-menu-placement='left-start'
        data-kt-menu-flip='bottom'
      >
        <a href='#' className='menu-link px-5'>
          <span className='menu-title'>My Subscription</span>
          <span className='menu-arrow'></span>
        </a>

        <div className='menu-sub menu-sub-dropdown w-175px py-4'>
          <div className='menu-item px-3'>
            <a href='#' className='menu-link px-5'>
              Referrals
            </a>
          </div>

          <div className='menu-item px-3'>
            <a href='#' className='menu-link px-5'>
              Billing
            </a>
          </div>

          <div className='menu-item px-3'>
            <a href='#' className='menu-link px-5'>
              Payments
            </a>
          </div>

          <div className='menu-item px-3'>
            <a href='#' className='menu-link d-flex flex-stack px-5'>
              Statements
              <i
                className='fas fa-exclamation-circle ms-2 fs-7'
                data-bs-toggle='tooltip'
                title='View your statements'
              ></i>
            </a>
          </div>

          <div className='separator my-2'></div>

          <div className='menu-item px-3'>
            <div className='menu-content px-3'>
              <label className='form-check form-switch form-check-custom '>
                <input
                  className='form-check-input w-30px h-20px'
                  type='checkbox'
                  value='1'
                  defaultChecked={true}
                  name='notifications'
                />
                <span className='form-check-label text-muted fs-7'>Notifications</span>
              </label>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className='menu-item px-5'>
      <Link to={'/crafted/pages/account-details'} className='menu-link px-5'>
         Account Details
        </Link>
      </div> */}

      {/* <div className='menu-item px-5'>
        <a href='#' className='menu-link px-5'>
          My Statements
        </a>
      </div> */}

      {/* <div className='separator my-2'></div> */}

      {/* <Languages /> */}

      <div className='menu-item px-5'>
        <Link to='/crafted/account/settings' className='menu-link px-5'>
          Account Settings
        </Link>
      </div>

      <div className='menu-item px-5'>
        <a onClick={logout} className='menu-link px-5'>
          Sign Out
        </a>
      </div>
    </div>
  )
}

export { HeaderUserMenu }
