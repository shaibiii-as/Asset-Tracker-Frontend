/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { KTSVG, toAbsoluteUrl, toAbsoluteUrlImage } from '../../../_metronic/helpers'
import { Link } from 'react-router-dom'
import { Dropdown1 } from '../../../_metronic/partials'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../auth'
import Avatar from "../../../_metronic/assets/images/avatar.jpg"
const AccountHeader: React.FC = () => {
	const location = useLocation()
	const { currentUser } = useAuth()
	const [propertyName] = useState<string[]>(["firstName", "lastName", "title", "email", "phone", "timeZone", "dateFormat", "timeFormat", "photo"])
	const [count, setCount] = useState<number>(0);

	useEffect(() => {
		if (currentUser) {
			let updatedCount = 0;
			propertyName.forEach(propertyName => {
				if (currentUser[propertyName]) {
					updatedCount += 11.11;
				}
			});
			setCount(updatedCount);
		}
	}, [])

	return (
		<div className='card mb-5 mb-xl-10'>
			<div className='card-body pt-9 pb-0'>
				<div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
					<div className='me-7 mb-4'>
						<div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
							<img className='image-input-wrapper w-125px h-125px' src={currentUser?.photo ? toAbsoluteUrlImage(currentUser?.photo) : Avatar} alt="profile" crossOrigin="anonymous" />
							{/* <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div> */}
						</div>
					</div>
					<div className='flex-grow-1'>
						<div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
							<div className='d-flex flex-column'>
								<div className='d-flex align-items-center mb-2'>
									<a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1 text-captitalize'>
										{currentUser?.firstName} {currentUser?.lastName}
									</a>
									<a href='#'>
										<KTSVG
											path='/media/icons/duotune/general/gen026.svg'
											className='svg-icon-1 svg-icon-primary'
										/>
									</a>
								</div>
								<div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
									{currentUser?.title &&
										<a
											href='#'
											className='d-flex align-items-center text-hover-primary me-5 mb-2'
										>
											<KTSVG
												path='/media/icons/duotune/communication/com006.svg'
												className='svg-icon-4 me-1'
											/>
											{currentUser?.title}
										</a>
									}
									<a
										href='#'
										className='d-flex align-items-center text-hover-primary mb-2'
									>
										<KTSVG
											path='/media/icons/duotune/communication/com011.svg'
											className='svg-icon-4 me-1'
										/>
										{currentUser?.email}
									</a>
								</div>
							</div>
						</div>
						<div className='d-flex flex-wrap flex-stack'>
							<div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
								<div className='d-flex justify-content-between w-100 mt-auto mb-2'>
									<span className='fw-bold fs-6'>Profile Completion</span>
									<span className='fw-bolder fs-6'>{Math.ceil(count)}%</span>
								</div>
								<div className='h-5px mx-3 w-100 bg-light mb-3'>
									<div
										className='bg-success rounded h-5px'
										role='progressbar'
										style={{ width: `${Math.ceil(count)}%` }}
									></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='d-flex overflow-auto h-55px'>
					<ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
						<li className='nav-item'>
							<Link
								className={
									`nav-link text-active-primary me-6 ` +
									(location.pathname === '/crafted/account/overview' && 'active')
								}
								to='/crafted/account/overview'
							>
								Overview
							</Link>
						</li>
						<li className='nav-item'>
							<Link
								className={
									`nav-link text-active-primary me-6 ` +
									(location.pathname === '/crafted/account/settings' && 'active')
								}
								to='/crafted/account/settings'
							>
								Settings
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export { AccountHeader }
