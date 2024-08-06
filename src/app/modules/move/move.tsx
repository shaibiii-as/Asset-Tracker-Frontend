import React, { useState, useEffect } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { useIntl } from 'react-intl'
import { KTSVG } from '../../../_metronic/helpers'
import MoveModal from './Modal/MoveModal'
import { useAuth } from '../../modules/auth'
import { useGetAllSitesQuery } from '../../modules/services/sites'
import { useGetAllLocationsBySiteQuery } from '../../modules/services/locations'
import { useGetAllDepartmentsQuery } from '../../modules/services/departments'
import { MoveInterface, defaultMoveDetail as initialValues } from './core/SetupModel'
import { toast } from 'react-toastify'
import { useAddMoveMutation } from '../../modules/services/move'
import { useGetAllAssetsQuery } from 'app/modules/services/assets'
import { useNavigate } from 'react-router-dom'
import SitesModal from '../apps/company-setup/sites/components/SitesModal'
import LocationModal from '../apps/company-setup/locations/components/LocationModal'
import DepartmentsModel from '../apps/company-setup/departments/components/DepartmentsModel'
import { checkUserUnauthorized } from '../../modules/auth'

const Move = () => {
  const intl = useIntl()
  const { currentUser, setCurrentUser, saveAuth } = useAuth()
  const navigate = useNavigate()
  const [assets, setAssets] = useState<any>([])
  const [showMoveModal, setShowMoveModal] = useState(false)
  const [pendingAssets, setPendingAssets] = useState<any>([])
  const [selectedAssets, setSelectedAssets] = useState<any>([])
  const [selectAll, setSelectAll] = useState(false)
  const [selected, setSelected] = useState<any>([])
  const [siteId, setSiteId] = useState<boolean>(false)
  const [showSiteModal, setShowSiteModal] = useState<boolean>(false)
  const [showLocationModal, setShowLocationModal] = useState<boolean>(false)
  const [showDepartmentModal, setShowDepartmentModal] = useState<boolean>(false)
  const [isNewSiteAdded, setIsNewSiteAdded] = useState(false)
  const [isNewDepartmentAdded, setIsNewDepartmentAdded] = useState(false)
  const [isNewLocationAdded, setIsNewLocationAdded] = useState(false)
  const [deleteDataArr, setdeleteDataArr] = useState<number[]>([])
  const { data: siteData } = useGetAllSitesQuery({ userId: currentUser?.id })
  const { data: locationData } = useGetAllLocationsBySiteQuery(
    { userId: currentUser?.id, id: siteId },
    { skip }
  )
  const { data: departmentData } = useGetAllDepartmentsQuery({ userId: currentUser?.id })
  const [addMove, { isLoading: isAdding }] = useAddMoveMutation()
  const {
    data: assetsData,
  } = useGetAllAssetsQuery({
    body: new URLSearchParams({}).toString(),
    page: 1,
    limit: 10,
  })

  const formik = useFormik({
    initialValues: { ...initialValues },
    onSubmit: async (values) => {
      try {
        handleMoveSubmit(values)
      } catch (error) {
        toast.error('Something went wrong')
      }
    },
  })

  useEffect(() => {
    if (isNewSiteAdded) {
      formik.setFieldValue('siteId', siteData?.sites ? siteData?.sites[0]?.id : '')
    }
    if (isNewDepartmentAdded) {
      formik.setFieldValue(
        'departmentId',
        departmentData?.department ? departmentData?.department[0]?.id : ''
      )
    }
    if (isNewLocationAdded) {
      formik.setFieldValue(
        'locationId',
        locationData?.location ? locationData?.location[0]?.id : ''
      )
    }
    if (isNewLocationAdded) {
      formik.setFieldValue(
        'locationId',
        locationData?.locations
          ? locationData?.locations[locationData?.locations?.length - 1]?.id
          : ''
      )
      formik.setFieldValue('siteId', siteId)
    }
  }, [siteData, departmentData, locationData])

  // useEffect(() => {
  //   getEmployee(currentUser?.token).then((res:any) => {
  //     setEmployeeData(res?.data?.persons);
  //   });
  // }, []);
  // useEffect(() => {
  //   setSkip(false)
  // }, [])

  // const handleSiteClick = (e: any) => {
  //   let id = e.target.value
  //   setSiteId(id)
  //   setSkip(false)
  // }

  useEffect(() => {
    if (assetsData) {
      getAssetListing()
    }
  }, [assetsData])
  useEffect(() => {
    if (assets && pendingAssets && showMoveModal == false) {
      handlePendingList()
    }
  }, [assets, showMoveModal])
  const getAssetListing = async () => {
    setAssets(assetsData?.userAssets)
  }
  const handlePendingList = () => {
    const data = assets?.filter((asset: any) => pendingAssets.includes(asset.id))
    setSelectedAssets(data)
    setdeleteDataArr([])
  }
  const handleMoveSubmit = async (values: MoveInterface) => {
    let data = {
      siteId: values?.siteId,
      locationId: values?.locationId,
      departmentId: values?.departmentId,
      assetId: pendingAssets,
    }
    try {
      const result = await addMove({ data }).unwrap()
      if (result) {
        toast.dismiss()
        toast.success(result?.message ? result?.message : result?.data?.message)
        // navigate('/assets')
        setSelectedAssets([])
      }
    } catch (error: any) {
      checkUserUnauthorized(error?.data, saveAuth, setCurrentUser, toast)
    }
  }

  const handleShowMoveModal = () => {
    setShowMoveModal(true)
  }
  const handleCloseMoveModal = () => {
    setShowMoveModal(false)
  }
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = assets?.map((item: any) => item.id)
      setSelected(newSelecteds)
      setSelectAll(true)
      setdeleteDataArr(newSelecteds)
    } else {
      setSelected([])
      setSelectAll(false)
      setdeleteDataArr([])
    }
  }
  const handleCheckboxChange = (id: number) => {
    setSelected((prevSelected: any) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((itemId: any) => itemId !== id)
      } else {
        return [...prevSelected, id]
      }
    })
    setdeleteDataArr((prevSelected: any) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((itemId: any) => itemId !== id)
      } else {
        return [...prevSelected, id]
      }
    })
  }
  const deleteSelectedAssests = async () => {
    const data = selectedAssets?.filter((asset: any) => !deleteDataArr.includes(asset.id))
    setSelectedAssets(data)
    setdeleteDataArr([])
    setSelectAll(false)
    setSelected([])
  }

  const handleCloseSiteModal = () => {
    setShowSiteModal(false)
  }

  const handleShowSiteModal = () => {
    setShowSiteModal(true)
    setIsNewSiteAdded(true)
  }

  const handleCloseLocationModal = () => {
    setShowLocationModal(false)
  }

  const handleShowLocationModal = () => {
    setShowLocationModal(true)
    setIsNewLocationAdded(true)
  }

  const handleCloseDepartmentModal = () => {
    setShowDepartmentModal(false)
  }

  const handleShowDepartmentModal = () => {
    setShowDepartmentModal(true)
    setIsNewDepartmentAdded(true)
  }

  const handleCancel = () => {
    setSelectedAssets([])
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'Move' })}</PageTitle>

      <div className='card mb-5 mb-xl-10'>
        <div
          className='card-header border-0 cursor-pointer'
          role='button'
          data-bs-toggle='collapse'
          data-bs-target='#kt_account_profile_details'
          aria-expanded='true'
          aria-controls='kt_account_profile_details'
        >
          <div className='card-title m-0 '>
            <h3 className='fw-bolder m-0'>
              <span className='me-2 align-middle'>
                <i className='la la-arrows fs-1'></i>
              </span>{' '}
              Move
            </h3>
          </div>
        </div>

        <div id='kt_account_profile_details' className='collapse show'>
          <div className='form'>
            <div className='card-body border-top p-lg-9 p-md-7 p-6'>
              <div className=''>
                {' '}
                <p className='fw-bolder m-0 mb-3'>
                  Keep track of your assets within your organization and create an even more
                  detailed history of them.
                </p>
                <div className='card-footer d-flex justify-content-start border-0 p-0'>
                  <button
                    type='button'
                    className='btn btn-light-primary me-3'
                    onClick={() => handleShowMoveModal()}
                  >
                    <i className='la la-plus fs-3' />
                    Select Assets
                  </button>
                  <MoveModal
                    show={showMoveModal}
                    setPendingAssets={setPendingAssets}
                    selectedAssets={selectedAssets}
                    handleClose={handleCloseMoveModal}
                  />
                </div>
                {selectedAssets && selectedAssets?.length > 0 ? (
                  <>
                    <div className='separator border-2 my-10'></div>
                    <div className='d-flex justify-content-between align-items-center'>
                      <h4 className='mt-3'>Assets Pending Move</h4>
                      {deleteDataArr.length > 0 && (
                        <button
                          type='button'
                          className='btn btn-danger  mb-2'
                          onClick={() => {
                            deleteSelectedAssests()
                          }}
                        >
                          Delete Selected
                        </button>
                      )}
                    </div>
                    <div className='checkout-listing-table mb-3 table-responsive'>
                      <table
                        id='kt_table_users'
                        className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
                        role='table'
                      >
                        <thead>
                          <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                            <th colSpan={1} role='columnheader' className='w-10px pe-2'>
                              <div className='me-3'>
                                <input
                                  type='checkbox'
                                  className='form-check-input custom-form-check-input'
                                  checked={selectAll}
                                  onChange={handleSelectAll}
                                />
                              </div>
                            </th>
                            <th colSpan={1} role='columnheader' className='min-w-125px'>
                              {' '}
                              Asset Tag ID{' '}
                            </th>
                            <th colSpan={1} role='columnheader' className='min-w-125px'>
                              {' '}
                              Description{' '}
                            </th>
                            <th colSpan={1} role='columnheader' className='min-w-125px'>
                              {' '}
                              Status{' '}
                            </th>
                            <th colSpan={1} role='columnheader' className='min-w-125px'>
                              {' '}
                              Assigned to{' '}
                            </th>
                            <th colSpan={1} role='columnheader' className='min-w-125px'>
                              {' '}
                              Site{' '}
                            </th>
                            <th colSpan={1} role='columnheader' className='min-w-125px'>
                              {' '}
                              Location{' '}
                            </th>
                            <th colSpan={1} role='columnheader' className='min-w-125px'>
                              {' '}
                              Lease to{' '}
                            </th>
                          </tr>
                        </thead>
                        <tbody className='text-gray-600 fw-bol' role='rowgroup'>
                          {selectedAssets?.length > 0 ? (
                            selectedAssets?.map((item: any) => {
                              return (
                                <tr role='row'>
                                  <td role='cell' className=''>
                                    <div className=''>
                                      <input
                                        type='checkbox'
                                        className='form-check-input custom-form-check-input'
                                        checked={selected.includes(item.id)}
                                        onChange={() => handleCheckboxChange(item.id)}
                                      />
                                    </div>
                                  </td>
                                  <td role='cell' className=''>
                                    <div className='d-flex align-items-center'>
                                      <div className=' overflow-hidden me-3'>
                                        <a href='#'>{item?.assetTagId}</a>
                                      </div>
                                      {/* <div className='d-flex flex-column'>----</div> */}
                                    </div>
                                  </td>
                                  <td role='cell' className=''>
                                    <div className='d-flex align-items-center'>
                                      <div className=' overflow-hidden me-3'>
                                        <a href='#'>{item?.description}</a>
                                      </div>
                                      {/* <div className='d-flex flex-column'>----</div> */}
                                    </div>
                                  </td>
                                  <td role='cell' className=''>
                                    <div className='d-flex align-items-center'>
                                      {/* <div className=' overflow-hidden me-3'>
                                        <a href='#'>{item?.status}</a>
                                    </div> */}
                                      <div className='d-flex flex-column'>
                                        {item.statusType === 'check_out'
                                          ? 'Checked Out'
                                          : item.statusType === 'lease'
                                            ? 'Leased'
                                            : item.statusType === 'dispose'
                                              ? 'Disposed'
                                              : item.statusType === 'available'
                                                ? 'Available'
                                                : item.statusType}
                                      </div>
                                    </div>
                                  </td>
                                  <td role='cell' className=''>
                                    <div className='d-flex align-items-center'>
                                      <div className=' overflow-hidden me-3'>
                                        <a href='#'>
                                          {item?.assetstatus &&
                                            item?.assetstatus?.statusType !== 'lease'
                                            ? item?.location
                                              ? item?.site?.name + '/' + item?.location?.location
                                              : item?.site?.name
                                            : item?.assetstatus?.statusType == 'lease'
                                              ? ''
                                              : ''}
                                        </a>
                                      </div>
                                      {/* <div className='d-flex flex-column'>----</div> */}
                                    </div>
                                  </td>
                                  <td role='cell' className=''>
                                    <div className='d-flex align-items-center'>
                                      <div className=' overflow-hidden me-3'>
                                        <a href='#'>{item?.site?.name}</a>
                                      </div>
                                      {/* <div className='d-flex flex-column'>----</div> */}
                                    </div>
                                  </td>
                                  <td role='cell' className=''>
                                    <div className='d-flex align-items-center'>
                                      {/* <div className=' overflow-hidden me-3'>
                                        <a href=''></a>
                                    </div> */}
                                      <div className='d-flex flex-column'>
                                        {item?.location?.location}
                                      </div>
                                    </div>
                                  </td>
                                  <td role='cell' className=''>
                                    <div className='d-flex align-items-center'>
                                      <div className='d-flex flex-column'>
                                        {item?.statusType == 'lease' && item?.assetslease
                                          ? item?.assetslease?.customer?.fullName
                                          : ''}
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )
                            })
                          ) : (
                            <tr>
                              <td colSpan={7}>
                                <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                                  No records found
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className='separator border-2 my-10'></div>
                    <form onSubmit={formik.handleSubmit} noValidate className='form'>
                      <div className='row'>
                        <div className='row mb-6'>
                          <div className='col-lg-6'>
                            <div className='row mb-6'>
                              <label className='col-lg-3 col-form-label fw-bold fs-6'>
                                <span className=''>Site</span>
                              </label>
                              <div className='col-lg-9 fv-row d-flex'>
                                <select
                                  className='form-select form-control form-control-solid form-select-solid form-select-lg'
                                  {...formik.getFieldProps('siteId')}
                                  onChange={(e) => {
                                    formik.handleChange(e) // Make sure to call formik.handleChange to update Formik state
                                    // handleSiteClick(e);
                                    formik.setFieldValue('siteId', e.target.value)
                                  }}
                                >
                                  <option value=''>Select Site</option>
                                  {siteData?.sites.map((item: any, idx: number) => {
                                    return (
                                      <option key={idx} value={item.id}>
                                        {item.name}
                                      </option>
                                    )
                                  })}
                                </select>
                                <button
                                  type='button'
                                  className='btn btn-light-primary d-flex align-items-center ms-3'
                                  onClick={() => handleShowSiteModal()}
                                >
                                  <i className='la la-plus fs-3' />
                                  New
                                </button>
                                <SitesModal
                                  show={showSiteModal}
                                  handleClose={handleCloseSiteModal}
                                  SiteData={[]}
                                />
                              </div>
                            </div>

                            <div className='row mb-6'>
                              <label className='col-lg-3 col-form-label fw-bold fs-6'>
                                <span className=''>Location</span>
                              </label>
                              <div className='col-lg-9 fv-row d-flex'>
                                <select
                                  className='form-select form-control form-control-solid form-select-solid form-select-lg'
                                  {...formik.getFieldProps('locationId')}
                                  onChange={(e) => {
                                    formik.handleChange(e)
                                    formik.setFieldValue('locationId', e.target.value)
                                  }}
                                >
                                  <option value=''>Select Location</option>
                                  {locationData?.locations?.map((item: any, idx: number) => {
                                    return (
                                      <option key={idx} value={item.id}>
                                        {item.location}
                                      </option>
                                    )
                                  })}
                                </select>
                                <button
                                  type='button'
                                  className='btn btn-light-primary d-flex align-items-center ms-3'
                                  onClick={() => handleShowLocationModal()}
                                >
                                  <i className='la la-plus fs-3' />
                                  New
                                </button>
                                <LocationModal
                                  setSiteId={setSiteId}
                                  show={showLocationModal}
                                  handleClose={handleCloseLocationModal}
                                  locationData={[]}
                                />
                              </div>
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='row mb-6'>
                              <label className='col-lg-3 col-form-label fw-bold fs-6'>
                                <span className=''>Department</span>
                              </label>
                              <div className='col-lg-9 fv-row d-flex'>
                                <select
                                  className='form-select form-control form-control-solid form-select-solid form-select-lg'
                                  {...formik.getFieldProps('departmentId')}
                                  onChange={(e) => {
                                    formik.handleChange(e)
                                    formik.setFieldValue('departmentId', e.target.value)
                                  }}
                                >
                                  <option value=''>Select Department</option>
                                  {departmentData?.department?.map((item: any, idx: number) => {
                                    return (
                                      <option key={idx} value={item.id}>
                                        {item.department}
                                      </option>
                                    )
                                  })}
                                </select>
                                <button
                                  type='button'
                                  className='btn btn-light-primary d-flex align-items-center ms-3'
                                  onClick={() => handleShowDepartmentModal()}
                                >
                                  <i className='la la-plus fs-3' />
                                  New
                                </button>
                                <DepartmentsModel
                                  show={showDepartmentModal}
                                  handleClose={handleCloseDepartmentModal}
                                  data={[]}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=' d-flex align-items-center justify-content-start'>
                          <button type='submit' className='btn btn-primary me-3' disabled={isAdding}>
                            {!isAdding && 'Add'}
                            {isAdding && (
                              <span className='indicator-progress' style={{ display: 'block' }}>
                                Please wait...{' '}
                                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                              </span>
                            )}
                          </button>
                          <button onClick={handleCancel} className='btn btn-light-secondary main-btn-style'>
                            Cancel
                          </button>
                        </div>
                        {/* <div className="card-footer text-end text-md-start Step2Block" >
                        <div className="row">
                          <div className="col-md-9 col-lg-10">
                            <button id="SubmitBtn" type="submit" className="btn btn-primary me-3">Check-Out</button>
                    {/* <button onClick={() => { navigate('/apps/setup/assets') }} className="btn btn-secondary">Cancel</button> */}
                        {/* <Link to={'/assets'} className="btn btn-secondary">Cancel</Link> */}
                      </div>
                    </form>
                    {/* <button onClick={() => { navigate('/apps/setup/assets') }} className="btn btn-secondary">Cancel</button> */}
                  </>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Move
