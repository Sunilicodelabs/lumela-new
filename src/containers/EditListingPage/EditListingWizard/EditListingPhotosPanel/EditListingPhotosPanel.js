// import React, { Component } from 'react';
// import { array, bool, func, object, shape, string } from 'prop-types';
// import classNames from 'classnames';


// import css from './EditListingPhotosPanel.module.css';
// import { FormattedMessage } from 'react-intl';
// import { LISTING_STATE_DRAFT, propTypes } from '../../../../util/types';
// import EditListingPhotosForm from './EditListingPhotosForm';
// import { ensureOwnListing } from '../../../../util/data';

// class EditListingPhotosPanel extends Component {
//   constructor(props) {
//     super(props);

//     this.getInitialValues = this.getInitialValues.bind(this);

//     this.state = {
//       initialValues: this.getInitialValues(),
//     };
//   }

//   getInitialValues() {
//     const { listing } = this.props;
//     const currentListing = ensureOwnListing(listing);
//     const { geolocation, publicData } = currentListing.attributes;

//     // Only render current search if full place object is available in the URL params
//     // TODO bounds are missing - those need to be queried directly from Google Places
//     const locationFieldsPresent =
//       publicData &&
//       publicData.location &&
//       publicData.location.address &&
//       geolocation;
//     const location =
//       publicData && publicData.location ? publicData.location : {};
//     const { address } = location;

//     return {
//       location: locationFieldsPresent
//         ? {
//           search: address,
//           selectedPlace: { address, origin: geolocation },
//         }
//         : null,
//     };
//   }
//   render() {
//     const {
//       className,
//       rootClassName,
//       errors,
//       disabled,
//       ready,
//       images,
//       listing,
//       onImageUpload,
//       onUpdateImageOrder,
//       submitButtonText,
//       panelUpdated,
//       updateInProgress,
//       onChange,
//       onSubmit,
//       onRemoveImage,
//       onPrevious,
//     } = this.props;

//     const rootClass = rootClassName || css.root;
//     const classes = classNames(rootClass, className);
//     const currentListing = ensureOwnListing(listing);
//     const { publicData, description
//     } = currentListing.attributes || {};
//     const { mainImageId } = publicData || {};
    
//     const isPublished =
//       currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
//     const panelTitle = 
//     // isPublished ? (
//     //   <FormattedMessage
//     //     id="EditListingPhotosPanel.title"
//     //     values={{
//     //       listingTitle: (
//     //         <ListingLink listing={listing}>
//     //           <FormattedMessage id="EditListingPhotosPanel.listingTitle" />
//     //         </ListingLink>
//     //       ),
//     //     }}
//     //   />
//     // ) : (
//       <FormattedMessage id="EditListingFeaturesPanel.createListingTitle" />
//     // );

//     const restImages = images && images.length
//       ? mainImageId
//         ? images.filter(image => !image.imageType && mainImageId && image.id && (!image.id.uuid || (image.id.uuid && image.id.uuid != mainImageId)))
//         : images.filter(image => !image.imageType)
//       : [];

//     const mainImage = images && images.length
//       ? images.filter(image => image.imageType == 'main').length
//         ? images.filter(image => image.imageType == 'main')[images.filter(image => image.imageType == 'main').length - 1]
//         : images.filter(image => mainImageId && image.id && image.id.uuid == mainImageId).length
//           ? images.filter(image => mainImageId && image.id && image.id.uuid == mainImageId)[0]
//           : []
//       : [];

//     return (
//       <div className={classes}>
//         <p className={css.title}>{panelTitle}</p>
//         <div className={css.editListingContainer}>
//           {/* <div className={css.sectionHeader}>
//             <p className={css.processWrap}>PROGRESS (2/5)</p>
//             <div className={css.progressDiv}>
//               <span className={css.progress}>&nbsp;</span>
//             </div>
//           </div> */}
//           <div className={css.editListingContent}>
//             <h2><FormattedMessage id="EditListingPhoto.heading" /> </h2>

//             <EditListingPhotosForm
//               className={css.form}
//               disabled={disabled}
//               onPrevious={onPrevious}
//               ready={ready}
//               fetchErrors={errors}
//               initialValues={{
//                 images, description
//               }}
//               images={restImages}
//               publicData={publicData}
//               mainImage={mainImage}
//               onImageUpload={onImageUpload}
//               onSubmit={values => {
//                 const { mainImage: dummyMainImage, location, addImage, description, ...updateValues } = values;
//                 if (mainImage && mainImage.imageId && mainImage.imageId.uuid) {
//                    if (updateValues.images && updateValues.images.length) {
//                     updateValues.images.push(mainImage);
//                   } else {
//                     updateValues.images = [mainImage];
//                   }
//                 }else{
//                   if (updateValues.images && updateValues.images.length) {
//                      updateValues.images.push(mainImage);
//                   } else {
//                      updateValues.images = [mainImage];
//                   }
//                 }
//                 if (updateValues.images && updateValues.images.length) {
//                   if (mainImageId) {
//                     updateValues.images.filter(image => image.id.uuid != mainImageId);
//                   }
//                   const {
//                     selectedPlace: { address, origin },
//                   } = location;
//                   Object.assign(updateValues, {
//                     geolocation: origin,
//                     description,
//                     publicData: {
//                       mainImageId: mainImage?.imageId?.uuid ? mainImage?.imageId?.uuid : mainImageId ? mainImageId : '',
//                       location: { address },
//                     }

//                   });
//                   this.setState({
//                     initialValues: {
//                       location: {
//                         search: address,
//                         selectedPlace: { address, origin },
//                       },
//                     },
//                   });
//                 }
//                 onSubmit(updateValues);
//               }}
//               onChange={onChange}
//               location={this.state.initialValues}
//               onUpdateImageOrder={onUpdateImageOrder}
//               onRemoveImage={onRemoveImage}
//               saveActionMsg={submitButtonText}
//               updated={panelUpdated}
//               description={description}
//               updateInProgress={updateInProgress}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// EditListingPhotosPanel.defaultProps = {
//   className: null,
//   rootClassName: null,
//   errors: null,
//   images: [],
//   listing: null,
// };

// EditListingPhotosPanel.propTypes = {
//   className: string,
//   rootClassName: string,
//   errors: object,
//   disabled: bool.isRequired,
//   ready: bool.isRequired,
//   images: array,
//   image: shape({
//     id: string,
//     imageId: propTypes.uuid,
//     file: object,
//     uploadedImage: propTypes.image,
//   }),

//   // We cannot use propTypes.listing since the listing might be a draft.
//   listing: object,

//   onImageUpload: func.isRequired,
//   onUpdateImageOrder: func.isRequired,
//   onSubmit: func.isRequired,
//   onChange: func.isRequired,
//   submitButtonText: string.isRequired,
//   panelUpdated: bool.isRequired,
//   updateInProgress: bool.isRequired,
//   onRemoveImage: func.isRequired,
// };

// export default EditListingPhotosPanel;





import React, { Component } from 'react';
import { array, bool, func, object, shape, string } from 'prop-types';
import { FormattedMessage } from '../../../../util/reactIntl';
import classNames from 'classnames';
import { LISTING_STATE_DRAFT, propTypes } from '../../../../util/types';

import { ensureOwnListing } from '../../../../util/data';

import css from './EditListingPhotosPanel.module.css';
import EditListingPhotosForm from './EditListingPhotosForm';

class EditListingPhotosPanel extends Component {
  constructor(props) {
    super(props);

    this.getInitialValues = this.getInitialValues.bind(this);

    this.state = {
      initialValues: this.getInitialValues(),
    };
  }

  getInitialValues() {
    const { listing } = this.props;
    const currentListing = ensureOwnListing(listing);
    const { geolocation, publicData } = currentListing.attributes;

    // Only render current search if full place object is available in the URL params
    // TODO bounds are missing - those need to be queried directly from Google Places
    const locationFieldsPresent =
      publicData &&
      publicData.location &&
      publicData.location.address &&
      geolocation;
    const location =
      publicData && publicData.location ? publicData.location : {};
    const { address } = location;

    return {
      location: locationFieldsPresent
        ? {
          search: address,
          selectedPlace: { address, origin: geolocation },
        }
        : null,
    };
  }
  render() {
    const {
      className,
      rootClassName,
      errors,
      disabled,
      ready,
      images,
      listing,
      onImageUpload,
      onUpdateImageOrder,
      submitButtonText,
      panelUpdated,
      updateInProgress,
      onChange,
      onSubmit,
      onRemoveImage,
      onPrevious,
    } = this.props;

    const rootClass = rootClassName || css.root;
    const classes = classNames(rootClass, className);
    const currentListing = ensureOwnListing(listing);
    const { publicData, description
    } = currentListing.attributes || {};
    const { mainImageId } = publicData || {};
    
    const isPublished =
      currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
    const panelTitle = 
    // isPublished ? (
    //   <FormattedMessage
    //     id="EditListingPhotosPanel.title"
    //     values={{
    //       listingTitle: (
    //         <ListingLink listing={listing}>
    //           <FormattedMessage id="EditListingPhotosPanel.listingTitle" />
    //         </ListingLink>
    //       ),
    //     }}
    //   />
    // ) : (
      <FormattedMessage id="EditListingFeaturesPanel.createListingTitle" />
    // );

    const restImages = images && images.length
      ? mainImageId
        ? images.filter(image => !image.imageType && mainImageId && image.id && (!image.id.uuid || (image.id.uuid && image.id.uuid != mainImageId)))
        : images.filter(image => !image.imageType)
      : [];

    const mainImage = images && images.length
      ? images.filter(image => image.imageType == 'main').length
        ? images.filter(image => image.imageType == 'main')[images.filter(image => image.imageType == 'main').length - 1]
        : images.filter(image => mainImageId && image.id && image.id.uuid == mainImageId).length
          ? images.filter(image => mainImageId && image.id && image.id.uuid == mainImageId)[0]
          : []
      : [];

    return (
      <div className={classes}>
        <p className={css.title}>{panelTitle}</p>
        <div className={css.editListingContainer}>
          {/* <div className={css.sectionHeader}>
            <p className={css.processWrap}>PROGRESS (2/5)</p>
            <div className={css.progressDiv}>
              <span className={css.progress}>&nbsp;</span>
            </div>
          </div> */}
          <div className={css.editListingContent}>
            <h2><FormattedMessage id="EditListingPhoto.heading" /> </h2>

            <EditListingPhotosForm
              className={css.form}
              disabled={disabled}
              onPrevious={onPrevious}
              ready={ready}
              fetchErrors={errors}
              initialValues={{
                images, description
              }}
              images={restImages}
              publicData={publicData}
              mainImage={mainImage}
              onImageUpload={onImageUpload}
              onSubmit={values => {
                const { mainImage: dummyMainImage, location, addImage, description, ...updateValues } = values;
                if (mainImage && mainImage.imageId && mainImage.imageId.uuid) {
                   if (updateValues.images && updateValues.images.length) {
                    updateValues.images.push(mainImage);
                  } else {
                    updateValues.images = [mainImage];
                  }
                }else{
                  if (updateValues.images && updateValues.images.length) {
                     updateValues.images.push(mainImage);
                  } else {
                     updateValues.images = [mainImage];
                  }
                }
                if (updateValues.images && updateValues.images.length) {
                  if (mainImageId) {
                    updateValues.images.filter(image => image.id.uuid != mainImageId);
                  }
                  const {
                    selectedPlace: { address, origin },
                  } = location;
                  Object.assign(updateValues, {
                    geolocation: origin,
                    description,
                    publicData: {
                      mainImageId: mainImage?.imageId?.uuid ? mainImage?.imageId?.uuid : mainImageId ? mainImageId : '',
                      location: { address },
                    }

                  });
                  this.setState({
                    initialValues: {
                      location: {
                        search: address,
                        selectedPlace: { address, origin },
                      },
                    },
                  });
                }
                onSubmit(updateValues);
              }}
              onChange={onChange}
              location={this.state.initialValues}
              onUpdateImageOrder={onUpdateImageOrder}
              onRemoveImage={onRemoveImage}
              saveActionMsg={submitButtonText}
              updated={panelUpdated}
              description={description}
              updateInProgress={updateInProgress}
            />
          </div>
        </div>
      </div>
    );
  }
}

EditListingPhotosPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  images: [],
  listing: null,
};

EditListingPhotosPanel.propTypes = {
  className: string,
  rootClassName: string,
  errors: object,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  images: array,
  image: shape({
    id: string,
    imageId: propTypes.uuid,
    file: object,
    uploadedImage: propTypes.image,
  }),

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  onImageUpload: func.isRequired,
  onUpdateImageOrder: func.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  onRemoveImage: func.isRequired,
};

export default EditListingPhotosPanel;
