import React, { useEffect, useState } from 'react'
import { toAbsoluteUrlImage } from '../../../../../../_metronic/helpers'
import { IProfileDetails, profileDetailsInitValues as initialValues } from '../SettingsModel'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useAuth } from '../../../../auth'
import { toast } from 'react-toastify'
import Avatar from "../../../../../../_metronic/assets/images/avatar.jpg"
import { useUpdateProfileMutation, useDeleteProfileImageMutation } from 'app/modules/services/profile'
import { checkUserUnauthorized } from '../../../../auth'
import Localization from './Localization'
const imageMimeType = /image\/(png|jpg|jpeg)/i
const profileDetailsSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'First name must be at least 3 characters')
    .required('First name is required')
    .nullable(),

  lastName: Yup.string()
    .min(3, 'Last name must be at least 3 characters')
    .required('Last name is required')
    .nullable(),
  title: Yup.string().min(5, 'Title must be at least 5 characters').nullable(),
  timeZone: Yup.string().required('Time zone is required').nullable(),
  dateFormat: Yup.string().required('Date Format is required').nullable(),
  timeFormat: Yup.string().required('Time Format is required').nullable(),
})

const ProfileDetails = ({ userData }) => {
  const { currentUser, setCurrentUser, saveAuth } = useAuth()
  const [loading, setLoading] = useState(false)
  const [userUpdate, setUserUpdate] = useState(false)
  const [image, setImage] = useState<string | null>(null);
  const [data, setData] = useState<IProfileDetails>(initialValues)
  const [prevImage, setPrevImage] = useState<string>('');
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [updateProfile] = useUpdateProfileMutation()
  const [deleteProfileImage] = useDeleteProfileImageMutation()

  useEffect(() => {
    if (currentUser) {
      if (userData) {
        setCurrentUser(userData?.user)
        setData(userData?.user)
        setImage(userData?.user?.photo)
        formik.setValues({
          image: userData?.user?.photo,
          firstName: userData?.user?.firstName,
          lastName: userData?.user?.lastName,
          title: userData?.user?.title,
          phone: userData?.user?.phone,
          email: userData?.user?.email,
          timeZone: userData?.user?.timeZone,
          dateFormat: userData?.user?.dateFormat,
          timeFormat: userData?.user?.timeFormat,
        })
      }
    }
  }, [userUpdate, userData])

  const changeHandler = (e) => {
    const file = e.target.files[0]
    if (!file.type.match(imageMimeType)) {
      toast.error('This file format is not allowed!')
      return
    } else {
      setFile(file)
    }
  }

  const deleteImage = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e?.preventDefault()
    try {
      const data = await deleteProfileImage('').unwrap()
      if (data?.success) {
        setFileDataURL(null)
        toast.success(data?.message)
      }
    } catch (error: any) {
      if (!error?.data?.success) {
        toast.error(error?.data?.message)
      }
    }
  }

  useEffect(() => {
    if (currentUser) {
      if (userData) {
        setCurrentUser(userData?.user)
        setData(userData?.user)
        setImage(userData?.user?.photo ?? userData?.user?.photo)
        formik.setValues({
          image: userData?.user?.photo,
          firstName: userData?.user?.firstName,
          lastName: userData?.user?.lastName,
          title: userData?.user?.title,
          phone: userData?.user?.phone,
          email: userData?.user?.email,
          timeZone: userData?.user?.timeZone,
          dateFormat: userData?.user?.dateFormat,
          timeFormat: userData?.user?.timeFormat
        });
      }
    }
  }, [userUpdate, userData])

  const formik = useFormik<IProfileDetails>({
    initialValues,
    validationSchema: profileDetailsSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        delete values['email']
        delete values['phone']
        if (values.image === null) {
          delete values['image']
        }
        const formData = new FormData();
        for (const key of Object.keys(values)) {
          if (Object.prototype.hasOwnProperty.call(values, key)) {
            if (values) {
              const value = values[key as keyof IProfileDetails];
              formData.append(key, value);
            }
          }
        }
        const { data }: any = await updateProfile(formData);
        setUserUpdate(true)
        toast.dismiss()
        toast.success(data?.message);
      } catch (error: any) {
        setUserUpdate(false)
        toast.dismiss()
        toast.error(error?.data?.message);
        checkUserUnauthorized(error?.data, saveAuth, setCurrentUser, toast)
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Profile Details</h3>
        </div>
      </div>
      <div id='kt_account_profile_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-lg-9 p-md-7 p-6'>
            <h3 className='card-title mb-4'>
              <span className='me-2 align-middle'>
                <i className='las la-user fs-1' aria-hidden='true'></i>
              </span>
              <span className='card-label fw-bold fs-3 mb-1'>User</span>
            </h3>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Avatar</label>
              <div className='col-lg-8'>
                <div className='image-input image-input-outline' data-kt-image-input='true'>
                  <label htmlFor='photo' className='cursor-pointer'>
                    <img
                      className='image-input-wrapper w-125px h-125px'
                      src={fileDataURL ? fileDataURL : image ? toAbsoluteUrlImage(image) : Avatar}
                      alt='profile'
                      crossOrigin='anonymous'
                    />
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='currentColor'
                      className='w-6 h-6 custom_camera'
                    >
                      <path
                        fill='#b6b9c8'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z'
                      />
                      <path
                        fill='#b6b9c8'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z'
                      />
                    </svg>
                  </label>
                  {image ? (
                    <span onClick={(e) => deleteImage(e)} className='custom-delete'>
                      <i className='las la-trash-alt fs-2'></i>
                    </span>
                  ) : null}
                  <input
                    className='form-control d-none'
                    type='file'
                    name='image'
                    id='photo'
                    accept='.png, .jpg, .jpeg'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      changeHandler(e)
                      formik.setFieldValue(
                        'image',
                        e?.target?.files && e?.target?.files[0]?.type?.match(imageMimeType)
                          ? e.target.files![0]
                          : image
                      )
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Full Name</label>
              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-sm-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='First name'
                      {...formik.getFieldProps('firstName')}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.firstName}</div>
                      </div>
                    )}
                  </div>

                  <div className='col-sm-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid'
                      placeholder='Last name'
                      {...formik.getFieldProps('lastName')}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.lastName}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Title</label>
              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Title'
                  {...formik.getFieldProps('title')}
                />
                {formik.touched.title && formik.errors.title && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.title}</div>
                  </div>
                )}
              </div>
            </div>
            {formik?.values?.phone ? (
              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className='required'>Phone</span>
                </label>
                <div className='col-lg-8 fv-row'>
                  <input
                    type='tel'
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Phone number'
                    {...formik.getFieldProps('phone')}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.phone}</div>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Email</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='tel'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Email Address'
                  {...formik.getFieldProps('email')}
                  disabled
                />
                {formik.touched.email && formik.errors.email && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.email}</div>
                  </div>
                )}
              </div>
            </div>
            <Localization formik={formik} />
          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button type='submit' className='btn btn-primary main-btn-style' disabled={loading}>
              {!loading && 'Save Changes'}
              {loading && (
                <span className='indicator-progress' style={{ display: 'block' }}>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export { ProfileDetails }
