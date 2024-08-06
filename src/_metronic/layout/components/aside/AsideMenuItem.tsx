import { FC } from 'react'
import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'
import { checkIsActive, WithChildren } from '../../../helpers'
import { useAuth } from 'app/modules/auth'

type Props = {
	to: string
	title: string
	icon?: any
	fontIcon?: string
	hasBullet?: boolean
	actionType?: number
}

const AsideMenuItem: FC<Props & WithChildren> = ({
	children,
	to,
	title,
	icon,
	fontIcon,
	hasBullet = false,
	actionType
}) => {
	const { pathname } = useLocation()
	const isActive = checkIsActive(pathname, to)
	const { logout } = useAuth()
	const handleClick = () => {
		if (actionType === 1) {
			logout();
		}
	}
	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			handleClick();
		}
	};

	return (
		<div className='menu-item' onClick={handleClick} onKeyDown={handleKeyDown} >
			<Link className={clsx('menu-link without-sub', { active: isActive })} to={to}>
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
				<span className='menu-title'>{title}</span>
			</Link>
			{children}
		</div>
	)
}

export { AsideMenuItem }
