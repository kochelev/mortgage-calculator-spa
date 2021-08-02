import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setMortgage, setPlans } from '../store/actions';
import { useForm } from "react-hook-form";
import deepEqual from 'deep-equal';

// Material-UI

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

// Custom Components

import RegExpList from '../helpers/regExpList';
import ConfiguredTextField from './fields/configuredTextField';

// Material-UI

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  period: {
    padding: theme.spacing(2),
    margin: '20px 0',
    border: '1px solid rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

const scheduleConverter = (schedule) => {
  const result = {}
  schedule.forEach((period, index) => {
    const newKey = 'period_' + index;
    const interest_rate = period.interest_rate * 1200;
    result[newKey] = {
      interest_rate: interest_rate.toString(),
      months: period.months.toString(),
    }
  });
  return result;
}

const SetMortgage = (props) => {
  
  const classes = useStyles();
  const data = props.data ? props.data : null;

  const defaultValues = {
    title:                    data ? data.title : '',
    initial_payment_percent:  data ? data.initial_payment_percent.toString() : '',
    initial_expenses:         data ? data.initial_expenses.toString() : '',
    schedule:                 data ? scheduleConverter(data.schedule) : {},
  }

  const { register, unregister, handleSubmit, errors, watch, setValue, getValues} = useForm({
    defaultValues,
    mode: 'onSubmit',
    criteriaMode: 'all',
  });
  const [ isFormChanged, setIsFormChanged ] = useState(false);
  const [ currentFormState, setCurrentFormState ] = useState(defaultValues);
  const formValues = watch();

  useEffect(() => {
    const currentValues = getValues();
    // console.log('formValues: ', formValues);
    if (deepEqual(defaultValues, currentValues)) setIsFormChanged(false);
    else setIsFormChanged(true);
  }, [formValues]); // eslint-disable-line react-hooks/exhaustive-deps

  const addPeriod = (event) => {
    event.preventDefault();
    const newCurrentFormState = currentFormState;
    const newPeriodId = 'period_' + Math.round(Math.random() * 10 ** 9);
    newCurrentFormState.schedule[newPeriodId] = {
      interest_rate: '13',
      months: '11'
    }
    register('schedule["' + newPeriodId + '"].interest_rate', { required: true, pattern: RegExpList.posFloat, maxLength: 4 });
    register('schedule["' + newPeriodId + '"].months', { required: true, pattern: RegExpList.posInt, max: 1200 });
    setCurrentFormState(newCurrentFormState);
    // Make this after setCurrentFormState method execution
    setValue('schedule["' + newPeriodId + '"].interest_rate', '13', { shouldValidate: true });
    setValue('schedule["' + newPeriodId + '"].months', '11', { shouldValidate: true });
  }

  const deletePeriod = (event, key) => {
    event.preventDefault();
    const newCurrentFormState = {
      ...currentFormState,
      schedule: Object.keys(currentFormState.schedule)
        .filter(x => x !== key)
        .reduce((obj, key) => {
          return {
            ...obj,
            [key]: currentFormState.schedule[key]
          };
        }, {})
    }
    setCurrentFormState(newCurrentFormState);
    unregister('schedule["' + key + '"].interest_rate');
    unregister('schedule["' + key + '"].months');
    // console.log(formValues);
  }

  const onSubmit = formdata => {
    const mortgage = {
      'id': data ? data.id : Math.round(Math.random() * 10 ** 9),
      'title': formdata.title,
      'initial_payment_percent': parseFloat(formdata.initial_payment_percent),
      'initial_expenses': parseInt(formdata.initial_expenses),
      'schedule': Object.values(formdata.schedule).map((period) => {
        return {
          interest_rate: parseFloat(period.interest_rate) / 1200,
          months: parseInt(period.months)
        }}
      )
    };
    
    if (props.realties && Object.keys(props.realties).length > 0) {
      const requestData = {
        personal_data: props.prerequisites.personal_data,
        credit_scheme: props.prerequisites.use_credit ? props.prerequisites.credit_scheme : null,
        use_no_mortgage: false,
        mortgages: {},
        realties: props.realties,
      };
      requestData.mortgages[mortgage.id.toString()] = mortgage;
      props.setIsPending(true);
      props.setPlans(
        requestData,
        () => {
          props.setMortgage(mortgage);
          props.setIsPending(false);
          props.handleClose();
        },
        (error) => {
          props.setIsPending(false);
          alert(error);
        }
      );
    } else {
      props.setMortgage(mortgage);
      props.handleClose();
    }
  }

  const textFieldProps = {
    errors,
    register,
    disabled: props.isPending,
  }
  return (
    props.mortgages ? (
      <Fragment>
        <DialogTitle id="form-dialog-title" disableTypography={true}>
          <Typography variant="h5" noWrap>
            Mortgage
          </Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers={true}>

            <ConfiguredTextField {...textFieldProps}
              name="title"
              label="Title"
              autoFocus={true}
              required={true}
              maxLength={100} />

            <ConfiguredTextField {...textFieldProps}
              name="initial_payment_percent"
              label="Initial payment"
              helperText=".....?"
              required={true}
              pattern={RegExpList.zeroPosFloat}
              endAdornment="%" />

            <ConfiguredTextField {...textFieldProps}
              name="initial_expenses"
              label="Initial expencies"
              helperText=".....?"
              required={true}
              pattern={RegExpList.zeroPosInt}
              endAdornment="any currency" />

            <Box css={{ p: '40px 0 20px' }}>

              <Typography variant="h6" noWrap>
                Schedule
              </Typography>

              <DialogContentText>
                sdfjlksdjflkjsaklfjasdkl
              </DialogContentText>

              {Object.entries(currentFormState.schedule).map(([key, period], index) => {
                return (
                  <Box className={classes.period} key={key}>
                    <Box>
                      <Typography variant="h5">{index + 1}</Typography>
                    </Box>
                    <Box>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          
                          <ConfiguredTextField {...textFieldProps}
                            name={'schedule.' + key + '.interest_rate'}
                            label="Interest Rates"
                            helperText=".....?"
                            required={true}
                            pattern={RegExpList.posFloat}
                            maxLength={4}
                            endAdornment="%" />

                        </Grid>
                        <Grid item xs={12} sm={6}>
                          
                          <ConfiguredTextField {...textFieldProps}
                            name={'schedule.' + key + '.months'}
                            label="Months"
                            helperText=".....?"
                            required={true}
                            pattern={RegExpList.posInt}
                            max={1200}
                            endAdornment="months" />

                        </Grid>
                      </Grid>
                    </Box>
                    <Box>
                      <IconButton
                        className={classes.iconButton}
                        aria-label="delete"
                        onClick={event => deletePeriod(event, key)} >
                          <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                )
              })}

              {!formValues.schedule || Object.keys(formValues.schedule).length < 2 ? (
                <Box className={classes.bottomControls}>
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={event => addPeriod(event)}
                    endIcon={<AddIcon />}>
                      Add Period
                  </Button>
                </Box>
              ) : null}
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
              disabled={(Object.keys(errors).length > 0) || !isFormChanged}>{!props.isPending ? data ? "Update" : "Create" : "Saving..."}</Button>
          </DialogActions>
        </form>
      </Fragment>
    ) : null
  );
}

const mapStateToProps = state => {
  return {
    prerequisites: state.prerequisites,
    mortgages: state.mortgages,
    realties: state.realties,
    isRealtyListUpdated: state.isRealtyListUpdated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMortgage: (...args) => dispatch(setMortgage(...args)),
    setPlans: (...args) => dispatch(setPlans(...args)),
  };
};

SetMortgage.propTypes = {
  isPending:    PropTypes.bool.isRequired,
  setIsPending: PropTypes.func.isRequired,
  handleClose:  PropTypes.func.isRequired,
  data:         PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(SetMortgage);