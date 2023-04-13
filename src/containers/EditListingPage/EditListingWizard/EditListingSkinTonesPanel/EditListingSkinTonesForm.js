import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../../../util/types';
import { Form, Button, FieldRadioButton, NamedLink } from '../../../../components';

import css from './EditListingSkinTonesForm.module.css';
import { skinTones } from '../../../../config/configListing';


export const EditListingSkinTonesFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        className,
        disabled,
        ready,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        form,
        onPrevious,
      } = formRenderProps;

      const rulesLabelMessage = intl.formatMessage({
        id: 'EditListingPoliciesForm.rulesLabel',
      });
      const rulesPlaceholderMessage = intl.formatMessage({
        id: 'EditListingPoliciesForm.rulesPlaceholder',
      });

      const { updateListingError, showListingsError } = fetchErrors || {};
      const errorMessage = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingPoliciesForm.updateFailed" />
        </p>
      ) : null;
      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingPoliciesForm.showListingFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          {errorMessageShowListing}

          {
            skinTones.map((e) => {
              return (
                <div className={css.offeredServices}>
                  <div className={css.serviceBlock}>
                    <FieldRadioButton id={e.key} name={'skinTones'} value={e.key} />
                    <img src={e.icon} />
                    <h6>{e.value}</h6>
                  </div>
                </div>

              )
            })
          }


          <div className={css.fixedBottomFooter}>
            <div className={css.fixedWidthContainer}>
              <NamedLink name="LandingPage"><Button className={css.cancelButton} type="button" onClick={() => form.reset()}>
                Cancel
              </Button></NamedLink>
              <span className={css.stepNumber}>Step 5 of 7</span>
              <div className={css.rightButtons}>
                <Button
                  className={css.borderButton}
                  type="button"
                  onClick={onPrevious}
                >
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

EditListingSkinTonesFormComponent.defaultProps = {
  selectedPlace: null,
  updateError: null,
};

EditListingSkinTonesFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  selectedPlace: propTypes.place,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

export default compose(injectIntl)(EditListingSkinTonesFormComponent);
