// import React from 'react';
// import PropTypes, { arrayOf } from 'prop-types';

// // Import configs and util modules
// import {
//   LISTING_PAGE_PARAM_TYPE_DRAFT,
//   LISTING_PAGE_PARAM_TYPE_NEW,
//   LISTING_PAGE_PARAM_TYPES,
// } from '../../../util/urlHelpers';
// import { ensureListing } from '../../../util/data';
// import { createResourceLocatorString } from '../../../util/routes';
// import { propTypes } from '../../../util/types';

// // Import modules from this directory
// import EditListingAvailabilityPanel from './EditListingAvailabilityPanel/EditListingAvailabilityPanel';
// import EditListingDetailsPanel from './EditListingDetailsPanel/EditListingDetailsPanel';
// import EditListingDeliveryPanel from './EditListingDeliveryPanel/EditListingDeliveryPanel';
// import EditListingLocationPanel from './EditListingLocationPanel/EditListingLocationPanel';
// import EditListingPhotosPanel from './EditListingPhotosPanel/EditListingPhotosPanel';
// import EditListingPricingPanel from './EditListingPricingPanel/EditListingPricingPanel';
// import EditListingPricingAndStockPanel from './EditListingPricingAndStockPanel/EditListingPricingAndStockPanel';

// import css from './EditListingWizardTab.module.css';

// export const DETAILS = 'details';
// export const PRICING = 'pricing';
// export const PRICING_AND_STOCK = 'pricing-and-stock';
// export const DELIVERY = 'delivery';
// export const LOCATION = 'location';
// export const AVAILABILITY = 'availability';
// export const PHOTOS = 'photos';

// // EditListingWizardTab component supports these tabs
// export const SUPPORTED_TABS = [
//   DETAILS,
//   PRICING,
//   PRICING_AND_STOCK,
//   DELIVERY,
//   LOCATION,
//   AVAILABILITY,
//   PHOTOS,
// ];

// const pathParamsToNextTab = (params, tab, marketplaceTabs) => {
//   const nextTabIndex = marketplaceTabs.findIndex(s => s === tab) + 1;
//   const nextTab =
//     nextTabIndex < marketplaceTabs.length
//       ? marketplaceTabs[nextTabIndex]
//       : marketplaceTabs[marketplaceTabs.length - 1];
//   return { ...params, tab: nextTab };
// };

// // When user has update draft listing, he should be redirected to next EditListingWizardTab
// const redirectAfterDraftUpdate = (listingId, params, tab, marketplaceTabs, history, routes) => {
//   const listingUUID = listingId.uuid;
//   const currentPathParams = {
//     ...params,
//     type: LISTING_PAGE_PARAM_TYPE_DRAFT,
//     id: listingUUID,
//   };

//   // Replace current "new" path to "draft" path.
//   // Browser's back button should lead to editing current draft instead of creating a new one.
//   if (params.type === LISTING_PAGE_PARAM_TYPE_NEW) {
//     const draftURI = createResourceLocatorString('EditListingPage', routes, currentPathParams, {});
//     history.replace(draftURI);
//   }

//   // Redirect to next tab
//   const nextPathParams = pathParamsToNextTab(currentPathParams, tab, marketplaceTabs);
//   const to = createResourceLocatorString('EditListingPage', routes, nextPathParams, {});
//   history.push(to);
// };

// const EditListingWizardTab = props => {
//   const {
//     tab,
//     marketplaceTabs,
//     params,
//     locationSearch,
//     errors,
//     fetchInProgress,
//     newListingPublished,
//     handleCreateFlowTabScrolling,
//     handlePublishListing,
//     history,
//     images,
//     listing,
//     weeklyExceptionQueries,
//     monthlyExceptionQueries,
//     allExceptions,
//     onFetchExceptions,
//     onAddAvailabilityException,
//     onDeleteAvailabilityException,
//     onUpdateListing,
//     onCreateListingDraft,
//     onImageUpload,
//     onManageDisableScrolling,
//     onProcessChange,
//     onRemoveImage,
//     onUpdateImageOrder,
//     updatedTab,
//     updateInProgress,
//     tabSubmitButtonText,
//     config,
//     routeConfiguration,
//   } = props;

//   const { type } = params;
//   const isNewURI = type === LISTING_PAGE_PARAM_TYPE_NEW;
//   const isDraftURI = type === LISTING_PAGE_PARAM_TYPE_DRAFT;
//   const isNewListingFlow = isNewURI || isDraftURI;

//   const currentListing = ensureListing(listing);

//   // New listing flow has automatic redirects to new tab on the wizard
//   // and the last panel calls publishListing API endpoint.
//   const automaticRedirectsForNewListingFlow = (tab, listingId) => {
//     if (tab !== marketplaceTabs[marketplaceTabs.length - 1]) {
//       // Create listing flow: smooth scrolling polyfill to scroll to correct tab
//       handleCreateFlowTabScrolling(false);

//       // After successful saving of draft data, user should be redirected to next tab
//       redirectAfterDraftUpdate(
//         listingId,
//         params,
//         tab,
//         marketplaceTabs,
//         history,
//         routeConfiguration
//       );
//     } else {
//       handlePublishListing(listingId);
//     }
//   };

//   const onCompleteEditListingWizardTab = (tab, updateValues) => {
//     const onUpdateListingOrCreateListingDraft = isNewURI
//       ? (tab, values) => onCreateListingDraft(values, config)
//       : (tab, values) => onUpdateListing(tab, values, config);

//     const updateListingValues = isNewURI
//       ? updateValues
//       : { ...updateValues, id: currentListing.id };

//     return onUpdateListingOrCreateListingDraft(tab, updateListingValues)
//       .then(r => {
//         // In Availability tab, the submitted data (plan) is inside a modal
//         // We don't redirect provider immediately after plan is set
//         if (isNewListingFlow && tab !== AVAILABILITY) {
//           const listingId = r.data.data.id;
//           automaticRedirectsForNewListingFlow(tab, listingId);
//         }
//       })
//       .catch(e => {
//         // No need for extra actions
//       });
//   };

//   const panelProps = tab => {
//     return {
//       className: css.panel,
//       errors,
//       listing,
//       panelUpdated: updatedTab === tab,
//       params,
//       locationSearch,
//       updateInProgress,
//       // newListingPublished and fetchInProgress are flags for the last wizard tab
//       ready: newListingPublished,
//       disabled: fetchInProgress,
//       submitButtonText: tabSubmitButtonText,
//       listingTypes: config.listing.listingTypes,
//       onManageDisableScrolling,
//       onSubmit: values => {
//         return onCompleteEditListingWizardTab(tab, values);
//       },
//     };
//   };

//   // TODO: add missing cases for supported tabs
//   switch (tab) {
//     case DETAILS: {
//       return (
//         <EditListingDetailsPanel
//           {...panelProps(DETAILS)}
//           onProcessChange={onProcessChange}
//           config={config}
//         />
//       );
//     }
//     case PRICING_AND_STOCK: {
//       return (
//         <EditListingPricingAndStockPanel
//           {...panelProps(PRICING_AND_STOCK)}
//           marketplaceCurrency={config.currency}
//           listingMinimumPriceSubUnits={config.listingMinimumPriceSubUnits}
//         />
//       );
//     }
//     case PRICING: {
//       return (
//         <EditListingPricingPanel
//           {...panelProps(PRICING)}
//           marketplaceCurrency={config.currency}
//           listingMinimumPriceSubUnits={config.listingMinimumPriceSubUnits}
//         />
//       );
//     }
//     case DELIVERY: {
//       return (
//         <EditListingDeliveryPanel {...panelProps(DELIVERY)} marketplaceCurrency={config.currency} />
//       );
//     }
//     case LOCATION: {
//       return <EditListingLocationPanel {...panelProps(LOCATION)} />;
//     }
//     case AVAILABILITY: {
//       return (
//         <EditListingAvailabilityPanel
//           allExceptions={allExceptions}
//           weeklyExceptionQueries={weeklyExceptionQueries}
//           monthlyExceptionQueries={monthlyExceptionQueries}
//           onFetchExceptions={onFetchExceptions}
//           onAddAvailabilityException={onAddAvailabilityException}
//           onDeleteAvailabilityException={onDeleteAvailabilityException}
//           onNextTab={() =>
//             redirectAfterDraftUpdate(
//               listing.id,
//               params,
//               tab,
//               marketplaceTabs,
//               history,
//               routeConfiguration
//             )
//           }
//           config={config}
//           history={history}
//           routeConfiguration={routeConfiguration}
//           {...panelProps(AVAILABILITY)}
//         />
//       );
//     }
//     case PHOTOS: {
//       return (
//         <EditListingPhotosPanel
//           {...panelProps(PHOTOS)}
//           listingImageConfig={config.layout.listingImage}
//           images={images}
//           onUpdateImageOrder={onUpdateImageOrder}

//           onImageUpload={onImageUpload}
//           onRemoveImage={onRemoveImage}
//         />
//       );
//     }
//     default:
//       return null;
//   }
// };

// EditListingWizardTab.defaultProps = {
//   listing: null,
//   updatedTab: null,
// };

// const { array, bool, func, object, oneOf, shape, string } = PropTypes;

// EditListingWizardTab.propTypes = {
//   params: shape({
//     id: string.isRequired,
//     slug: string.isRequired,
//     type: oneOf(LISTING_PAGE_PARAM_TYPES).isRequired,
//     tab: oneOf(SUPPORTED_TABS).isRequired,
//   }).isRequired,
//   locationSearch: object,
//   errors: shape({
//     createListingDraftError: object,
//     publishListingError: object,
//     updateListingError: object,
//     showListingsError: object,
//     uploadImageError: object,
//   }).isRequired,
//   fetchInProgress: bool.isRequired,
//   newListingPublished: bool.isRequired,
//   history: shape({
//     push: func.isRequired,
//     replace: func.isRequired,
//   }).isRequired,
//   images: array.isRequired,

//   // We cannot use propTypes.listing since the listing might be a draft.
//   listing: shape({
//     attributes: shape({
//       publicData: object,
//       description: string,
//       geolocation: object,
//       pricing: object,
//       title: string,
//     }),
//     images: array,
//   }),

//   handleCreateFlowTabScrolling: func.isRequired,
//   handlePublishListing: func.isRequired,
//   onUpdateListing: func.isRequired,
//   onCreateListingDraft: func.isRequired,
//   onImageUpload: func.isRequired,
//   onRemoveImage: func.isRequired,
//   onProcessChange: func.isRequired,
//   updatedTab: string,
//   onUpdateImageOrder: func.isRequired,

//   updateInProgress: bool.isRequired,
//   config: object.isRequired,
//   routeConfiguration: arrayOf(propTypes.route).isRequired,
// };

// export default EditListingWizardTab;



import React from 'react';
import { array, arrayOf, bool, func, object, oneOf, shape, string } from 'prop-types';
import { propTypes } from '../../../util/types';
import { intlShape } from '../../../util/reactIntl';

import {
  LISTING_PAGE_PARAM_TYPE_DRAFT,
  LISTING_PAGE_PARAM_TYPE_NEW,
  LISTING_PAGE_PARAM_TYPES,
} from '../../../util/urlHelpers';
import { ensureListing } from '../../../util/data';
import { createResourceLocatorString } from '../../../util/routes';
// import {
//   EditListingDescriptionPanel,
//   EditListingPhotosPanel,
//   EditListingAvailabilityPanel,
//   EditListingPoliciesPanel,
//   EditListingPricingPanel,
//   EditListingHairTexturesPanel,
//   EditListingTeamSizePanel,
//   EditListingBookingSystemPanel,
//   EditListingSkinTypesPanel,
//   EditListingSkinTonesPanel,
// } from '../../../components';

import css from './EditListingWizard.module.css';
import routeConfiguration from '../../../routing/routeConfiguration';
import EditListingOffersPanel from './EditListingOffersPanel/EditListingOffersPanel';
import EditListingPhotosPanel from './EditListingPhotosPanel/EditListingPhotosPanel';
import EditListingDescriptionPanel from './EditListingDescriptionPanel/EditListingDescriptionPanel';
import EditListingHairTexturesPanel from './EditListingHairTexturesPanel/EditListingHairTexturesPanel';
import EditListingTeamSizePanel from './EditListingTeamSizePanel/EditListingTeamSizePanel';
import EditListingAvailabilityPanel from './EditListingAvailabilityPanel/EditListingAvailabilityPanel';
import EditListingBookingSystemPanel from './EditListingAvailabilityPanel/EditListingBookingSystemPanel/EditListingBookingSystemPanel';
import EditListingSkinTonesPanel from './EditListingSkinTonesPanel/EditListingSkinTonesPanel';
import EditListingSkinTypesPanel from './EditListingSkinTypesPanel/EditListingSkinTypesPanel';

export const DESCRIPTION = 'description';
export const OFFERS = 'offers';
export const HAIR_TEXTURES = 'hair_texture';
export const TEAM_SIZE = 'team_size';
export const PHOTOS = 'photos';
export const AVAILABILITY = 'availability';
export const PRICING = 'pricing';
export const BOOKING_SYSTEM = "booking_system";
export const SKIN_TONES = 'skin_tones';
export const SKIN_TYPES = 'skin_types';

// EditListingWizardTab component supports these tabs
export const SUPPORTED_TABS = [
  DESCRIPTION,
  OFFERS,
  HAIR_TEXTURES,
  TEAM_SIZE,
  PHOTOS,
  AVAILABILITY,
  BOOKING_SYSTEM,
  PRICING,
  SKIN_TYPES,
  SKIN_TONES,
];

const pathParamsToNextTab = (params, tab, marketplaceTabs) => {
  const nextTabIndex = marketplaceTabs.findIndex(s => s === tab) + 1;
  const nextTab =
    nextTabIndex < marketplaceTabs.length
      ? marketplaceTabs[nextTabIndex]
      : marketplaceTabs[marketplaceTabs.length - 1];
  return { ...params, tab: nextTab };
};

const pathParamsToPrevTab = (params, tab, marketplaceTabs) => {
  const prevTabIndex = marketplaceTabs.findIndex(s => s === tab) - 1;
  const prevTab =
    prevTabIndex < marketplaceTabs.length
      ? marketplaceTabs[prevTabIndex]
      : marketplaceTabs[marketplaceTabs.length - 1];
  return { ...params, tab: prevTab };
};

// When user has update draft listing, he should be redirected to next EditListingWizardTab
const redirectAfterDraftUpdate = (listingId, params, tab, marketplaceTabs, history) => {
  const currentPathParams = {
    ...params,
    type: LISTING_PAGE_PARAM_TYPE_DRAFT,
    id: listingId,
  };
  const routes = routeConfiguration();

  // Replace current "new" path to "draft" path.
  // Browser's back button should lead to editing current draft instead of creating a new one.
  if (params.type === LISTING_PAGE_PARAM_TYPE_NEW) {
    const draftURI = createResourceLocatorString('EditListingPage', routes, currentPathParams, {});
    history.replace(draftURI);
  }

  // Redirect to next tab
  const nextPathParams = pathParamsToNextTab(currentPathParams, tab, marketplaceTabs);
  const to = createResourceLocatorString('EditListingPage', routes, nextPathParams, {});
  history.push(to);
};

const redirectPrevDraftUpdate = (listingId, params, tab, marketplaceTabs, history) => {
  const currentPathParams = {
    ...params,
    type: LISTING_PAGE_PARAM_TYPE_DRAFT,
    id: listingId,
  };
  const routes = routeConfiguration();

  // Replace current "new" path to "draft" path.
  // Browser's back button should lead to editing current draft instead of creating a new one.
  if (params.type === LISTING_PAGE_PARAM_TYPE_NEW) {
    const draftURI = createResourceLocatorString('EditListingPage', routes, currentPathParams, {});
    history.replace(draftURI);
  }

  // Redirect to next tab
  const nextPathParams = pathParamsToPrevTab(currentPathParams, tab, marketplaceTabs);
  const to = createResourceLocatorString('EditListingPage', routes, nextPathParams, {});
  history?.push(to);
};

const EditListingWizardTab = props => {
  const {
    tab,
    marketplaceTabs,
    params,
    errors,
    fetchInProgress,
    newListingPublished,
    history,
    images,
    listing,
    handleCreateFlowTabScrolling,
    handlePublishListing,
    onAddAvailabilityException,
    onDeleteAvailabilityException,
    onUpdateListing,
    onCreateListingDraft,
    onImageUpload,
    onUpdateImageOrder,
    onRemoveImage,
    onChange,
    onManageDisableScrolling,
    updatedTab,
    updateInProgress,
    intl,
    fetchExceptionsInProgress,
    availabilityExceptions,
  } = props;

  const { type } = params;
  const isNewURI = type === LISTING_PAGE_PARAM_TYPE_NEW;
  const isDraftURI = type === LISTING_PAGE_PARAM_TYPE_DRAFT;
  const isNewListingFlow = isNewURI || isDraftURI;

  const currentListing = ensureListing(listing);
  const imageIds = images => {
    return images ? images.map(img => img.imageId || img.id) : null;
  };

  const onCompleteEditListingWizardTab = (tab, updateValues, passThrownErrors = false) => { 
    // Normalize images for API call
    const { images: updatedImages, ...otherValues } = updateValues;
    const imageProperty =
      typeof updatedImages !== 'undefined' ? { images: imageIds(updatedImages) } : {};
    const updateValuesWithImages = { ...otherValues, ...imageProperty };

    if (isNewListingFlow) {
      const onUpsertListingDraft = isNewURI
        ? (tab, updateValues) => onCreateListingDraft(updateValues)
        : onUpdateListing;

      const upsertValues = isNewURI
        ? updateValuesWithImages
        : { ...updateValuesWithImages, id: currentListing.id };

      return onUpsertListingDraft(tab, upsertValues)
        .then(r => {
          if (tab !== AVAILABILITY && tab !== marketplaceTabs[marketplaceTabs.length - 1]) {
            // Create listing flow: smooth scrolling polyfill to scroll to correct tab
            handleCreateFlowTabScrolling(false);

            // After successful saving of draft data, user should be redirected to next tab
            redirectAfterDraftUpdate(r.data.data.id.uuid, params, tab, marketplaceTabs, history);
          } else if (tab === marketplaceTabs[marketplaceTabs.length - 1]) {
            handlePublishListing(currentListing.id);
          }
        })
        .catch(e => {
          if (passThrownErrors) {
            throw e;
          }
          // No need for extra actions
          // Error is logged in EditListingPage.duck file.
        });
    } else {
      return onUpdateListing(tab, { ...updateValuesWithImages, id: currentListing.id });
    }
  };

  const panelProps = tab => {
    return {
      className: css.panel,
      errors,
      listing,
      onChange,
      panelUpdated: updatedTab === tab,
      updateInProgress,
      onManageDisableScrolling,
      // newListingPublished and fetchInProgress are flags for the last wizard tab
      ready: newListingPublished,
      disabled: fetchInProgress,
    };
  };

  switch (tab) {
    case DESCRIPTION: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditListingWizard.saveNewDescription'
        : 'EditListingWizard.saveEditDescription';
      return (
        <EditListingDescriptionPanel
          {...panelProps(DESCRIPTION)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
        />
      );
    }
    case OFFERS: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditListingWizard.saveNewFeatures'
        : 'EditListingWizard.saveEditFeatures';
      return (
        <EditListingOffersPanel
          {...panelProps(OFFERS)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
          onPrevious={() => redirectPrevDraftUpdate(listing.id.uuid, params, tab, marketplaceTabs, history.goBack())}
        />
      );
    }
    case TEAM_SIZE: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditListingWizard.saveNewPolicies'
        : 'EditListingWizard.saveEditPolicies';
      return (
        <EditListingTeamSizePanel
          {...panelProps(TEAM_SIZE)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
          onPrevious={() => redirectPrevDraftUpdate(listing.id.uuid, params, tab, marketplaceTabs, history.goBack())}
        />
      );
    }
    case HAIR_TEXTURES: {
      const submitButtonTranslationKey = isNewListingFlow
        ? // ? 'EditListingWizard.saveNewLocation'
          'EditListingWizard.saveNewAvailability'
        : 'EditListingWizard.saveEditLocation';
      return (
        <EditListingHairTexturesPanel
          {...panelProps(HAIR_TEXTURES)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
          onPrevious={() => redirectPrevDraftUpdate(listing.id.uuid, params, tab, marketplaceTabs, history.goBack())}
        />
      );
    }
    case SKIN_TYPES: {
      const submitButtonTranslationKey = isNewListingFlow
        ? // ? 'EditListingWizard.saveNewLocation'
          'EditListingWizard.saveNewAvailability'
        : 'EditListingWizard.saveEditLocation';
      return (
        <EditListingSkinTypesPanel
          {...panelProps(SKIN_TYPES)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
          onPrevious={() => redirectPrevDraftUpdate(listing.id.uuid, params, tab, marketplaceTabs, history.goBack())}
        />
      );
    }
    case SKIN_TONES: {
      const submitButtonTranslationKey = isNewListingFlow
        ? // ? 'EditListingWizard.saveNewLocation'
          'EditListingWizard.saveNewAvailability'
        : 'EditListingWizard.saveEditLocation';
      return (
        <EditListingSkinTonesPanel
          {...panelProps(SKIN_TONES)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
          onPrevious={() => redirectPrevDraftUpdate(listing.id.uuid, params, tab, marketplaceTabs, history.goBack())}
        />
      );
    }
    case PHOTOS: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditListingWizard.saveNewPricing'
        : 'EditListingWizard.saveEditPhotos';

      return (
        <EditListingPhotosPanel
          {...panelProps(PHOTOS)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          images={images}
          onImageUpload={onImageUpload}
          onRemoveImage={onRemoveImage}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
          onUpdateImageOrder={onUpdateImageOrder}
          onPrevious={() => redirectPrevDraftUpdate(listing.id.uuid, params, tab, marketplaceTabs, history.goBack())}
        />
      );
    }

    case AVAILABILITY: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditListingWizard.saveNewAvailability'
        : 'EditListingWizard.saveEditAvailability';
      return (
        <EditListingAvailabilityPanel
          {...panelProps(AVAILABILITY)}
          fetchExceptionsInProgress={fetchExceptionsInProgress}
          availabilityExceptions={availabilityExceptions}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onAddAvailabilityException={onAddAvailabilityException}
          onDeleteAvailabilityException={onDeleteAvailabilityException}
          onSubmit={values => {
            // We want to return the Promise to the form,
            // so that it doesn't close its modal if an error is thrown.
            return onCompleteEditListingWizardTab(tab, values, true);
          }}
          onNextTab={() =>
            redirectAfterDraftUpdate(listing.id.uuid, params, tab, marketplaceTabs, history)
          }
          onPrevious={() => redirectPrevDraftUpdate(listing.id.uuid, params, tab, marketplaceTabs, history.goBack())}
        />
      );
    }
    case BOOKING_SYSTEM: {
      const submitButtonTranslationKey = isNewListingFlow
        ? // ? 'EditListingWizard.saveNewLocation'
          'EditListingWizard.saveNewAvailability'
        : 'EditListingWizard.saveEditLocation';
      return (
        <EditListingBookingSystemPanel
          {...panelProps(BOOKING_SYSTEM)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
          onPrevious={() => redirectPrevDraftUpdate(listing.id.uuid, params, tab, marketplaceTabs, history.goBack())}
        />
      );
    }
    case PRICING: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditListingWizard.saveNewPricing'
        : 'EditListingWizard.saveEditPricing';
      return (
        <EditListingPricingPanel
          {...panelProps(PRICING)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
          onPrevious={() => redirectPrevDraftUpdate(listing.id.uuid, params, tab, marketplaceTabs, history.goBack())}
        />
      );
    }

    default:
      return null;
  }
};

EditListingWizardTab.defaultProps = {
  listing: null,
  updatedTab: null,
  availabilityExceptions: [],
};

EditListingWizardTab.propTypes = {
  params: shape({
    id: string.isRequired,
    slug: string.isRequired,
    type: oneOf(LISTING_PAGE_PARAM_TYPES).isRequired,
    tab: oneOf(SUPPORTED_TABS).isRequired,
  }).isRequired,
  availabilityExceptions: arrayOf(propTypes.availabilityException),
  errors: shape({
    createListingDraftError: object,
    publishListingError: object,
    updateListingError: object,
    showListingsError: object,
    uploadImageError: object,
    fetchExceptionsError: object,
    addExceptionError: object,
    deleteExceptionError: object,
  }).isRequired,
  fetchInProgress: bool.isRequired,
  fetchExceptionsInProgress: bool.isRequired,
  newListingPublished: bool.isRequired,
  history: shape({
    push: func.isRequired,
    replace: func.isRequired,
  }).isRequired,
  images: array.isRequired,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: shape({
    attributes: shape({
      publicData: object,
      businessName: string,
      email: string,
    }),
    images: array,
  }),

  handleCreateFlowTabScrolling: func.isRequired,
  handlePublishListing: func.isRequired,
  onAddAvailabilityException: func.isRequired,
  onDeleteAvailabilityException: func.isRequired,
  onUpdateListing: func.isRequired,
  onCreateListingDraft: func.isRequired,
  onImageUpload: func.isRequired,
  onUpdateImageOrder: func.isRequired,
  onRemoveImage: func.isRequired,
  onChange: func.isRequired,
  updatedTab: string,
  updateInProgress: bool.isRequired,

  intl: intlShape.isRequired,
};

export default EditListingWizardTab;
