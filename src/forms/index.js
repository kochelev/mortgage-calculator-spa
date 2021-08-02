import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SetPrerequisites from './set-prerequisites';
import SetMortgage from './set-mortgage';
import SetRealty from './set-realty';

import Dialog from '@material-ui/core/Dialog';

const Forms = (props) => {
  
  const closeActions = {
    realty: () => props.setIsSettingRealty({isShown: false, data: null}),
    mortgage: () => props.setIsSettingMortgage({isShown: false, data: null}),
    prerequisites: () => props.setIsSettingPrerequisites({isShown: false})
  }

  const properties = {
    isPending:      props.isPending,
    setIsPending:   props.setIsPending
  };

  return (
    <Fragment>
      <Dialog
        scroll="body"
        open={props.isSettingPrerequisites.isShown}
        onClose={closeActions.prerequisites}
        aria-labelledby="form-dialog-title">
        <SetPrerequisites {...properties}
          handleClose={closeActions.prerequisites} />
      </Dialog>
      <Dialog
        scroll="body"
        open={props.isSettingRealty.isShown}
        onClose={closeActions.realty}
        aria-labelledby="form-dialog-title">
        <SetRealty {...properties}
          handleClose={closeActions.realty}
          data={props.isSettingRealty.data} />
      </Dialog>
      <Dialog
        scroll="body"
        open={props.isSettingMortgage.isShown}
        onClose={closeActions.mortgage}
        aria-labelledby="form-dialog-title">
        <SetMortgage {...properties}
          handleClose={closeActions.mortgage}
          data={props.isSettingMortgage.data} />
      </Dialog>
    </Fragment>
  )
}

Forms.propTypes = {
  isPending: PropTypes.bool.isRequired,
  isSettingRealty: PropTypes.object.isRequired,
  isSettingMortgage: PropTypes.object.isRequired,
  isSettingPrerequisites: PropTypes.object.isRequired,
  setIsPending: PropTypes.func.isRequired,
  setIsSettingRealty: PropTypes.func.isRequired,
  setIsSettingMortgage: PropTypes.func.isRequired,
  setIsSettingPrerequisites: PropTypes.func.isRequired,
};

export default Forms;