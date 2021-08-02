import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Material-UI

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

// Custom Components

import MortgageShortPreview from './subcomponents/mortgage-short-preview';

// Custom Styles

import useStyles from './styles';

const Mortgages = (props) => {

  const classes = useStyles();

  return (
    <Fragment>
      <TableRow
        className={classes.root}>
        
        <TableCell>Mortgage schemes:</TableCell>
        <TableCell colSpan={2}>Without mortgage</TableCell>

        {props.mortgages ?
          Object.entries(props.mortgages).map(([key, scheme], i) => {
            return (
              <TableCell
                key={i}
                colSpan={2}
                className={classes.mortgage}>

                <MortgageShortPreview
                  scheme={scheme}
                  isSettingMortgage={props.isSettingMortgage}
                  setMortgage={props.setMortgageHandler}
                  deleteMortgageHandler={props.deleteMortgageHandler} />
                
              </TableCell>
            )
          })
        : null}
        
        <TableCell>
          <IconButton
            aria-label="add mortgage"
            color="secondary"
            variant="outlined"
            onClick={(event) => props.setMortgageHandler(event)}
            disabled={props.isSettingMortgage.isShown}>

            <AddIcon fontSize="small" />
          </IconButton>
        </TableCell>
        
      </TableRow>
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    prerequisites: state.prerequisites,
    mortgages: state.mortgages,
  };
};

Mortgages.propTypes = {
  isSettingMortgage: PropTypes.object.isRequired,
  setMortgageHandler: PropTypes.func.isRequired,
  deleteMortgageHandler: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(Mortgages);