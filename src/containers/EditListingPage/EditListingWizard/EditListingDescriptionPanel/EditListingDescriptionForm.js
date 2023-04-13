// import React from 'react';
// import { arrayOf, bool, func, shape, string } from 'prop-types';
// import { compose } from 'redux';
// import { Field, Form as FinalForm } from 'react-final-form';
// import arrayMutators from 'final-form-arrays';
// import classNames from 'classnames';

// // Import util modules
// import { intlShape, injectIntl, FormattedMessage } from '../../../../util/reactIntl';
// import { EXTENDED_DATA_SCHEMA_TYPES, propTypes } from '../../../../util/types';
// import { maxLength, required, composeValidators, emailFormatValid } from '../../../../util/validators';

// // Import shared components
// import { Form, Button, FieldSelect, FieldTextInput, Heading, NamedLink } from '../../../../components';
// // Import modules from this directory
// import CustomExtendedDataField from '../CustomExtendedDataField';
// import css from './EditListingDetailsForm.module.css';

// const TITLE_MAX_LENGTH = 60;

// // Show various error messages
// const ErrorMessage = props => {
//   const { fetchErrors } = props;
//   const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {};
//   const errorMessage = updateListingError ? (
//     <FormattedMessage id="EditListingDetailsForm.updateFailed" />
//   ) : createListingDraftError ? (
//     <FormattedMessage id="EditListingDetailsForm.createListingDraftError" />
//   ) : showListingsError ? (
//     <FormattedMessage id="EditListingDetailsForm.showListingFailed" />
//   ) : null;

//   if (errorMessage) {
//     return <p className={css.error}>{errorMessage}</p>;
//   }
//   return null;
// };

// // Hidden input field
// const FieldHidden = props => {
//   const { name } = props;
//   return (
//     <Field id={name} name={name} type="hidden" className={css.unitTypeHidden}>
//       {fieldRenderProps => <input {...fieldRenderProps?.input} />}
//     </Field>
//   );
// };


// // Field component that either allows selecting listing type (if multiple types are available)
// // or just renders hidden fields:
// // - listingType              Set of predefined configurations for each listing type
// // - transactionProcessAlias  Initiate correct transaction against Marketplace API
// // - unitType                 Main use case: pricing unit
// const FieldSelectListingType = props => {
//   const { name, listingTypes, hasExistingListingType, onProcessChange, formApi, intl } = props;
//   const hasMultipleListingTypes = listingTypes?.length > 1;

//   const handleOnChange = value => {
//     const transactionProcessAlias = formApi.getFieldState('transactionProcessAlias')?.value;
//     const selectedListingType = listingTypes.find(config => config.listingType === value);
//     formApi.change('transactionProcessAlias', selectedListingType.transactionProcessAlias);
//     formApi.change('unitType', selectedListingType.unitType);

//     const hasProcessChanged =
//       transactionProcessAlias !== selectedListingType.transactionProcessAlias;
//     if (onProcessChange && hasProcessChanged) {
//       onProcessChange(selectedListingType.transactionProcessAlias);
//     }
//   };

//   return hasMultipleListingTypes && !hasExistingListingType ? (
//     <>
//       <FieldSelect
//         id={name}
//         name={name}
//         className={css.listingTypeSelect}
//         label={intl.formatMessage({ id: 'EditListingDetailsForm.listingTypeLabel' })}
//         validate={required(
//           intl.formatMessage({ id: 'EditListingDetailsForm.listingTypeRequired' })
//         )}
//         onChange={handleOnChange}
//       >
//         <option disabled value="">
//           {intl.formatMessage({ id: 'EditListingDetailsForm.listingTypePlaceholder' })}
//         </option>
//         {listingTypes.map(config => {
//           const type = config.listingType;
//           return (
//             <option key={type} value={type}>
//               {config.label}
//             </option>
//           );
//         })}
//       </FieldSelect>
//       <FieldHidden name="transactionProcessAlias" />
//       <FieldHidden name="unitType" />
//     </>
//   ) : hasMultipleListingTypes && hasExistingListingType ? (
//     <div className={css.listingTypeSelect}>
//       <Heading as="h5" rootClassName={css.selectedLabel}>
//         {intl.formatMessage({ id: 'EditListingDetailsForm.listingTypeLabel' })}
//       </Heading>
//       <p className={css.selectedValue}>{formApi.getFieldState(name)?.value}</p>
//       <FieldHidden name={name} />
//       <FieldHidden name="transactionProcessAlias" />
//       <FieldHidden name="unitType" />
//     </div>
//   ) : (
//     <>
//       <FieldHidden name={name} />
//       <FieldHidden name="transactionProcessAlias" />
//       <FieldHidden name="unitType" />
//     </>
//   );
// };

// // Add collect data for listing fields (both publicData and privateData) based on configuration
// const AddListingFields = props => {
//   const { listingType, listingFieldsConfig = [], intl } = props;
//   const fields = listingFieldsConfig.reduce((pickedFields, fieldConfig) => {
//     const { key, includeForListingTypes, schemaType, scope } = fieldConfig || {};

//     const isKnownSchemaType = EXTENDED_DATA_SCHEMA_TYPES.includes(schemaType);
//     const isTargetProcessAlias =
//       includeForListingTypes == null || includeForListingTypes.includes(listingType);
//     const isProviderScope = ['public', 'private'].includes(scope);

//     return isKnownSchemaType && isTargetProcessAlias && isProviderScope
//       ? [
//           ...pickedFields,
//           <CustomExtendedDataField
//             key={key}
//             name={key}
//             fieldConfig={fieldConfig}
//             defaultRequiredMessage={intl.formatMessage({
//               id: 'EditListingDetailsForm.defaultRequiredMessage',
//             })}
//           />,
//         ]
//       : pickedFields;
//   }, []);

//   return <>{fields}</>;
// };

// // Form that asks title, description, transaction process and unit type for pricing
// // In addition, it asks about custom fields according to marketplace-custom-config.js
// const EditListingDetailsFormComponent = props => (
//   <FinalForm
//     {...props}
//     mutators={{ ...arrayMutators }}
//     render={formRenderProps => {
//       const {
//         autoFocus,
//         className,
//         disabled,
//         ready,
//         formId,
//         form: formApi,
//         handleSubmit,
//         onProcessChange,
//         intl,
//         invalid,
//         pristine,
//         form,
//         selectableListingTypes,
//         hasExistingListingType,
//         saveActionMsg,
//         updated,
//         updateInProgress,
//         fetchErrors,
//         listingFieldsConfig,
//         values,
//       } = formRenderProps;

//       const { listingType } = values;
//       const businessNameMessage = intl.formatMessage({
//         id: 'EditListingDescriptionForm.businessName',
//       });
//       const businessNRequiredMessage = intl.formatMessage({
//         id: 'EditListingDescriptionForm.businessnameRequired',
//       });
//       const abnRequiredMessage = intl.formatMessage({
//         id: 'EditListingDescriptionForm.abnRequired',
//       });

//       const PhoneMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.Phone' });
//       const EmailMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.Email' });
//       const WebsiteMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.Website' });
//       const InstagramMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.Instagram' });
//       const FacebookMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.Facebook' });

//       const emailRequiredMessage = intl.formatMessage({
//         id: 'SignupForm.emailRequired',
//       });
//       const emailRequired = required(emailRequiredMessage);
//       const emailInvalidMessage = intl.formatMessage({
//         id: 'SignupForm.emailInvalid',
//       });
//       const emailValid = emailFormatValid(emailInvalidMessage);
   
//       const titleRequiredMessage = intl.formatMessage({
//         id: 'EditListingDetailsForm.titleRequired',
//       });
//       const maxLengthMessage = intl.formatMessage(
//         { id: 'EditListingDetailsForm.maxLength' },
//         {
//           maxLength: TITLE_MAX_LENGTH,
//         }
//       );
//       const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);

//       const classes = classNames(css.root, className);
//       const submitReady = (updated && pristine) || ready;
//       const submitInProgress = updateInProgress;
//       const submitDisabled = invalid || disabled || submitInProgress;

//       return (
//         <Form className={classes} onSubmit={handleSubmit}>
//           <ErrorMessage fetchErrors={fetchErrors} />
//           <FieldTextInput
//             id="businessName"
//             name="businessName"
//             className={css.inputBox}
//             type="text"
//             label={businessNameMessage}
//             // maxLength={TITLE_MAX_LENGTH}
//             validate={composeValidators(required(businessNRequiredMessage), maxLength60Message)}
//             autoFocus
//             required
//           />
//            <FieldTextInput
//             id="abn"
//             name="abn"
//             className={css.inputBox}
//             label={PhoneMessage}
//             validate={required(abnRequiredMessage)}
//             />
//           <FieldTextInput
//             id="email"
//             name="email"
//             className={css.inputBox}
//             type="email"
//             label={EmailMessage}
//             validate={composeValidators(emailRequired, emailValid)}
//             />
//           <FieldTextInput
//             id="website"
//             name="website"
//             className={css.inputBox}
//             type="text"
//             label={WebsiteMessage}
//            />
//           <FieldTextInput
//             id="instagram"
//             name="instagram"
//             className={css.inputBox}
//             type="text"
//             label={InstagramMessage}
//            />
//           <FieldTextInput
//             id="facebook"
//             name="facebook"
//             className={css.inputBox}
//             type="text"
//             label={FacebookMessage}
//            />
//           <div className={css.fixedBottomFooter}>
//             <div className={css.fixedWidthContainer}>
//               <NamedLink name="LandingPage"><Button className={css.cancelButton} type="button" onClick={() => form.reset()}>
//                 Cancel
//               </Button></NamedLink>
//               <span className={css.stepNumber}>Step 1 of 7</span>
//               <Button
//                 className={css.submitButton}
//                 type="submit"
//                 inProgress={submitInProgress}
//                 disabled={submitDisabled}
//                 // ready={submitReady}
//               >
//                 {saveActionMsg}
//               </Button>
//             </div>
//           </div>
//           {/* <FieldTextInput
//             id={`${formId}title`}
//             name="title"
//             className={css.title}
//             type="text"
//             label={intl.formatMessage({ id: 'EditListingDetailsForm.title' })}
//             placeholder={intl.formatMessage({ id: 'EditListingDetailsForm.titlePlaceholder' })}
//             maxLength={TITLE_MAX_LENGTH}
//             validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
//             autoFocus={autoFocus}
//           />

//           <FieldTextInput
//             id={`${formId}description`}
//             name="description"
//             className={css.description}
//             type="textarea"
//             label={intl.formatMessage({ id: 'EditListingDetailsForm.description' })}
//             placeholder={intl.formatMessage({
//               id: 'EditListingDetailsForm.descriptionPlaceholder',
//             })}
//             validate={required(
//               intl.formatMessage({
//                 id: 'EditListingDetailsForm.descriptionRequired',
//               })
//             )}
//           />


//           <FieldSelectListingType
//             name="listingType"
//             listingTypes={selectableListingTypes}
//             hasExistingListingType={hasExistingListingType}
//             onProcessChange={onProcessChange}
//             formApi={formApi}
//             intl={intl}
//           />

//           <AddListingFields
//             listingType={listingType}
//             listingFieldsConfig={listingFieldsConfig}
//             intl={intl}
//           />

//           <Button
//             className={css.submitButton}
//             type="submit"
//             inProgress={submitInProgress}
//             disabled={submitDisabled}
//             ready={submitReady}
//           >
//             {saveActionMsg}
//           </Button> */}
//         </Form>
//       );
//     }}
//   />
// );

// EditListingDetailsFormComponent.defaultProps = {
//   className: null,
//   formId: 'EditListingDetailsForm',
//   fetchErrors: null,
//   onProcessChange: null,
//   hasExistingListingType: false,
//   listingFieldsConfig: null,
// };

// EditListingDetailsFormComponent.propTypes = {
//   className: string,
//   formId: string,
//   intl: intlShape.isRequired,
//   onSubmit: func.isRequired,
//   onProcessChange: func,
//   saveActionMsg: string.isRequired,
//   disabled: bool.isRequired,
//   ready: bool.isRequired,
//   updated: bool.isRequired,
//   updateInProgress: bool.isRequired,
//   fetchErrors: shape({
//     createListingDraftError: propTypes.error,
//     showListingsError: propTypes.error,
//     updateListingError: propTypes.error,
//   }),
//   selectableListingTypes: arrayOf(
//     shape({
//       listingType: string.isRequired,
//       transactionProcessAlias: string.isRequired,
//       unitType: string.isRequired,
//     })
//   ).isRequired,
//   hasExistingListingType: bool,
//   listingFieldsConfig: propTypes.listingFieldsConfig,
// };

// export default compose(injectIntl)(EditListingDetailsFormComponent);



import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import { maxLength, required, composeValidators, emailFormatValid } from '../../../../util/validators';
import { EXTENDED_DATA_SCHEMA_TYPES, propTypes } from '../../../../util/types';

import { Form, Button, FieldSelect, FieldTextInput, Heading, NamedLink } from '../../../../components';

import {FormattedMessage, injectIntl, intlShape } from '../../../../util/reactIntl';
import css from './EditListingDescriptionForm.module.css';


const TITLE_MAX_LENGTH = 60;

const EditListingDescriptionFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        className,
        disabled,
        ready,
        handleSubmit,
        intl,
        form,
        values,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        setResetForm,
        publicData,
      } = formRenderProps;

      const businessNameMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.businessName',
      });
      const businessNRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.businessnameRequired',
      });
      const abnRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.abnRequired',
      });
      const maxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const PhoneMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.Phone' });
      const EmailMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.Email' });
      const WebsiteMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.Website' });
      const InstagramMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.Instagram' });
      const FacebookMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.Facebook' });

      const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);
      const emailRequiredMessage = intl.formatMessage({
        id: 'SignupForm.emailRequired',
      });
      const emailRequired = required(emailRequiredMessage);
      const emailInvalidMessage = intl.formatMessage({
        id: 'SignupForm.emailInvalid',
      });
      const emailValid = emailFormatValid(emailInvalidMessage);

      const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {};
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.updateFailed" />
        </p>
      ) : null;

      // This error happens only on first tab (of EditListingWizard)
      const errorMessageCreateListingDraft = createListingDraftError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.createListingDraftError" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.showListingFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      const containsSameValues =
        publicData &&
        publicData.businessName == values.businessName &&
        publicData.phone == values.phone &&
        publicData.email == values.email;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageCreateListingDraft}
          {errorMessageUpdateListing}
          {errorMessageShowListing}
          <FieldTextInput
            id="businessName"
            name="businessName"
            className={css.inputBox}
            type="text"
            label={businessNameMessage}
            // maxLength={TITLE_MAX_LENGTH}
            validate={composeValidators(required(businessNRequiredMessage), maxLength60Message)}
            autoFocus
            required
          />
          <FieldTextInput
            id="abn"
            name="abn"
            className={css.inputBox}
            label={PhoneMessage}
            validate={required(abnRequiredMessage)}
            />
          <FieldTextInput
            id="email"
            name="email"
            className={css.inputBox}
            type="email"
            label={EmailMessage}
            validate={composeValidators(emailRequired, emailValid)}
            />
          <FieldTextInput
            id="website"
            name="website"
            className={css.inputBox}
            type="text"
            label={WebsiteMessage}
           />
          <FieldTextInput
            id="instagram"
            name="instagram"
            className={css.inputBox}
            type="text"
            label={InstagramMessage}
           />
          <FieldTextInput
            id="facebook"
            name="facebook"
            className={css.inputBox}
            type="text"
            label={FacebookMessage}
           />
          <div className={css.fixedBottomFooter}>
            <div className={css.fixedWidthContainer}>
              <NamedLink name="LandingPage"><Button className={css.cancelButton} type="button" onClick={() => form.reset()}>
                Cancel
              </Button></NamedLink>
              <span className={css.stepNumber}>Step 1 of 7</span>
              <Button
                className={css.submitButton}
                type="submit"
                inProgress={submitInProgress}
                disabled={submitDisabled}
                // ready={submitReady}
              >
                {saveActionMsg}
              </Button>
            </div>
          </div>
        </Form>
      );
    }}
  />
);

EditListingDescriptionFormComponent.defaultProps = { className: null, fetchErrors: null };

EditListingDescriptionFormComponent.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    createListingDraftError: propTypes.error,
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

export default compose(injectIntl)(EditListingDescriptionFormComponent);
