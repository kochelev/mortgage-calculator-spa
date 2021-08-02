import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { setPrerequisites, setPlans } from '../../store/actions';

// Material-UI

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

// Custom Styles

import useStyles from './styles';

const Prerequisites = (props) => {

  const classes = useStyles();
  
  const setPrerequisites = (event) => {
    event.preventDefault();
    props.setIsSettingPrerequisites({isShown: true});
  }
  
  const personal_data = [
    { "name": "Current savings:",
      "value": props.prerequisites ? props.prerequisites.personal_data.current_savings : 'None' },
    { "name": "Month income:",
      "value": props.prerequisites ? props.prerequisites.personal_data.income_per_month : 'None' },
    { "name": "Month expenses:",
      "value": props.prerequisites ? props.prerequisites.personal_data.expenses_per_month : 'None' },
    { "name": "Month rent fee:",
      "value": props.prerequisites ? props.prerequisites.personal_data.rent_expenses_per_month : 'None'},
    { "name": "Range of months:",
      "value": (props.prerequisites ? props.prerequisites.personal_data.deal_period_start_month : 'None')
      + "\u2009\u2013\u2009" + (props.prerequisites ? props.prerequisites.personal_data.deal_period_end_month : 'None') },
    { "name": "Max repairing gap:",
      "value": props.prerequisites ? props.prerequisites.personal_data.max_repairing_delay_months : 'None' },
  ];

  const credit_scheme = [
    { "name": "Interest rate:",
      "value": props.prerequisites ? props.prerequisites.credit_scheme.interest_rate * 1200 + '\u2009%': 'None' },
    { "name": "Total months:",
      "value": props.prerequisites ? props.prerequisites.credit_scheme.months + ' months': 'None' }
  ];

  return (
    <Fragment>

      <Box className={classes.headline}>
        <Typography variant="h6" align="left" display="block">Personal information</Typography>
      </Box>
      
      <TableContainer component={Paper} elevation={0} square>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableBody>
            {personal_data.map((row) => (
              <TableRow key={row.name}>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box className={classes.headline}>
        <Typography variant="h6" align="left" display="block">Available credit scheme</Typography>
      </Box>

      <TableContainer component={Paper} elevation={0} square>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableBody>
            {credit_scheme.map((row) => (
              <TableRow key={row.name}>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box align="left" css={{ p: '16px 16px' }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={(event) => setPrerequisites(event)}
          disabled={props.isSettingPrerequisites.isShown}>Edit</Button>
      </Box>

    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    prerequisites: state.prerequisites,
    realties: state.realties,
    mortgages: state.mortgages,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPrerequisites: (...args) => dispatch(setPrerequisites(...args)),
    setPlans: (...args) => dispatch(setPlans(...args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Prerequisites);