import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useLocation } from 'react-router-dom'
import { checkIsActive, toAbsoluteUrlImage, WithChildren } from '../../../helpers'
import Avatar from '../../../assets/images/avatar.jpg'
import { useAuth } from 'app/modules/auth'

type Props = {
	to: string
	title: string
	icon?: any
	fontIcon?: string
	hasBullet?: boolean
	photo?: string
}

const AsideMenuItemWithSub: React.FC<Props & WithChildren> = ({
	children,
	to,
	title,
	icon,
	fontIcon,
	hasBullet,
	photo,
}) => {
	const { pathname } = useLocation()
	const { currentUser } = useAuth()
	const [isActive, setIsActive] = useState<boolean>(false)
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

	useEffect(() => {
		const isChildActive =
			children &&
			React.Children.toArray(children).some((child: any) => {
				const childPath = child.props.to
				return checkIsActive(pathname, childPath) || false
			})

		const mainRouteActive = checkIsActive(pathname, to) || false
		setIsActive(mainRouteActive || isChildActive || false)
		setIsMenuOpen(mainRouteActive || isChildActive || false)
	}, [pathname, children, to])

	// const handleToggleMenu = () => {
	// 	setIsMenuOpen((prevState) => !prevState)
	// }

	return (
		<div
			className={clsx('menu-item', { 'here show': isMenuOpen }, 'menu-accordion')}
			data-kt-menu-trigger='click'
		>
			{/* handleToggleMenu is removed from below class "menu-link" */}
			<span className='menu-link'>
				{hasBullet && (
					<span className='menu-bullet'>
						<span className='bullet bullet-dot'></span>
					</span>
				)}
				{icon && (
					<span className='menu-icon'>
						<i className={icon}></i>
					</span>
				)}
				{fontIcon && <i className={clsx('bi fs-3', fontIcon)}></i>}
				{photo && (
					<div>
						<img
							src={currentUser?.photo ? toAbsoluteUrlImage(currentUser?.photo) : Avatar}
							alt={title}
							className='rounded-circle w-35px me-3'
							crossOrigin='anonymous'
						/>
					</div>
				)}
				<span className='menu-title'>{title}</span>
				<span className='menu-arrow'></span>
			</span>
			<div className={clsx('menu-sub menu-sub-accordion', { 'menu-active-bg': isActive })}>
				{children}
			</div>
		</div>
	)
}

export { AsideMenuItemWithSub }
