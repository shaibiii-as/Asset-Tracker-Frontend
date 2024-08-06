import React, { useEffect, useState } from 'react';
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useUpdateTwoFactorMutation } from 'app/modules/services/profile';
import { toast } from 'react-toastify';
import PhoneModal from './modal/phoneModal';
import SplashScreen from 'app/SplashScreen';


const TwoFactorSchema = Yup.object().shape({
    emailOTP: Yup.boolean().required(),
    phoneOTP: Yup.boolean().required()
})

const initialValues = {
    emailOTP: false,
    phoneOTP: false
}


const TwoFactorAuth = ({ userData, setLoader }) => {


    const [updateTwoFactor, { isLoading }] = useUpdateTwoFactorMutation()
    const [verifyPhone, setVerifyPhone] = useState(true)
    const [showPhoneDetail, setShowPhoneDetail] = useState(false);

    const handlePhoneDetailClose = (e: any) => { e?.preventDefault(); setShowPhoneDetail(false) };
    const handlePhoneDetailShow = () => setShowPhoneDetail(true);

    useEffect(() => {
        if (userData) {
            formik.setValues({
                emailOTP: userData?.user?.emailOTP,
                phoneOTP: userData?.user?.phoneOTP
            });
        }
    }, [userData])

    const formik = useFormik({
        initialValues,
        validationSchema: TwoFactorSchema,
        onSubmit: async (values) => {
            // setLoader(true)
            const data = await updateTwoFactor(values).unwrap()
            // setLoader(false)
            setVerifyPhone(data?.isPhone)
            if (data?.success) {
                if (data?.hasOwnProperty('isPhone')) {
                    if (data?.isPhone) {
                        toast.dismiss()
                        toast.success(data?.message)
                    }
                } else {
                    toast.dismiss()
                    toast.success(data?.message)
                }
            } else {
                toast.dismiss()
                toast.error(data?.message)
            }
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, formik: any, bool: boolean) => {
        formik.setFieldValue(e.target.name, bool)
        formik.handleSubmit()
    }

    return (
        <>
            <SplashScreen isLoadingTemplate={isLoading} />
            {!isLoading ?
                <>
                    <div className='card mb-5 mb-xl-10'>
                        <div
                            className='card-header border-0'
                        // role='button'
                        // data-bs-toggle='collapse'
                        // data-bs-target='#kt_two-factor-authentication'
                        // aria-expanded='true'
                        // aria-controls='kt_two-factor-authentication'
                        >
                            <div className='card-title m-0'>
                                <h3 className='fw-bolder m-0'>Two Factor Authentication</h3>
                            </div>
                        </div>
                        <div id='kt_two-factor-authentication' className='collapse show'>
                            <form onSubmit={formik.handleSubmit}>
                                <div className='card-body border-top p-lg-9 p-md-7 p-6'>
                                    <p>This operation will increase your account security by adding one more level of security.</p>
                                    <div className='row mb-1'>
                                        <div className="col-lg-3">
                                            <p className='mb-0 fw-bolder col-form-label'>Send OTP to Email:</p>
                                        </div>
                                        <div className="col-lg-9">
                                            <div className="radio-inline standard_radio_can_hide hasLicense_radio col-form-label ms-2">
                                                <label className="radio mb-0 p_16">
                                                    <input
                                                        name="emailOTP"
                                                        type="radio"
                                                        className="m_5 custom-form-check-input form-check-input sig_input"
                                                        checked={formik?.values?.emailOTP}
                                                        onChange={(e) => handleChange(e, formik, true)}
                                                    />
                                                    Yes
                                                </label>
                                                <label className="radio mb-0">
                                                    <input
                                                        name="emailOTP"
                                                        type="radio"
                                                        className="m_5 custom-form-check-input form-check-input sig_input"
                                                        checked={!formik?.values?.emailOTP}
                                                        onChange={(e) => handleChange(e, formik, false)}
                                                    />
                                                    No
                                                </label>
                                            </div>
                                            {formik?.values?.emailOTP && (
                                                <p>You will receive an OTP at your registered email address.</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className='row mb-1'>
                                        <div className="col-lg-3">
                                            <p className='mb-0 fw-bolder col-form-label'>Send OTP to Phone:</p>
                                        </div>
                                        <div className="col-lg-9">
                                            <div className="radio-inline standard_radio_can_hide hasLicense_radio col-form-label ms-2">
                                                <label className="radio mb-0 p_16">
                                                    <input
                                                        name="phoneOTP"
                                                        type="radio"
                                                        className="m_5 custom-form-check-input form-check-input sig_input"
                                                        checked={formik?.values?.phoneOTP}
                                                        onChange={(e) => handleChange(e, formik, true)}
                                                    />
                                                    Yes
                                                </label>
                                                <label className="radio mb-0">
                                                    <input
                                                        name="phoneOTP"
                                                        type="radio"
                                                        className="m_5 custom-form-check-input form-check-input sig_input"
                                                        checked={!formik?.values?.phoneOTP}
                                                        onChange={(e) => handleChange(e, formik, false)}
                                                    />
                                                    No
                                                </label>
                                            </div>
                                            {verifyPhone === false ? (
                                                <div>
                                                    <p className='mb-3'>You have not verified your phone number. We won't send OTP untill you verify your phone number.</p>
                                                    <button className='btn btn-light-primary main-btn-style mb-3' onClick={handlePhoneDetailShow}>Verify Phone</button>
                                                    <p className='mb-3'>Due to some technical restriction, OTP to phone is limited to Pakistan only. However you will receive an OTP to verified email.</p>
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <PhoneModal showPhoneDetail={showPhoneDetail} handlePhoneDetailClose={handlePhoneDetailClose} setVerifyPhone={setVerifyPhone} />
                </>
                : null}
        </>
    );
};

export { TwoFactorAuth };
