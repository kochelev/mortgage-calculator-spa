import React from 'react';
import PropTypes from 'prop-types';

// Material-UI

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
    padding: theme.spacing(1, 1, 1, 2),
  },
  text: {
    fontSize: '0.7rem',
    textAlign: 'justify',
  },
}));

const RealtyFullDescription = (props) => {

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      
      <Typography className={classes.text}>
        <strong>{props.realty.cost}</strong>
      </Typography>

      <Typography className={classes.text}>
        Getting keys in <strong>{props.realty.get_keys_month}</strong> months.
      </Typography>

      <Typography className={classes.text}>
        Repairing: <strong>{props.realty.repairing_expenses}</strong> in <strong>{props.realty.repairing_months}</strong> months.
      </Typography>

    </Box>
  )
}

RealtyFullDescription.propTypes = {
  realty: PropTypes.object.isRequired,
};

export default RealtyFullDescription;