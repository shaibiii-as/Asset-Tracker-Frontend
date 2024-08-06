import timezones from 'timezones-list'

const Localization = ({formik}) => {
  return (
    <>
      <h3 className='card-title mb-4'>
        <span className='me-2 align-middle'>
          <i className='las la-globe fs-1' aria-hidden='true'></i>
        </span>
        <span className='card-label fw-bold fs-3 mb-1'>Localization</span>
      </h3>
      <p className='ms-10 mb-5'>
        Adjust the settings to fit your profile, style, and your assets. You can override the
        company’s timezone, date, and time format to view them in your own local format. All
        asset-related events like ‘checkout’, ‘check in’, etc., will be shown in your selected
        timezone, date, and time format.
      </p>
      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Time Zone</label>
        <div className='col-lg-8 fv-row'>
          <select
            className='form-select form-control form-control-solid form-select-solid form-select-lg'
            {...formik.getFieldProps('timeZone')}
          >
            <option value='' selected hidden disabled>
              Select a Time Zone..
            </option>
            {timezones?.map((time) => (
              <option value={time?.label}>{time?.label}</option>
            ))}
          </select>
          {formik.touched.timeZone && formik.errors.timeZone && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>{formik.errors.timeZone}</div>
            </div>
          )}
        </div>
      </div>
      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Date Format</label>
        <div className='col-lg-8 fv-row'>
          <select
            className='form-select form-control form-control-solid form-select-solid form-select-lg'
            {...formik.getFieldProps('dateFormat')}
          >
            <option value='' selected hidden disabled>
              Select a Date Format..
            </option>
            <option value='08/31/2014'>MM/dd/yyyy</option>
            <option value='08-31-2014'>MM-dd-yyyy</option>
            <option value='2014-08-31'>yyyy-MM-dd</option>
            <option value='31 Aug, 2014'>Short - d MMM, yyyy</option>
            <option value='31 August, 2014'>Medium - d MMMM, yyyy</option>
            <option value='Sunday, 31 August, 2014'>Full - dddd, dd MMMM, yyyy</option>
            <option value='31/08/2014'>dd/MM/yyyy</option>
          </select>
          {formik.touched.dateFormat && formik.errors.dateFormat && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>{formik.errors.dateFormat}</div>
            </div>
          )}
        </div>
      </div>
      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Time Format</label>
        <div className='col-lg-8 fv-row'>
          <select
            className='form-select form-control form-control-solid form-select-solid form-select-lg'
            {...formik.getFieldProps('timeFormat')}
          >
            <option value='' selected hidden disabled>
              Select a Time Format
            </option>
            <option value='09:58 PM'>12-hour short - 09:58 PM</option>
            <option value='09:58:30 PM'>12-hour long - 09:58:30 PM</option>
            <option value='21:58'>24-hour short - 21:58</option>
            <option value='21:58:30'>24-hour long - 21:58:30</option>
          </select>
          {formik.touched.timeFormat && formik.errors.timeFormat && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>{formik.errors.timeFormat}</div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Localization
