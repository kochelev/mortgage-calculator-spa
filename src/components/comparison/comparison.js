// TODO: move here detalization open handler

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  deleteMortgage,
  deleteRealty,
  deleteAllRealties,
  setPlans,
  deletePlans,
  deleteAllPlans,
} from '../../store/actions';

// Material-UI

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

// Custom Components

import RealtyRow from './realty-row/realty-row';
import Mortgages from './mortgages/mortgages';

// Custom Styles

import useStyles from './styles';

const Comparison = (props) => {
  
  const classes = useStyles();

  const setMortgageHandler = (event, id = null) => {
    event.preventDefault();
    props.setIsSettingMortgage({
      isShown: true,
      data: id ? props.mortgages[id] : null,
    });
  }
  
  const setRealtyHandler = (event, id = null) => {
    event.preventDefault();
    props.setIsSettingRealty({
      isShown: true,
      data: id ? props.realties[id] : null
    });
  }

  const deleteMortgageHandler = (event, id) => {
    event.preventDefault();

    const result = window.confirm("Are you sure you want to delete mortgage?");
    if (!result) return;

    props.deleteMortgage(id);
    props.deletePlans(null, [id]);
  }
  
  const deleteRealtyHandler = (event, id) => {
    event.preventDefault();
    
    const result = window.confirm("Are you sure you want to delete realty?");
    if (!result) return;
    
    props.deleteRealty(id);
    props.deletePlans([id], null);
  }

  const deleteAllRealties = (event) => {
    event.preventDefault();
    
    if (Object.keys(props.realties).length === 0) return;

    const result = window.confirm("Are you sure you want to delete all realties?");
    if (!result) return;
    
    props.deleteAllRealties();
    props.deleteAllPlans();
  }

  return (
    <Fragment>
      
      <TableContainer component={Paper} elevation={0} square>
        <Table className={classes.table} size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <Mortgages
              setMortgageHandler={setMortgageHandler}
              deleteMortgageHandler={deleteMortgageHandler}
              isSettingMortgage={props.isSettingMortgage} />
          </TableHead>
          {props.realties && Object.keys(props.realties).length > 0 ?
          <TableBody>
            
            <TableRow className={classes.descriptionRow}>
              <TableCell>Realty description</TableCell>
              <TableCell>Save</TableCell>
              <TableCell>Credit</TableCell>
              {props.mortgages ?
                Object.entries(props.mortgages).map(([key, scheme], i) => (
                  <Fragment key={i}>
                    <TableCell>Save</TableCell>
                    <TableCell>Credit</TableCell>
                  </Fragment>
                )
              ) : null}
              <TableCell></TableCell>
            </TableRow>
            
            {Object.entries(props.realties).map(([key, realty], i) => {
              return (
                <RealtyRow
                  key={i}
                  realty={realty}
                  setRealtyHandler={(...args) => setRealtyHandler(...args)}
                  deleteRealtyHandler={(...args) => deleteRealtyHandler(...args)}
                  isSettingRealty={props.isSettingRealty}
                  setIsSettingRealty={props.setIsSettingRealty}
                  isShowingDetalization={props.isShowingDetalization}
                  setIsShowingDetalization={props.setIsShowingDetalization} />
              )
            })}
          </TableBody>
          : null}
        </Table>
      </TableContainer>
      
      {props.realties && Object.keys(props.realties).length > 1 ?
        <Box className={classes.bottomControls}>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={event => deleteAllRealties(event)}
            endIcon={<DeleteIcon />}>Delete all realties</Button>
        </Box>
      : null }

      <Fab
        color="secondary"
        aria-label="add"
        className={classes.addRealtyButton}
        onClick={(event) => setRealtyHandler(event)}
        disabled={!props.prerequisites || props.isSettingRealty.isShown}>
          <AddIcon />
      </Fab>

    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    prerequisites: state.prerequisites,
    mortgages: state.mortgages,
    realties: state.realties,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteMortgage: (...args) => dispatch(deleteMortgage(...args)),
    deleteRealty: (...args) => dispatch(deleteRealty(...args)),
    deleteAllRealties: () => dispatch(deleteAllRealties()),
    setPlans: (...args) => dispatch(setPlans(...args)),
    deletePlans: (...args) => dispatch(deletePlans(...args)),
    deleteAllPlans: () => dispatch(deleteAllPlans()),
  };
};

Comparison.propTypes = {
  isPending: PropTypes.bool.isRequired,
  setIsPending: PropTypes.func.isRequired,
  isSettingRealty: PropTypes.object.isRequired,
  setIsSettingRealty: PropTypes.func.isRequired,
  isSettingMortgage: PropTypes.object.isRequired,
  setIsSettingMortgage: PropTypes.func.isRequired,
  isShowingDetalization: PropTypes.object.isRequired,
  setIsShowingDetalization: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comparison);