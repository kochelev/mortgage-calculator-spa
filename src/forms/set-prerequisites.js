// TODO: alert(error + '\n Need to make possible save again!!!!!!!!');
// TODO: Control if deal_date_start is less than deal_date_finish
// TODO: Interest rates shoudl be less than 100%?
// TODO: Pass data to that component too? Don't use prerequisites.

import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPrerequisites, setPlans } from '../store/actions';
import { useForm } from "react-hook-form";

// Material-UI

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

// Custom Components

import RegExpList from '../helpers/regExpList';
import ConfiguredTextField from './fields/configuredTextField';

const SetPrerequisites = (props) => {
  
  const data = props.prerequisites ? props.prerequisites : null;

  const defaultValues = {
    current_savings:            data ? data.personal_data.current_savings.toString() : null,
    income_per_month:           data ? data.personal_data.income_per_month.toString() : null,
    expenses_per_month:         data ? data.personal_data.expenses_per_month.toString() : null,
    rent_expenses_per_month:    data ? data.personal_data.rent_expenses_per_month.toString() : null,
    deal_period_start_month:    data ? data.personal_data.deal_period_start_month.toString() : null,
    deal_period_end_month:      data ? data.personal_data.deal_period_end_month.toString() : null,
    max_repairing_delay_months: data ? data.personal_data.max_repairing_delay_months.toString() : null,
    use_credit:                 data ? data.use_credit : null,
    use_no_mortgage:            data ? data.use_no_mortgage : null,
    interest_rate:              data ? (data.credit_scheme.interest_rate * 1200).toString() : null,
    months:                     data ? data.credit_scheme.months.toString() : null,
  };

  const { register, handleSubmit, errors, watch, getValues } = useForm({
    defaultValues,
    mode: 'onSubmit',
    criteriaMode: 'all',
  });
  const [ isFormChanged, setIsFormChanged ] = useState(false);
  const formValues = watch();

  useEffect(() => {
    const currentState = getValues();
    if (Object.keys(currentState).every(
        (key) => currentState[key] === defaultValues[key])) setIsFormChanged(false);
    else setIsFormChanged(true);
  }, [formValues]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = formdata => {
    const prerequisites = {
      'personal_data': {
        'current_savings':            parseInt(formdata.current_savings),
        'income_per_month':           parseInt(formdata.income_per_month),
        'expenses_per_month':         parseInt(formdata.expenses_per_month),
        'rent_expenses_per_month':    parseInt(formdata.rent_expenses_per_month),
        'deal_period_start_month':    parseInt(formdata.deal_period_start_month),
        'deal_period_end_month':      parseInt(formdata.deal_period_end_month),
        'max_repairing_delay_months': parseInt(formdata.max_repairing_delay_months),
      },
      'use_credit':                   defaultValues.use_credit, // formdata.use_credit === "true" ? true : false,
      'use_no_mortgage':              defaultValues.use_no_mortgage,
      'credit_scheme': {
        'interest_rate':              parseFloat(formdata.interest_rate) / 1200,
        'months':                     parseInt(formdata.months),
      }
    };
    
    if (props.realties && Object.keys(props.realties).length > 0) {
      const requestData = {
        personal_data: prerequisites.personal_data,
        credit_scheme: prerequisites.use_credit ? prerequisites.credit_scheme : null,
        use_no_mortgage: true,
        mortgages: props.mortgages,
        realties: props.realties,
      };
      props.setIsPending(true);
      props.setPlans(
        requestData,
        () => {
          props.setPrerequisites(prerequisites);
          props.setIsPending(false);
          props.handleClose();
        },
        (error) => {
          props.setIsPending(false);
          alert(error);
        }
      );
    } else {
      props.setPrerequisites(prerequisites, () => {
        props.handleClose();
      });
    }
  };

  const properties = {
    errors,
    register,
    disabled: props.isPending,
  }

  return (
    <Fragment>
      <DialogTitle id="form-dialog-title" disableTypography={true}>
        <Typography variant="h5" noWrap>
          Prerequisites
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers={true}>
          
          <ConfiguredTextField {...properties}
            name="current_savings"
            label="Current savings"
            autoFocus={true}
            helperText="How much money have you already saved by now?"
            required={true}
            pattern={RegExpList.zeroPosInt}
            endAdornment="any currency" />

          <ConfiguredTextField {...properties}
            name="income_per_month"
            label="Month income"
            helperText="How much free money do you have every month?"
            required={true}
            pattern={RegExpList.zeroPosInt}
            endAdornment="any currency" />

          <ConfiguredTextField
            {...properties}
            name="expenses_per_month"
            label="Month expenses"
            helperText="How much do you spend money each month?"
            required={true}
            pattern={RegExpList.zeroPosInt}
            endAdornment="any currency" />

          <ConfiguredTextField
            {...properties}
            name="rent_expenses_per_month"
            label="Month rent expenses"
            helperText="How much do you pay for hiring a flat every month?"
            required={true}
            pattern={RegExpList.zeroPosInt}
            endAdornment="any currency" />

          <Box css={{ p: '40px 0' }}>
            <DialogContentText>
              Enter the range of months you are able to take a mortgage.
            </DialogContentText>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                
                <ConfiguredTextField {...properties}
                  name="deal_period_start_month"
                  label="Deal start month"
                  helperText="From which month are you going to make a mortgage deal?"
                  required={true}
                  pattern={RegExpList.zeroPosInt}
                  endAdornment="month" />

              </Grid>
              <Grid item xs={12} sm={6}>
                
                <ConfiguredTextField {...properties}
                  name="deal_period_end_month"
                  label="Deal finish month"
                  helperText="Till which month are you going to make a mortgage deal?"
                  required={true}
                  pattern={RegExpList.zeroPosInt}
                  endAdornment="month" />

              </Grid>
            </Grid>
          </Box>
          
          <ConfiguredTextField
            {...properties}
            name="max_repairing_delay_months"
            label="Repairing gap"
            helperText="max_repairing_delay_months"
            required={true}
            pattern={RegExpList.zeroPosInt}
            endAdornment="months" />

          <Box css={{ p: '20px 0' }}>
            <Typography variant="h6" noWrap>
              Available Credit Scheme for Repairing
            </Typography>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send updates
              occasionally.
            </DialogContentText>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                
                <ConfiguredTextField {...properties}
                  name="interest_rate"
                  label="Interest rate"
                  helperText="What interest rate would have a possible credit for repairing?"
                  required={true}
                  pattern={RegExpList.posFloat}
                  endAdornment="%" />

              </Grid>
              <Grid item xs={12} sm={6}>
                
                <ConfiguredTextField {...properties}
                  name="months"
                  label="Months"
                  helperText="How many months would you have for paying out repairing credit?"
                  required={true}
                  pattern={RegExpList.posInt}
                  endAdornment="months" />

              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props.handleClose}
            color="primary">Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isFormChanged}>{!props.isPending ? "Update" : "Saving..."}</Button>
        </DialogActions>
      </form>
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    prerequisites:        state.prerequisites,
    realties:             state.realties,
    mortgages:            state.mortgages,
    isRealtyListUpdated:  state.isRealtyListUpdated,
  };
};
  
const mapDispatchToProps = dispatch => {
  return {
    setPrerequisites:  (...args) => dispatch(setPrerequisites(...args)),
    setPlans:    (...args) => dispatch(setPlans(...args)),
  };
};

SetPrerequisites.propTypes = {
  isPending:    PropTypes.bool.isRequired,
  setIsPending: PropTypes.func.isRequired,
  handleClose:  PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetPrerequisites);