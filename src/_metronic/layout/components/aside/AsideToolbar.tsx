import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../../app/modules/auth'
import { KTSVG, toAbsoluteUrl, toAbsoluteUrlImage } from '../../../helpers'
import { HeaderUserMenu, Search } from '../../../partials'
import Avatar from "../../../../_metronic/assets/images/avatar.jpg"
/* eslint-disable jsx-a11y/anchor-is-valid */
const AsideToolbar: React.FC = () => {
	const { currentUser } = useAuth();
	const [isActive, setIsActive] = useState(false);
	const asideUserRef = useRef<HTMLDivElement | null>(null);


	function handleClick() {
		setIsActive(!isActive);
	}

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (asideUserRef.current && !asideUserRef.current.contains(event.target)) {
				setIsActive(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isActive]);
	return (
		<div className='d-flex align-items-center'>
			<div className='w-100' data-kt-menu-trigger='click' data-kt-menu-placement='bottom-start' data-kt-menu-overflow='false'>
				<div className="aside-user h-100 d-flex align-items-center cursor-pointer position-relative" onClick={handleClick} ref={asideUserRef}>
					<div className='d-flex align-items-center justify-content-center me-sm-5 me-3'>
						<div className='symbol symbol-50px'>
							<img className='image-input-wrapper ' src={currentUser?.photo ? toAbsoluteUrlImage(currentUser?.photo) : Avatar} alt="profile" crossOrigin="anonymous" />
						</div>
						<div className='aside-user-info flex-row-fluid flex-wrap ms-sm-5 ms-3'>
							<div className='d-flex'>
								<div className='flex-grow-1 me-2'>
									<h2 className='card-title fs-6 fw-bold text-capitalize'>
										{currentUser?.firstName} {currentUser?.lastName}
									</h2>
									<span className='text-gray-600 fw-bold d-block fs-8'>{currentUser?.title}</span>
								</div>
								<div className='me-n2'>
									<KTSVG
										path='/media/icons/duotune/coding/cod001.svg'
										className='svg-icon-muted svg-icon-12'
									/>
									<HeaderUserMenu />
								</div>
							</div>
						</div>
					</div>
					<span>
						<i className={`las ${isActive ? 'la-angle-up' : 'la-angle-down'} fs-5 mx-sm-2`}></i>
					</span>

				</div>
			</div>
			{/* <div className='aside-search py-5'>
        <Search />
      </div> */}
		</div>
	)
}

export { AsideToolbar }
