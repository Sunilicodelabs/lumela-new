// import React, { Component } from 'react';
// import { array, bool, func, shape, string } from 'prop-types';
// import { compose } from 'redux';
// import { Form as FinalForm, Field } from 'react-final-form';
// // import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
// import isEqual from 'lodash/isEqual';
// import classNames from 'classnames';
// import {
//   nonEmptyArray,
//   composeValidators,
//   autocompleteSearchRequired,
//   autocompletePlaceSelected,
// } from '../../../../util/validators';
// import { isUploadImageOverLimitError } from '../../../../util/errors';
// import {
//   Avatar,
//   Button,
//   FieldTextInput,
//   Form,
//   IconEdit,
//   IconSpinner,
//   ImageFromFile,
//   NamedLink,
//   ResponsiveImage,
//   FieldLocationAutocompleteInput,
//   ValidationError,
// } from '../../../../components';


// import css from './EditListingPhotosForm.module.css';
// import { FormattedMessage, injectIntl } from 'react-intl';
// import { intlShape } from '../../../../util/reactIntl';
// import { propTypes } from '../../../../util/types';
// import IconCamera from '../../../../components/IconCamera/IconCamera';
// import IconCollection from '../../../../components/IconCollection/IconCollection';
// import AddImages from '../../../../components/AddImages/AddImages';


// const ACCEPT_IMAGES = 'image/*';
// const identity = v => v;

// export class EditListingPhotosFormComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { mainImageUploadRequested: false, imageUploadRequested: false };
//     this.onImageUploadHandler = this.onImageUploadHandler.bind(this);
//     this.submittedImages = [];
//   }

//   onImageUploadHandler(file, imageType) {
//     if (file) {
//       if (imageType) {
//         this.setState({ mainImageUploadRequested: true });
//       } else {
//         this.setState({ imageUploadRequested: true });
//       }
//       this.props
//         .onImageUpload({ id: `${file.name}_${Date.now()}`, file }, imageType)
//         .then(() => {
//           if (imageType) {
//             this.setState({ mainImageUploadRequested: false });
//           } else {
//             this.setState({ imageUploadRequested: false });
//           }
//         })
//         .catch(() => {
//           if (imageType) {
//             this.setState({ mainImageUploadRequested: false });
//           } else {
//             this.setState({ imageUploadRequested: false });
//           }
//         });
//     }
//   }

//   render() {
//     return (
//       <FinalForm
//         {...this.props}
//         keepDirtyOnReinitialize={true}
//         onImageUploadHandler={this.onImageUploadHandler}
//         imageUploadRequested={this.state.imageUploadRequested}
//         mainImageUploadRequested={this.state.mainImageUploadRequested}
//         initialValues={{
//           images: this.props.images,
//           description: this.props.description,
//           location: this.props.location.location,
//         }}
//         render={formRenderProps => {
//           const {
//             form,
//             className,
//             fetchErrors,
//             handleSubmit,
//             images,
//             intl,
//             invalid,
//             imageUploadRequested,
//             mainImageUploadRequested,
//             onImageUploadHandler,
//             onRemoveImage,
//             disabled,
//             ready,
//             saveActionMsg,
//             updated,
//             mainImage,
//             onPrevious,
//             values,
//             publicData,
//             updateInProgress,
//           } = formRenderProps;
//           const {businessName}=publicData||{};
//           const addressRequiredMessage = intl.formatMessage({
//             id: 'EditListingLocationForm.addressRequired',
//           });
//           const addressNotRecognizedMessage = intl.formatMessage({
//             id: 'EditListingLocationForm.addressNotRecognized',
//           });

//           const chooseImageText = (
//             <span className={css.chooseImageText}>
//               <IconCamera />
//               <span className={css.chooseImage}>
//                 <FormattedMessage id="EditListingPhotosForm.chooseImage" />
//               </span>
//               {/* <span className={css.imageTypes}>
//                 <FormattedMessage id="EditListingPhotosForm.imageTypes" />
//               </span> */}
//             </span>
//           );
//           const addMainPhoto = (
//             <span className={css.chooseImageText}>
//               <IconCamera />
//               <span className={css.chooseImage}>
//                 <FormattedMessage id="EditListingPhotosForm.chooseMainImage" />
//               </span>
//               {/* <span className={css.imageTypes}>
//                 <FormattedMessage id="EditListingPhotosForm.imageTypes" />
//               </span> */}
//             </span>
//           );

//           const imageRequiredMessage = intl.formatMessage({
//             id: 'EditListingPhotosForm.imageRequired',
//           });

//           const { publishListingError, showListingsError, updateListingError, uploadImageError } =
//             fetchErrors || {};
//           const uploadOverLimit = isUploadImageOverLimitError(uploadImageError);

//           // Main image for what
//           const uploadingOverlay = mainImageUploadRequested ? (
//             <div className={css.uploadingImageOverlay}>
//               <IconSpinner />
//             </div>
//           ) : null;

//           const hasUploadError = !!uploadImageError && !mainImageUploadRequested;
//           const errorClasses = classNames({ [css.avatarUploadError]: hasUploadError });

//           // Ensure that file exists if imageFromFile is used
//           const fileExists = !!(mainImage && mainImage.file);
//           const fileUploadInProgress = mainImageUploadRequested && fileExists;
//           const delayAfterUpload = mainImage && mainImage.imageId;
//           const imageFromFile = !fileUploadInProgress ? (
//             <ImageFromFile
//               id={mainImage.id}
//               className={errorClasses}
//               rootClassName={css.uploadingImage}
//               aspectRatioClassName={css.squareAspectRatio}
//               file={mainImage.file}
//             >
//               {uploadingOverlay}
//             </ImageFromFile>
//           ) : null;

//           // Avatar is rendered in hidden during the upload delay
//           // Upload delay smoothes image change process:
//           // responsive img has time to load srcset stuff before it is shown to user.

//           const avatarComponent =
//             !mainImageUploadRequested && mainImage && mainImage.id && mainImage.id.uuid ? (
//               <ResponsiveImage
//                 rootClassName={css.avatarImage}
//                 alt={mainImage.id.uuid}
//                 image={mainImage}
//                 variants={['landscape-crop', 'landscape-crop2x']}
//                 sizes={'(max-width: 767px) 96px, 240px'}
//               />
//             ) : null;

//           const chooseAvatarLabel =
//             mainImage &&
//             ((mainImage.id && mainImage.id.uuid) || mainImage.imageId || fileUploadInProgress) ? (
//               <div className={css.avatarContainer}>
//                 {mainImage.imageId ? imageFromFile : avatarComponent}
//                 <div className={css.changeAvatar}>
//                   {/* <FormattedMessage id="ProfileSettingsForm.changeAvatar" /> */}
//                   <IconEdit />
//                 </div>
//               </div>
//             ) : (
//               <div className={css.avatarPlaceholder}>
//                 <IconCamera />
//                 <div className={css.avatarPlaceholderText}>
//                   <FormattedMessage id="EditListingPhotosForm.addYourMainPicture" />
//                 </div>
//                 {/* <div className={css.avatarPlaceholderTextMobile}>
//                   <FormattedMessage id="EditListingPhotosForm.addYourMainPictureMobile" />
//                 </div> */}
//               </div>
//             );

//           let uploadImageFailed = null;

//           if (uploadOverLimit) {
//             uploadImageFailed = (
//               <p className={css.error}>
//                 <FormattedMessage id="EditListingPhotosForm.imageUploadFailed.uploadOverLimit" />
//               </p>
//             );
//           } else if (uploadImageError) {
//             uploadImageFailed = (
//               <p className={css.error}>
//                 <FormattedMessage id="EditListingPhotosForm.imageUploadFailed.uploadFailed" />
//               </p>
//             );
//           }

//           // NOTE: These error messages are here since Photos panel is the last visible panel
//           // before creating a new listing. If that order is changed, these should be changed too.
//           // Create and show listing errors are shown above submit button
//           const publishListingFailed = publishListingError ? (
//             <p className={css.error}>
//               <FormattedMessage id="EditListingPhotosForm.publishListingFailed" />
//             </p>
//           ) : null;
//           const showListingFailed = showListingsError ? (
//             <p className={css.error}>
//               <FormattedMessage id="EditListingPhotosForm.showListingFailed" />
//             </p>
//           ) : null;

//           const submittedOnce = this.submittedImages.length > 0;
//           // imgs can contain added images (with temp ids) and submitted images with uniq ids.
//           const arrayOfImgIds = imgs =>
//             imgs.map(i => (typeof i.id === 'string' ? i.imageId : i.id));
//           const imageIdsFromProps = arrayOfImgIds(images);
//           const imageIdsFromPreviousSubmit = arrayOfImgIds(this.submittedImages);
//           const imageArrayHasSameImages = isEqual(imageIdsFromProps, imageIdsFromPreviousSubmit);
//           const pristineSinceLastSubmit = submittedOnce && imageArrayHasSameImages;

//           const submitReady = (updated && pristineSinceLastSubmit) || ready;
//           const submitInProgress = updateInProgress;
//           const submitDisabled =
//             invalid ||
//             disabled ||
//             submitInProgress ||
//             imageUploadRequested ||
//             mainImageUploadRequested ||
//             ready;

//           const classes = classNames(css.root, className);
//           return (
//             <Form
//               className={classes}
//               onSubmit={e => {
//                 this.submittedImages = images;
//                 handleSubmit(e);
//               }}
//             >
//               {updateListingError ? (
//                 <p className={css.error}>
//                   <FormattedMessage id="EditListingPhotosForm.updateFailed" />
//                 </p>
//               ) : null}

//               <div className={css.sectionContainer}>
//                 {/* <h3 className={css.sectionTitle}>
//                   <FormattedMessage id="ProfileSettingsForm.yourProfilePicture" />
//                 </h3> */}
//                 {mainImage ? null : (
//                   <Field
//                     accept={ACCEPT_IMAGES}
//                     id="mainImage"
//                     name="mainImage"
//                     label={chooseAvatarLabel}
//                     type="file"
//                     form={null}
//                     uploadImageError={uploadImageError}
//                     disabled={fileUploadInProgress}
//                   >
//                     {fieldProps => {
//                       const { accept, id, input, label, disabled, uploadImageError } = fieldProps;
//                       const { name, type } = input;
//                       const onChange = e => {
//                         const file = e.target.files[0];
//                         form.change(`mainImage`, file);
//                         form.blur(`mainImage`);
//                         if (file != null) {
//                           const tempId = `${file.name}_${Date.now()}`;
//                           onImageUploadHandler(file, 'main');
//                         }
//                       };

//                       let error = null;

//                       if (isUploadImageOverLimitError(uploadImageError)) {
//                         error = (
//                           <div className={css.error}>
//                             <FormattedMessage id="ProfileSettingsForm.imageUploadFailedFileTooLarge" />
//                           </div>
//                         );
//                       } else if (uploadImageError) {
//                         error = (
//                           <div className={css.error}>
//                             <FormattedMessage id="ProfileSettingsForm.imageUploadFailed" />
//                           </div>
//                         );
//                       }

//                       return (
//                         <div className={css.uploadAvatarWrapper}>
//                           <label className={css.label} htmlFor={id}>
//                             {label}
//                           </label>
//                           <input
//                             accept={accept}
//                             id={id}
//                             name={name}
//                             className={css.uploadAvatarInput}
//                             disabled={disabled}
//                             onChange={onChange}
//                             type={type}
//                           />
//                           {error}
//                         </div>
//                       );
//                     }}
//                   </Field>
//                 )}
//                 <Field
//                   accept={ACCEPT_IMAGES}
//                   id="mainImage"
//                   name="mainImage"
//                   label={chooseAvatarLabel}
//                   type="file"
//                   form={null}
//                   uploadImageError={uploadImageError}
//                   disabled={fileUploadInProgress}
//                 >
//                   {fieldProps => {
//                     const { accept, id, input, label, disabled, uploadImageError } = fieldProps;
//                     const { name, type } = input;
//                     const onChange = e => {
//                       const file = e.target.files[0];
//                       form.change(`mainImage`, file);
//                       form.blur(`mainImage`);
//                       if (file != null) {
//                         const tempId = `${file.name}_${Date.now()}`;
//                         onImageUploadHandler(file, 'main');
//                       }
//                     };

//                     let error = null;

//                     if (isUploadImageOverLimitError(uploadImageError)) {
//                       error = (
//                         <div className={css.error}>
//                           <FormattedMessage id="ProfileSettingsForm.imageUploadFailedFileTooLarge" />
//                         </div>
//                       );
//                     } else if (uploadImageError) {
//                       error = (
//                         <div className={css.error}>
//                           <FormattedMessage id="ProfileSettingsForm.imageUploadFailed" />
//                         </div>
//                       );
//                     }

//                     return (
//                       <div className={css.uploadAvatarWrapper}>
//                         <label className={classNames(css.label, css.mainPhotoLabel)} htmlFor={id}>
//                           {label}
//                         </label>
//                         <input
//                           accept={accept}
//                           id={id}
//                           name={name}
//                           className={css.uploadAvatarInput}
//                           disabled={disabled}
//                           onChange={onChange}
//                           type={type}
//                         />
//                         {error}
//                       </div>
//                     );
//                   }}
//                 </Field>
//               </div>
//               {uploadImageFailed}
//               <div className={css.hairByContents}>
//                 <h3>
//                   <FormattedMessage id="EditListingPhotosForm.text" />{" "}{businessName}
//                 </h3>
//                 <p className={css.hairByEmail}>@ enquire@hairbyalexir.com</p>
//               </div>

//               <div className={css.locationDescription}>
//                 <FieldLocationAutocompleteInput
//                   className={css.locationAddress}
//                   inputClassName={css.locationAutocompleteInput}
//                   iconClassName={css.locationAutocompleteInputIcon}
//                   predictionsClassName={css.predictionsRoot}
//                   validClassName={css.validLocation}
//                   name="location"
//                   label={'Location'}
//                   placeholder={''}
//                   useDefaultPredictions={false}
//                   format={identity}
//                   valueFromForm={values.location}
//                   validate={composeValidators(
//                     autocompleteSearchRequired(addressRequiredMessage),
//                     autocompletePlaceSelected(addressNotRecognizedMessage)
//                   )}
//                 />

//                 <FieldTextInput
//                   className={css.building}
//                   type="textarea"
//                   name="description"
//                   id="description"
//                   label={'Description'}
//                   placeholder={''}
//                 />
//                 <h6>Gallery Photos</h6>
//               </div>
//             <div className={css.gallaryContainer}>
//             <div className={css.imagesGallaryGrid}>
//                 <AddImages
//                   className={classNames(css.imagesField, images.length == 1 && css.imagesField1, images.length == 2 && css.imagesField2, images.length == 3 && css.imagesField3)}
//                   images={images}
//                   thumbnailClassName={css.thumbnail}
//                   savedImageAltText={intl.formatMessage({
//                     id: 'EditListingPhotosForm.savedImageAltText',
//                   })}
//                   onRemoveImage={onRemoveImage}
//                 >
//                     <Field
//                     id="addImage"
//                     name="addImage"
//                     accept={ACCEPT_IMAGES}
//                     form={null}
//                     label={chooseImageText}
//                     type="file"
//                     disabled={imageUploadRequested}
//                   >
//                     {fieldprops => {
//                       const { accept, input, label, disabled: fieldDisabled } = fieldprops;
//                       const { name, type } = input;
//                       const onChange = e => {
//                         const file = e.target.files[0];
//                         form.change(`addImage`, file);
//                         form.blur(`addImage`);
//                         onImageUploadHandler(file);
//                       };
//                       const inputProps = { accept, id: name, name, onChange, type };
//                       return (
//                         <div className={css.addImageWrapper}>
//                           <div className={css.aspectRatioWrapper}>
//                             {fieldDisabled ? null : (
//                               <input {...inputProps} multiple className={css.addImageInput} />
//                             )}
//                             <label htmlFor={name} className={css.addImage}>
//                               {label}
//                             </label>
//                           </div>
//                         </div>
//                       );
//                     }}
//                   </Field>
//                   <Field
//                     component={props => {
//                       const { input, meta } = props;
//                       return (
//                         <div className={css.imageRequiredWrapper}>
//                           <input {...input} />
//                           <ValidationError fieldMeta={meta} />
//                         </div>
//                       );
//                     }}
//                     name="images"
//                     type="hidden"
//                     validate={composeValidators(nonEmptyArray(imageRequiredMessage))}
//                   />
                    
                
//                 </AddImages>
//                 {
//                   images.length == 0 ?
//                     <>
//                       <div className={css.imageBox}>
//                         <IconCollection name="ADD_IMAGE_ICON" />
//                       </div>
//                       <div className={css.imageBox}>
//                         <IconCollection name="ADD_IMAGE_ICON" />
//                       </div>
//                       <div className={css.imageBox}>
//                         <IconCollection name="ADD_IMAGE_ICON" />
//                       </div>
//                     </> :
//                     images.length == 1 ?
//                       <>
//                         <div className={css.imageBox}>
//                           <IconCollection name="ADD_IMAGE_ICON" />
//                         </div>
//                         <div className={css.imageBox}>
//                           <IconCollection name="ADD_IMAGE_ICON" />
//                         </div>
//                       </> : images.length == 2 ?
//                         <div className={css.imageBox}>
//                           <IconCollection name="ADD_IMAGE_ICON" />
//                         </div> : null
//                 }
//               </div>
//             </div>

//               {/* <p className={css.tip}>
//                 <FormattedMessage id="EditListingPhotosForm.addImagesTip" />
//               </p> */}
//               {publishListingFailed}
//               {showListingFailed}

//               <div className={css.fixedBottomFooter}>
//                 <div className={css.fixedWidthContainer}>
//                   <NamedLink name="LandingPage"><Button className={css.cancelButton} type="button" onClick={() => form.reset()}>
//                     Cancel
//                   </Button></NamedLink>
//                   <span className={css.stepNumber}>Step 2 of 7</span>
//                   <div className={css.rightButtons}>
//                     <Button className={css.borderButton} type="button" onClick={onPrevious}>
//                       Previous
//                     </Button>
//                     <Button
//                       className={css.submitButton}
//                       type="submit"
//                       inProgress={submitInProgress}
//                       disabled={submitDisabled}
//                       ready={submitReady}
//                     >
//                       {saveActionMsg}
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </Form>
//           );
//         }}
//       />
//     );
//   }
// }

// EditListingPhotosFormComponent.defaultProps = { fetchErrors: null, images: [] };

// EditListingPhotosFormComponent.propTypes = {
//   fetchErrors: shape({
//     publishListingError: propTypes.error,
//     showListingsError: propTypes.error,
//     uploadImageError: propTypes.error,
//     updateListingError: propTypes.error,
//   }),
//   images: array,
//   intl: intlShape.isRequired,
//   onUpdateImageOrder: func.isRequired,
//   onSubmit: func.isRequired,
//   saveActionMsg: string.isRequired,
//   disabled: bool.isRequired,
//   ready: bool.isRequired,
//   updated: bool.isRequired,
//   updateInProgress: bool.isRequired,
//   onRemoveImage: func.isRequired,
// };

// export default compose(injectIntl)(EditListingPhotosFormComponent);




import AddImages from '../../../../components/AddImages/AddImages';
import React, { Component } from 'react';
import { array, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { FormattedMessage, intlShape, injectIntl } from '../../../../util/reactIntl';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { propTypes } from '../../../../util/types';
import {
  nonEmptyArray,
  composeValidators,
  autocompleteSearchRequired,
  autocompletePlaceSelected,
} from '../../../../util/validators';
import { isUploadImageOverLimitError } from '../../../../util/errors';
import {
  Avatar,
  Button,
  FieldTextInput,
  Form,
  IconEdit,
  IconSpinner,
  ImageFromFile,
  FieldLocationAutocompleteInput,
  NamedLink,
  ResponsiveImage,
  ValidationError,
} from '../../../../components';

import css from './EditListingPhotosForm.module.css';

import IconCamera from '../../../../components/IconCamera/IconCamera';
import IconCollection from '../../../../components/IconCollection/IconCollection';

const ACCEPT_IMAGES = 'image/*';
const identity = v => v;

export class EditListingPhotosFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { mainImageUploadRequested: false, imageUploadRequested: false };
    this.onImageUploadHandler = this.onImageUploadHandler.bind(this);
    this.submittedImages = [];
  }

  onImageUploadHandler(file, imageType) {
    if (file) {
      if (imageType) {
        this.setState({ mainImageUploadRequested: true });
      } else {
        this.setState({ imageUploadRequested: true });
      }
      this.props
        .onImageUpload({ id: `${file.name}_${Date.now()}`, file }, imageType)
        .then(() => {
          if (imageType) {
            this.setState({ mainImageUploadRequested: false });
          } else {
            this.setState({ imageUploadRequested: false });
          }
        })
        .catch(() => {
          if (imageType) {
            this.setState({ mainImageUploadRequested: false });
          } else {
            this.setState({ imageUploadRequested: false });
          }
        });
    }
  }

  render() {
    return (
      <FinalForm
        {...this.props}
        keepDirtyOnReinitialize={true}
        onImageUploadHandler={this.onImageUploadHandler}
        imageUploadRequested={this.state.imageUploadRequested}
        mainImageUploadRequested={this.state.mainImageUploadRequested}
        initialValues={{
          images: this.props.images,
          description: this.props.description,
          location: this.props.location.location,
        }}
        render={formRenderProps => {
          const {
            form,
            className,
            fetchErrors,
            handleSubmit,
            images,
            intl,
            invalid,
            imageUploadRequested,
            mainImageUploadRequested,
            onImageUploadHandler,
            onRemoveImage,
            disabled,
            ready,
            saveActionMsg,
            updated,
            mainImage,
            onPrevious,
            values,
            publicData,
            updateInProgress,
          } = formRenderProps;
          const {businessName}=publicData||{};
          const addressRequiredMessage = intl.formatMessage({
            id: 'EditListingLocationForm.addressRequired',
          });
          const addressNotRecognizedMessage = intl.formatMessage({
            id: 'EditListingLocationForm.addressNotRecognized',
          });

          const chooseImageText = (
            <span className={css.chooseImageText}>
              <IconCamera />
              <span className={css.chooseImage}>
                <FormattedMessage id="EditListingPhotosForm.chooseImage" />
              </span>
              {/* <span className={css.imageTypes}>
                <FormattedMessage id="EditListingPhotosForm.imageTypes" />
              </span> */}
            </span>
          );
          const addMainPhoto = (
            <span className={css.chooseImageText}>
              <IconCamera />
              <span className={css.chooseImage}>
                <FormattedMessage id="EditListingPhotosForm.chooseMainImage" />
              </span>
              {/* <span className={css.imageTypes}>
                <FormattedMessage id="EditListingPhotosForm.imageTypes" />
              </span> */}
            </span>
          );

          const imageRequiredMessage = intl.formatMessage({
            id: 'EditListingPhotosForm.imageRequired',
          });

          const { publishListingError, showListingsError, updateListingError, uploadImageError } =
            fetchErrors || {};
          const uploadOverLimit = isUploadImageOverLimitError(uploadImageError);

          // Main image for what
          const uploadingOverlay = mainImageUploadRequested ? (
            <div className={css.uploadingImageOverlay}>
              <IconSpinner />
            </div>
          ) : null;

          const hasUploadError = !!uploadImageError && !mainImageUploadRequested;
          const errorClasses = classNames({ [css.avatarUploadError]: hasUploadError });

          // Ensure that file exists if imageFromFile is used
          const fileExists = !!(mainImage && mainImage.file);
          const fileUploadInProgress = mainImageUploadRequested && fileExists;
          const delayAfterUpload = mainImage && mainImage.imageId;
          const imageFromFile = !fileUploadInProgress ? (
            <ImageFromFile
              id={mainImage.id}
              className={errorClasses}
              rootClassName={css.uploadingImage}
              aspectRatioClassName={css.squareAspectRatio}
              file={mainImage.file}
            >
              {uploadingOverlay}
            </ImageFromFile>
          ) : null;

          // Avatar is rendered in hidden during the upload delay
          // Upload delay smoothes image change process:
          // responsive img has time to load srcset stuff before it is shown to user.

          const avatarComponent =
            !mainImageUploadRequested && mainImage && mainImage.id && mainImage.id.uuid ? (
              <ResponsiveImage
                rootClassName={css.avatarImage}
                alt={mainImage.id.uuid}
                image={mainImage}
                variants={['landscape-crop', 'landscape-crop2x']}
                sizes={'(max-width: 767px) 96px, 240px'}
              />
            ) : null;

          const chooseAvatarLabel =
            mainImage &&
            ((mainImage.id && mainImage.id.uuid) || mainImage.imageId || fileUploadInProgress) ? (
              <div className={css.avatarContainer}>
                {mainImage.imageId ? imageFromFile : avatarComponent}
                <div className={css.changeAvatar}>
                  {/* <FormattedMessage id="ProfileSettingsForm.changeAvatar" /> */}
                  <IconEdit />
                </div>
              </div>
            ) : (
              <div className={css.avatarPlaceholder}>
                <IconCamera />
                <div className={css.avatarPlaceholderText}>
                  <FormattedMessage id="EditListingPhotosForm.addYourMainPicture" />
                </div>
                {/* <div className={css.avatarPlaceholderTextMobile}>
                  <FormattedMessage id="EditListingPhotosForm.addYourMainPictureMobile" />
                </div> */}
              </div>
            );

          let uploadImageFailed = null;

          if (uploadOverLimit) {
            uploadImageFailed = (
              <p className={css.error}>
                <FormattedMessage id="EditListingPhotosForm.imageUploadFailed.uploadOverLimit" />
              </p>
            );
          } else if (uploadImageError) {
            uploadImageFailed = (
              <p className={css.error}>
                <FormattedMessage id="EditListingPhotosForm.imageUploadFailed.uploadFailed" />
              </p>
            );
          }

          // NOTE: These error messages are here since Photos panel is the last visible panel
          // before creating a new listing. If that order is changed, these should be changed too.
          // Create and show listing errors are shown above submit button
          const publishListingFailed = publishListingError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPhotosForm.publishListingFailed" />
            </p>
          ) : null;
          const showListingFailed = showListingsError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPhotosForm.showListingFailed" />
            </p>
          ) : null;

          const submittedOnce = this.submittedImages.length > 0;
          // imgs can contain added images (with temp ids) and submitted images with uniq ids.
          const arrayOfImgIds = imgs =>
            imgs.map(i => (typeof i.id === 'string' ? i.imageId : i.id));
          const imageIdsFromProps = arrayOfImgIds(images);
          const imageIdsFromPreviousSubmit = arrayOfImgIds(this.submittedImages);
          const imageArrayHasSameImages = isEqual(imageIdsFromProps, imageIdsFromPreviousSubmit);
          const pristineSinceLastSubmit = submittedOnce && imageArrayHasSameImages;

          const submitReady = (updated && pristineSinceLastSubmit) || ready;
          const submitInProgress = updateInProgress;
          const submitDisabled =
            invalid ||
            disabled ||
            submitInProgress ||
            imageUploadRequested ||
            mainImageUploadRequested ||
            ready;

          const classes = classNames(css.root, className);
          return (
            <Form
              className={classes}
              onSubmit={e => {
                this.submittedImages = images;
                handleSubmit(e);
              }}
            >
              {updateListingError ? (
                <p className={css.error}>
                  <FormattedMessage id="EditListingPhotosForm.updateFailed" />
                </p>
              ) : null}

              <div className={css.sectionContainer}>
                {/* <h3 className={css.sectionTitle}>
                  <FormattedMessage id="ProfileSettingsForm.yourProfilePicture" />
                </h3> */}
                {mainImage ? null : (
                  <Field
                    accept={ACCEPT_IMAGES}
                    id="mainImage"
                    name="mainImage"
                    label={chooseAvatarLabel}
                    type="file"
                    form={null}
                    uploadImageError={uploadImageError}
                    disabled={fileUploadInProgress}
                  >
                    {fieldProps => {
                      const { accept, id, input, label, disabled, uploadImageError } = fieldProps;
                      const { name, type } = input;
                      const onChange = e => {
                        const file = e.target.files[0];
                        form.change(`mainImage`, file);
                        form.blur(`mainImage`);
                        if (file != null) {
                          const tempId = `${file.name}_${Date.now()}`;
                          onImageUploadHandler(file, 'main');
                        }
                      };

                      let error = null;

                      if (isUploadImageOverLimitError(uploadImageError)) {
                        error = (
                          <div className={css.error}>
                            <FormattedMessage id="ProfileSettingsForm.imageUploadFailedFileTooLarge" />
                          </div>
                        );
                      } else if (uploadImageError) {
                        error = (
                          <div className={css.error}>
                            <FormattedMessage id="ProfileSettingsForm.imageUploadFailed" />
                          </div>
                        );
                      }

                      return (
                        <div className={css.uploadAvatarWrapper}>
                          <label className={css.label} htmlFor={id}>
                            {label}
                          </label>
                          <input
                            accept={accept}
                            id={id}
                            name={name}
                            className={css.uploadAvatarInput}
                            disabled={disabled}
                            onChange={onChange}
                            type={type}
                          />
                          {error}
                        </div>
                      );
                    }}
                  </Field>
                )}
                <Field
                  accept={ACCEPT_IMAGES}
                  id="mainImage"
                  name="mainImage"
                  label={chooseAvatarLabel}
                  type="file"
                  form={null}
                  uploadImageError={uploadImageError}
                  disabled={fileUploadInProgress}
                >
                  {fieldProps => {
                    const { accept, id, input, label, disabled, uploadImageError } = fieldProps;
                    const { name, type } = input;
                    const onChange = e => {
                      const file = e.target.files[0];
                      form.change(`mainImage`, file);
                      form.blur(`mainImage`);
                      if (file != null) {
                        const tempId = `${file.name}_${Date.now()}`;
                        onImageUploadHandler(file, 'main');
                      }
                    };

                    let error = null;

                    if (isUploadImageOverLimitError(uploadImageError)) {
                      error = (
                        <div className={css.error}>
                          <FormattedMessage id="ProfileSettingsForm.imageUploadFailedFileTooLarge" />
                        </div>
                      );
                    } else if (uploadImageError) {
                      error = (
                        <div className={css.error}>
                          <FormattedMessage id="ProfileSettingsForm.imageUploadFailed" />
                        </div>
                      );
                    }

                    return (
                      <div className={css.uploadAvatarWrapper}>
                        <label className={classNames(css.label, css.mainPhotoLabel)} htmlFor={id}>
                          {label}
                        </label>
                        <input
                          accept={accept}
                          id={id}
                          name={name}
                          className={css.uploadAvatarInput}
                          disabled={disabled}
                          onChange={onChange}
                          type={type}
                        />
                        {error}
                      </div>
                    );
                  }}
                </Field>
              </div>
              {uploadImageFailed}
              <div className={css.hairByContents}>
                <h3>
                  <FormattedMessage id="EditListingPhotosForm.text" />{" "}{businessName}
                </h3>
                <p className={css.hairByEmail}>@ enquire@hairbyalexir.com</p>
              </div>

              <div className={css.locationDescription}>
                <FieldLocationAutocompleteInput
                  className={css.locationAddress}
                  inputClassName={css.locationAutocompleteInput}
                  iconClassName={css.locationAutocompleteInputIcon}
                  predictionsClassName={css.predictionsRoot}
                  validClassName={css.validLocation}
                  name="location"
                  label={'Location'}
                  placeholder={''}
                  useDefaultPredictions={false}
                  format={identity}
                  valueFromForm={values.location}
                  validate={composeValidators(
                    autocompleteSearchRequired(addressRequiredMessage),
                    autocompletePlaceSelected(addressNotRecognizedMessage)
                  )}
                />

                <FieldTextInput
                  className={css.building}
                  type="textarea"
                  name="description"
                  id="description"
                  label={'Description'}
                  placeholder={''}
                />
                <h6>Gallery Photos</h6>
              </div>
            <div className={css.gallaryContainer}>
            <div className={css.imagesGallaryGrid}>
                <AddImages
                  className={classNames(css.imagesField, images.length == 1 && css.imagesField1, images.length == 2 && css.imagesField2, images.length == 3 && css.imagesField3)}
                  images={images}
                  thumbnailClassName={css.thumbnail}
                  savedImageAltText={intl.formatMessage({
                    id: 'EditListingPhotosForm.savedImageAltText',
                  })}
                  onRemoveImage={onRemoveImage}
                >
                    <Field
                    id="addImage"
                    name="addImage"
                    accept={ACCEPT_IMAGES}
                    form={null}
                    label={chooseImageText}
                    type="file"
                    disabled={imageUploadRequested}
                  >
                    {fieldprops => {
                      const { accept, input, label, disabled: fieldDisabled } = fieldprops;
                      const { name, type } = input;
                      const onChange = e => {
                        const file = e.target.files[0];
                        form.change(`addImage`, file);
                        form.blur(`addImage`);
                        onImageUploadHandler(file);
                      };
                      const inputProps = { accept, id: name, name, onChange, type };
                      return (
                        <div className={css.addImageWrapper}>
                          <div className={css.aspectRatioWrapper}>
                            {fieldDisabled ? null : (
                              <input {...inputProps} multiple className={css.addImageInput} />
                            )}
                            <label htmlFor={name} className={css.addImage}>
                              {label}
                            </label>
                          </div>
                        </div>
                      );
                    }}
                  </Field>
                  <Field
                    component={props => {
                      const { input, meta } = props;
                      return (
                        <div className={css.imageRequiredWrapper}>
                          <input {...input} />
                          <ValidationError fieldMeta={meta} />
                        </div>
                      );
                    }}
                    name="images"
                    type="hidden"
                    validate={composeValidators(nonEmptyArray(imageRequiredMessage))}
                  />
                    
                
                </AddImages>
                {
                  images.length == 0 ?
                    <>
                      <div className={css.imageBox}>
                        <IconCollection name="ADD_IMAGE_ICON" />
                      </div>
                      <div className={css.imageBox}>
                        <IconCollection name="ADD_IMAGE_ICON" />
                      </div>
                      <div className={css.imageBox}>
                        <IconCollection name="ADD_IMAGE_ICON" />
                      </div>
                    </> :
                    images.length == 1 ?
                      <>
                        <div className={css.imageBox}>
                          <IconCollection name="ADD_IMAGE_ICON" />
                        </div>
                        <div className={css.imageBox}>
                          <IconCollection name="ADD_IMAGE_ICON" />
                        </div>
                      </> : images.length == 2 ?
                        <div className={css.imageBox}>
                          <IconCollection name="ADD_IMAGE_ICON" />
                        </div> : null
                }
              </div>
            </div>

              {/* <p className={css.tip}>
                <FormattedMessage id="EditListingPhotosForm.addImagesTip" />
              </p> */}
              {publishListingFailed}
              {showListingFailed}

              <div className={css.fixedBottomFooter}>
                <div className={css.fixedWidthContainer}>
                  <NamedLink name="LandingPage"><Button className={css.cancelButton} type="button" onClick={() => form.reset()}>
                    Cancel
                  </Button></NamedLink>
                  <span className={css.stepNumber}>Step 2 of 7</span>
                  <div className={css.rightButtons}>
                    <Button className={css.borderButton} type="button" onClick={onPrevious}>
                      Previous
                    </Button>
                    <Button
                      className={css.submitButton}
                      type="submit"
                      inProgress={submitInProgress}
                      disabled={submitDisabled}
                      ready={submitReady}
                    >
                      {saveActionMsg}
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      />
    );
  }
}

EditListingPhotosFormComponent.defaultProps = { fetchErrors: null, images: [] };

EditListingPhotosFormComponent.propTypes = {
  fetchErrors: shape({
    publishListingError: propTypes.error,
    showListingsError: propTypes.error,
    uploadImageError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  images: array,
  intl: intlShape.isRequired,
  onUpdateImageOrder: func.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  onRemoveImage: func.isRequired,
};

export default compose(injectIntl)(EditListingPhotosFormComponent);
