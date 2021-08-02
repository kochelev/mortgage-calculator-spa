import React from 'react';
import PropTypes from 'prop-types';

// Material-UI

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
  },
  text: {
    fontSize: '0.7rem',
    textAlign: 'justify',
  },
}));

const PlanFullPreview = (props) => {

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      
      {props.plan.deal_month === 0 ?
        <Typography className={classes.text}>
          Don't save money, get mortgage and buy a flat this month.
        </Typography>
      :
        <Typography className={classes.text}>
          Save money for <strong>{props.plan.deal_month}</strong> months.
        </Typography>
      }

      <Typography className={classes.text}>
        Mortgage will take <strong>{props.plan.months - props.plan.deal_month}</strong> months. 
      </Typography>

    </Box>
  )
}

PlanFullPreview.propTypes = {
  isSave: PropTypes.bool.isRequired,
  plan: PropTypes.object.isRequired,
};

export default PlanFullPreview;