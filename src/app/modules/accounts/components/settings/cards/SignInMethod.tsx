/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { KTSVG } from '../../../../../../_metronic/helpers'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { changePassword } from '../../../../auth/core/_requests'
import { IUpdatePassword, IUpdateEmail, updatePassword, updateEmail } from '../SettingsModel'
import { toast } from 'react-toastify'
import { checkUserUnauthorized } from 'app/modules/auth'
import { useAuth } from 'app/modules/auth'

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
const passwordFormValidationSchema = Yup.object().shape({
	currentPassword: Yup.string()
		.min(8, 'Password must be at least 8 characters')
		.max(50, 'Password must not exceed 50 characters')
		.matches(
			passwordRegex,
			'Password must include at least one uppercase letter, one lowercase letter, one number, and one symbol'
		)
		.required('Password is required'),
	newPassword: Yup.string()
		.min(8, 'Password must be at least 8 characters')
		.max(50, 'Password must not exceed 50 characters')
		.matches(
			passwordRegex,
			'Password must include at least one uppercase letter, one lowercase letter, one number, and one symbol'
		)
		.required('Password is required'),
	passwordConfirmation: Yup.string()
		.min(8, 'Password must be at least 8 characters')
		.max(50, 'Password must not exceed 50 characters')
		.matches(
			passwordRegex,
			'Password must include at least one uppercase letter, one lowercase letter, one number, and one symbol'
		)
		.required('Password is required')
		.oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
})

const SignInMethod: React.FC = () => {
	const [passwordUpdateData, setPasswordUpdateData] = useState<IUpdatePassword>(updatePassword)
	const [showPasswordForm, setPasswordForm] = useState<boolean>(false)
	const [loading2, setLoading2] = useState(false)
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showConfirmNewPasswordPassword, setShowConfirmNewPasswordPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const { saveAuth, setCurrentUser } = useAuth()
	const formik2 = useFormik<IUpdatePassword>({
		initialValues: {
			...passwordUpdateData,
		},
		validationSchema: passwordFormValidationSchema,
		onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
			toast.dismiss()
			setLoading2(true)
			try {
				const { data: auth } = await changePassword(
					values.currentPassword,
					values.newPassword,
					values.passwordConfirmation
				)
				setLoading2(false)
				toast.success("Updated successfully");
				resetForm();
			} catch (error: any) {
				setLoading2(false)
				toast.error(error?.response?.data?.message);
				checkUserUnauthorized(error?.response?.data, saveAuth, setCurrentUser, toast)
			}
		},
	})

	return (
		<div className='card mb-5 mb-xl-10'>
			<div
				className='card-header border-0'
			>
				<div className='card-title m-0'>
					<h3 className='fw-bolder m-0'>Change Password</h3>
				</div>
			</div>

			<div id='kt_account_signin_method' className='collapse show'>
				<div className='card-body border-top p-lg-9 p-md-7 p-6'>
					<div className='d-flex flex-wrap align-items-center'>
						<div id='kt_signin_password' className={' ' + (showPasswordForm && 'd-none')}>
							<div className='fs-6 fw-bolder mb-1'>Password</div>
							<div className='fw-bold text-gray-600'>************</div>
						</div>
						<div
							id='kt_signin_password_edit'
							className={'flex-row-fluid ' + (!showPasswordForm && 'd-none')}
						>
							<form
								onSubmit={formik2.handleSubmit}
								id='kt_signin_change_password'
								className='form'
								noValidate
							>
								<div className='row mb-1'>
									<div className='col-lg-4'>
										<div className='fv-row mb-0'>
											<label htmlFor='currentpassword' className='form-label fs-6 fw-bolder mb-3'>
												Current Password
											</label>
											<div>
												<input
													type={showCurrentPassword ? 'text' : 'password'}
													placeholder='Current Password'
													className='form-control form-control-lg form-control-solid '
													id='currentpassword'
													{...formik2.getFieldProps('currentPassword')}
												/>
											</div>
											<span className='eyes'
												onClick={() => setShowCurrentPassword(!showCurrentPassword)}
											>
												{showCurrentPassword ? (
													<i className='bi bi-eye-slash'></i>
												) : (
													<i className='bi bi-eye'></i>
												)}
											</span>
											{formik2.touched.currentPassword && formik2.errors.currentPassword && (
												<div className='fv-plugins-message-container'>
													<div className='fv-help-block'>{formik2.errors.currentPassword}</div>
												</div>
											)}
										</div>
									</div>

									<div className='col-lg-4'>
										<div className='fv-row mb-0'>
											<label htmlFor='newpassword' className='form-label fs-6 fw-bolder mb-3'>
												New Password
											</label>
											<div>
												<input
													type={showNewPassword ? 'text' : 'password'}
													placeholder='New Password'
													className='form-control form-control-lg form-control-solid '
													id='newpassword'
													{...formik2.getFieldProps('newPassword')}
												/>
											</div>
											<span className='eyes'
												onClick={() => setShowNewPassword(!showNewPassword)}
											>
												{showNewPassword ? (
													<i className='bi bi-eye-slash'></i>
												) : (
													<i className='bi bi-eye'></i>
												)}
											</span>
											{formik2.touched.newPassword && formik2.errors.newPassword && (
												<div className='fv-plugins-message-container'>
													<div className='fv-help-block'>{formik2.errors.newPassword}</div>
												</div>
											)}
										</div>
									</div>
									<div className='col-lg-4'>
										<div className='fv-row mb-0'>
											<label htmlFor='confirmpassword' className='form-label fs-6 fw-bolder mb-3'>
												Confirm New Password
											</label>
											<div>
												<input
													type={showConfirmNewPasswordPassword ? 'text' : 'password'}
													placeholder='Confirm New Password'
													className='form-control form-control-lg form-control-solid '
													id='confirmpassword'
													{...formik2.getFieldProps('passwordConfirmation')}
												/>
											</div>
											<span className='eyes'
												onClick={() => setShowConfirmNewPasswordPassword(!showConfirmNewPasswordPassword)}
											>
												{showConfirmNewPasswordPassword ? (
													<i className='bi bi-eye-slash'></i>
												) : (
													<i className='bi bi-eye'></i>
												)}
											</span>
											{formik2.touched.passwordConfirmation && formik2.errors.passwordConfirmation && (
												<div className='fv-plugins-message-container'>
													<div className='fv-help-block'>{formik2.errors.passwordConfirmation}</div>
												</div>
											)}
										</div>
									</div>
								</div>

								<div className='form-text mb-5'>
									Password must be at least 8 character and contain symbols
								</div>
								<div className='d-flex justify-content-end py-4'>
									<button
										onClick={() => {
											setPasswordForm(false)
										}}
										id='kt_password_cancel'
										type='button'
										className='btn btn-light-secondary main-btn-style me-2'
									>
										Cancel
									</button>
									<button
										id='kt_password_submit'
										type='submit'
										className='btn btn-primary'
										disabled={
											!formik2.errors.currentPassword &&
												!formik2.errors.newPassword &&
												!formik2.errors.passwordConfirmation
												? false
												: true
										}
									>
										{!loading2 && 'Update Password'}
										{loading2 && (
											<span className='indicator-progress' style={{ display: 'block' }}>
												Please wait...{' '}
												<span className='spinner-border spinner-border-sm align-middle ms-2'></span>
											</span>
										)}
									</button>
								</div>
							</form>
						</div>
						<div
							id='kt_signin_password_button'
							className={'ms-auto ' + (showPasswordForm && 'd-none')}
						>
							<button
								onClick={() => {
									setPasswordForm(true)
								}}
								className='btn btn-light-primary'
							>
								Reset Password
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export { SignInMethod }
