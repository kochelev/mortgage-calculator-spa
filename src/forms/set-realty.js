// TODO: make possible to set Gotkeys Month as null

import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setRealty, setPlans } from '../store/actions';
import { useForm } from "react-hook-form";

// Material-UI

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

// Custom Components

import * as realties from '../testdata/realties';
import RegExpList from '../helpers/regExpList';
import ConfiguredTextField from './fields/configuredTextField';
import ConfiguredRadioGroup from './fields/configuredRadioGroup';

const SetRealty = (props) => {

  const data = props.data ? props.data : null;
  
  const defaultValues = {
    title:              data ? data.title : '',
    link:               data && data.link ? data.link : '',
    is_primary:         data ? data.is_primary.toString() : '',
    cost:               data ? data.cost.toString() : '',
    get_keys_month:     data ? data.get_keys_month.toString() : '',
    repairing_expenses: data ? data.repairing_expenses.toString() : '',
    repairing_months:   data ? data.repairing_months.toString() : '',
  };

  const { control, register, handleSubmit, errors, watch, setValue, getValues} = useForm({
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
    if (!props.prerequisites) return;
    const realty = {
      'id': data ? data.id : Math.round(Math.random() * 10 ** 9),
      'title': formdata.title,
      'link': formdata.link,
      'cost': parseInt(formdata.cost),
      'is_primary': Boolean(formdata.is_primary),
      'get_keys_month': parseInt(formdata.get_keys_month),
      'repairing_expenses': parseInt(formdata.repairing_expenses),
      'repairing_months': parseInt(formdata.repairing_months),
    };
    const requestData = {
      personal_data: props.prerequisites.personal_data,
      credit_scheme: props.prerequisites.use_credit ? props.prerequisites.credit_scheme : null,
      use_no_mortgage: props.prerequisites.use_no_mortgage,
      mortgages: props.mortgages,
      realties: {},
    };
    requestData.realties[realty.id.toString()] = realty;
    props.setIsPending(true);
    props.setPlans(
      requestData, 
      () => {
        props.setRealty(realty);
        props.setIsPending(false);
        props.handleClose();
      },
      (error) => {
        props.setIsPending(false);
        alert(error);
      }
    );
  }

  const putDataIntoForm = (variant, event = null) => {
    if (event) event.preventDefault();
    for (const key in variant) {
      if (variant[key] === null) {
        setValue(`${key}`, '', { });
        continue;
      }
      if (key === 'repairing') {
        setValue('repairing_expenses', variant.repairing_expenses, { });
        setValue('repairing_months', variant.repairing_months, { });
        continue;
      }
      setValue(`${key}`, variant[key].toString(), { shouldDirty: true, shouldValidate: true });
    }
  };

  const textFieldProps = {
    errors,
    register,
    disabled: props.isPending,
  }

  const radioGroupProps = {
    errors,
    control,
    disabled: !props.isPending,
  }

  return (
    props.prerequisites ? (
      <Fragment>
        <DialogTitle id="form-dialog-title" disableTypography={true}>
          <Typography variant="h5" noWrap>
            Realty Params
          </Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers={true}>

            <ConfiguredTextField {...textFieldProps}
              name="title"
              label="Title"
              autoFocus={true}
              required={true}
              helperText="helper text"
              maxLength={30} />

            <ConfiguredTextField {...textFieldProps}
              name="link"
              label="Link"
              maxLength={2000} />
            
            <ConfiguredRadioGroup {...radioGroupProps}
              name="is_primary"
              label="Is realty primary?"
              required={true}
              values={{
                true: "Yes",
                false: "No",
              }} />

            <ConfiguredTextField {...textFieldProps}
              name="cost"
              label="Realty cost"
              required={true}
              pattern={RegExpList.posInt}
              endAdornment="any currency" />
                  
            <ConfiguredTextField {...textFieldProps}
              name="get_keys_month"
              label="Get keys month"
              required={true}
              pattern={RegExpList.zeroPosInt}
              endAdornment="months" />

            <ConfiguredTextField {...textFieldProps}
              name="repairing_expenses"
              label="Repairing expencies"
              required={true}
              pattern={RegExpList.posInt}
              endAdornment="any currency" />

            <ConfiguredTextField {...textFieldProps}
              name="repairing_months"
              label="Expected repairing duration"
              required={true}
              pattern={RegExpList.posInt}
              endAdornment="months" />

          </DialogContent>
          <DialogActions>
            <Button
              onClick={props.handleClose}
              color="primary">Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isFormChanged}>{!props.isPending ? data ? "Update" : "Create" : "Saving..."}</Button>
          </DialogActions>
          <DialogActions>
            <button onClick={(event) => putDataIntoForm(realties.realty1, event)}>Realty 1</button><br/>
            <button onClick={(event) => putDataIntoForm(realties.realty2, event)}>Incorrect</button><br/>
            <button onClick={(event) => putDataIntoForm(realties.realty3, event)}>Realty 3</button><br/>
            <button onClick={(event) => putDataIntoForm(realties.realty4, event)}>Realty 4</button><br/>
            <button onClick={(event) => putDataIntoForm(realties.realty5, event)}>Realty 5</button><br/>
          </DialogActions>
        </form>
      </Fragment>
    ) : null
  );
}

const mapStateToProps = state => {
  return {
    prerequisites: state.prerequisites,
    realties: state.realties,
    mortgages: state.mortgages,
    isRealtyListUpdated: state.isRealtyListUpdated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setRealty: (...args) => dispatch(setRealty(...args)),
    setPlans: (...args) => dispatch(setPlans(...args)),
  };
};

SetRealty.propTypes = {
  isPending:    PropTypes.bool.isRequired,
  setIsPending: PropTypes.func.isRequired,
  handleClose:  PropTypes.func.isRequired,
  data:         PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetRealty);