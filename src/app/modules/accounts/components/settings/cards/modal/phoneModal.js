import { useState } from 'react';
import { Modal } from "react-bootstrap"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useVerifyPhoneMutation } from 'app/modules/services/profile';
import VerifyModal from './verifyModal';
import { toast } from 'react-toastify';


const phoneSchema = Yup.object().shape({
    number: Yup.string().trim().min(10, "Number must have at least 10 characters").max(10, "Number must have at max 10 characters").required("Phone number field is required.")
});



const PhoneModal = ({ showPhoneDetail, handlePhoneDetailClose, setVerifyPhone }) => {

    const [updateVerifyPhone, { isLoading }] = useVerifyPhoneMutation()
    const [showOTP, setShowOTP] = useState(false)
    const handleClose = (e) => { e?.preventDefault(); setShowOTP(false) };


    const formik = useFormik({
        initialValues: {
            number: ''
        },
        validationSchema: phoneSchema,
        onSubmit: async (values) => {
            values.number = `+92${values.number}`
            const { data, error } = await updateVerifyPhone(values)
            if (data?.isRequiredOTP) {
                setShowOTP(true)
                handlePhoneDetailClose()
                toast.success(data?.message)
            }
            if (!error?.data?.success) {
                toast.error(error?.data?.message)
            }
        },
    });



    return (
        <>
            <Modal show={showPhoneDetail} onHide={handlePhoneDetailClose}>
                <form onSubmit={formik.handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Verify Your Phone</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group row">
                            <div>
                                <div className="input-group">
                                    <span className="input-group-append">
                                        <select
                                            className="form-select mw-150px mw-md-200px valid form-select-border"
                                            data-val="true"
                                            data-val-number="The field Country code must be a number."
                                            data-val-required="Country code is required."
                                            id="CountryCodeId"
                                            name="CountryCodeId"
                                            defaultValue="92"  // Set the default value to the value of Pakistan
                                        >
                                            {/* <option value="">Country Code</option> */}
                                            <option value="92">Pakistan (+92)</option>
                                        </select>

                                    </span>
                                    <input className="form-control" data-val="true" data-val-length="Maximum length is 10." data-val-length-max="10" data-val-length-min="10" name="number" placeholder="Enter your phone number" type="text" value={formik.values.number} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                </div>
                                <div>
                                    {formik.touched.number && formik.errors.number ? (
                                        <span className={formik.errors.number ? `` : `d-none`}>
                                            <label className="pl-1 text-danger">{formik.errors.number}</label>
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-light-secondary main-btn-style me-2' onClick={handlePhoneDetailClose}>
                            Cancel
                        </button>
                        <button className='btn btn-primary main-btn-style' type='submit' disabled={isLoading}>
                            {!isLoading && 'Verify'}
                            {isLoading && (
                                <span className='indicator-progress' style={{ display: 'block' }}>
                                    Please wait...{' '}
                                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                </span>
                            )}
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
            <VerifyModal showOTP={showOTP} handleClose={handleClose} phoneValue={formik.values} setVerifyPhone={setVerifyPhone} />
        </>
    )
}

export default PhoneModal