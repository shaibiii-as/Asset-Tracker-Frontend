/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom'
import { useGetProfileQuery } from 'app/modules/services/profile'
import { Button } from 'react-bootstrap'
import SplashScreen from 'app/SplashScreen'

export function Overview() {
	const { data, isLoading } = useGetProfileQuery()

	return (
		<>
			<SplashScreen isLoadingTemplate={isLoading} />
			{!isLoading ?
				<>
					<div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
						<div className='card-body d-flex border-bottom border-bottom-gray-200 justify-content-between align-items-center pb-3'>
							<div className='card-title m-0'>
								<h3 className='fw-bolder m-0'>Profile Details</h3>
							</div>
							<Link to='/crafted/account/settings' className='btn btn-light-primary align-self-center'>
								Edit Profile
							</Link>
						</div>
						<div className='card-body p-9'>
							<div className='row mb-7'>
								<label className='col-lg-4 fw-bold'>Full Name</label>
								<div className='col-lg-8'>
									<span className='fw-bolder fs-6 text-dark'>{data?.user?.firstName} {data?.user?.lastName}</span>
								</div>
							</div>
							<div className='row mb-7'>
								<label className='col-lg-4 fw-bold'>Company Name</label>
								<div className='col-lg-8'>
									<span className='fw-bolder fs-6 text-dark'>{data?.user?.title}</span>
								</div>
							</div>
							<div className='row mb-7'>
								<label className='col-lg-4 fw-bold'>Email</label>
								<div className='col-lg-8'>
									<span className='fw-bolder fs-6 text-dark'>{data?.user?.email}</span>
								</div>
							</div>
							<div className='row mb-7'>
								<label className='col-lg-4 fw-bold'>
									Contact Phone
									<i
										className='fas fa-exclamation-circle ms-1 fs-7'
										data-bs-toggle='tooltip'
										title='Phone number must be active'
									></i>
								</label>
								<div className='col-lg-8 d-flex align-items-center'>
									<span className='fw-bolder fs-6 me-2'>{data?.user?.phone}</span>
									{data?.user?.phone ? <span className='badge badge-success'>Verified</span> :
										<Button variant='primary'>
											Edit Phone
										</Button>
									}
								</div>
							</div>
						</div>
					</div>
					{/* <div className='row gy-10 gx-xl-10'>
        <div className='col-xl-6'>
          <ChartsWidget1 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>
        <div className='col-xl-6'>
          <TablesWidget1 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>
      </div>
      <div className='row gy-10 gx-xl-10'>
        <div className='col-xl-6'>
          <ListsWidget5 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>
        <div className='col-xl-6'>
          <TablesWidget5 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>
      </div> */}
				</>
				: null}

		</>
	)
}
