import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';

// Material-UI

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

// Custom Components

import PlanShortPreview from './subcomponents/plan-short-preview';
import PlanFullPreview from './subcomponents/plan-full-preview';
import RealtyShortDescription from './subcomponents/realty-short-description';
import RealtyFullDescription from './subcomponents/realty-full-description';

// Custom Styles

import useStyles from './styles';

const RealtyRow = (props) => {

  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const expandPlan = (event, plan, type, isMortgage, mortgageId = null) => {
    event.preventDefault();
    const data = {
      prerequisites: props.prerequisites,
      realty: props.realty,
      plan,
      type,
      isMortgage,
      mortgageId,
    };
    props.setIsShowingDetalization({
      isShown: true,
      data
    });
  };
  
  return (
    <Fragment>
      {props.plans[props.realty.id.toString()] ? (
      
      <TableRow className={classes.root}>
        
        <TableCell>

          <RealtyShortDescription
            realty={props.realty}
            setRealtyHandler={(event) => props.setRealtyHandler(event, props.realty.id)}
            deleteRealtyHandler={(event) => props.deleteRealtyHandler(event, props.realty.id)}
            isSettingRealtyShown={props.isSettingRealty.isShown}/>

          {open ?
            <RealtyFullDescription
              realty={props.realty} />
          : null}
          
        </TableCell>

        <TableCell className={clsx(
          classes.plan,
          classes.savePlan,
          !props.plans[props.realty.id.toString()].without_mortgage.savings.success && classes.impossible)}>
            
            {props.plans[props.realty.id.toString()].without_mortgage.savings.success ? (
              <Fragment>
                <PlanShortPreview
                  plan={props.plans[props.realty.id.toString()].without_mortgage.savings}
                  clickHandler={(event) => expandPlan(
                    event,
                    props.plans[props.realty.id.toString()].without_mortgage.savings,
                    'savings',
                    false,
                    null)} />
            
                {open ? 

                  <PlanFullPreview
                    isSave={true}
                    plan={props.plans[props.realty.id.toString()].without_mortgage.savings} />

                : null}
              </Fragment>
            ) : 'X'}
        </TableCell>
        <TableCell className={clsx(
          classes.plan,
          classes.creditPlan,
          !props.plans[props.realty.id.toString()].without_mortgage.credit.success && classes.impossible)}>
          
            {props.plans[props.realty.id.toString()].without_mortgage.credit.success ? (
              <Fragment>
                <PlanShortPreview
                  plan={props.plans[props.realty.id.toString()].without_mortgage.credit}
                  clickHandler={(event) => expandPlan(
                    event,
                    props.plans[props.realty.id.toString()].without_mortgage.credit,
                    'credit',
                    false,
                    null)} />
            
                {open ? 

                  <PlanFullPreview
                    isSave={true}
                    plan={props.plans[props.realty.id.toString()].without_mortgage.credit} />

                : null}
              </Fragment>
              ) : 'X'}
        </TableCell>

        {Object.entries(props.mortgages).map(([key, mortgage], i) => (
          props.plans[props.realty.id.toString()] ? (
            <Fragment>
              <TableCell className={clsx(
                classes.plan,
                classes.savePlan,
                !props.plans[props.realty.id.toString()].with_mortgage[mortgage.id.toString()].savings.success && classes.impossible)}>
                  
                  {props.plans[props.realty.id.toString()].with_mortgage[mortgage.id.toString()].savings.success ? (
                  
                    <Fragment>
                      
                      <PlanShortPreview
                        plan={props.plans[props.realty.id.toString()].with_mortgage[mortgage.id.toString()].savings}
                        clickHandler={(event) => expandPlan(
                          event,
                          props.plans[props.realty.id.toString()].with_mortgage[mortgage.id.toString()].savings,
                          'savings',
                          true,
                          mortgage.id)} />
                  
                      {open ? 

                        <PlanFullPreview
                          isSave={true}
                          plan={props.plans[props.realty.id.toString()].with_mortgage[mortgage.id.toString()].savings} />

                      : null}

                    </Fragment>
                  
                  ) : 'X'}

              </TableCell>
              <TableCell className={clsx(
                classes.plan,
                classes.savePlan,
                !props.plans[props.realty.id.toString()].with_mortgage[mortgage.id.toString()].credit.success && classes.impossible)}>
                    
                    {props.plans[props.realty.id.toString()].with_mortgage[mortgage.id.toString()].credit.success ? (
                      
                      <Fragment>

                        <PlanShortPreview
                          plan={props.plans[props.realty.id.toString()].with_mortgage[mortgage.id.toString()].credit}
                          clickHandler={(event) => expandPlan(
                            event,
                            props.plans[props.realty.id.toString()].with_mortgage[mortgage.id.toString()].credit,
                            'credit',
                            true,
                            mortgage.id)} />
                    
                        {open ? 

                          <PlanFullPreview
                            isSave={true}
                            plan={props.plans[props.realty.id.toString()].with_mortgage[mortgage.id.toString()].credit} />

                        : null}

                      </Fragment>
                    
                    ) : 'X'}
              </TableCell>
            </Fragment>
          ) : (
            <TableCell colSpan={2}>Loading ...</TableCell>
          )
        ))}
        
        <TableCell className={classes.expanderColumn}>
          <IconButton aria-label="expand row" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
          </IconButton>
        </TableCell>
      
      </TableRow>
      ) : null}
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    prerequisites: state.prerequisites,
    mortgages: state.mortgages,
    realties: state.realties,
    plans: state.plans,
  };
};

RealtyRow.propTypes = {
  realty: PropTypes.object.isRequired,
  setRealtyHandler: PropTypes.func.isRequired,
  deleteRealtyHandler: PropTypes.func.isRequired,
  // isSettingRealty: PropTypes.object.isRequired,
  // setIsSettingRealty: PropTypes.func.isRequired,
  isShowingDetalization: PropTypes.object.isRequired,
  setIsShowingDetalization: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(RealtyRow);