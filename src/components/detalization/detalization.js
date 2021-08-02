import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Material-UI

import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LaunchIcon from '@material-ui/icons/Launch';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

// Custom Styles

import useStyles from './styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const Detalization = (props) => {
  
  const classes = useStyles();

  const data = props.isShowingDetalization.data ? props.isShowingDetalization.data : null;

  const handleClose = () => {
    props.setIsShowingDetalization({isShown: false, data: null});
  };

  return (
    <Fragment>
      <Dialog fullScreen open={props.isShowingDetalization.isShown} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            {data ? (
              <Fragment>
                <Typography variant="h6" className={classes.title}>
                  <Typography variant="h6">
                    {data.realty.title}
                  </Typography>
                  <Typography variant="body2">
                    {data.realty.is_primary ? 'Primary' : 'Secondary'} realty
                    for {data.realty.cost}.
                  </Typography>
                  <Typography variant="body2">
                    Plan supposes {data.type === 'savings' ? 'only savings (no credit) for repairing' : 'using credit for repairing'}.
                  </Typography>
                </Typography>
                {data.realty.link ? (
                  <Link variant="body2" href={data.realty.link} target="_blank">
                    <LaunchIcon color="action" />
                  </Link>
                ) : null}
                <Button color="inherit" onClick={() => alert('Download CSV')}>
                  Download
                </Button>
              </Fragment>
            ) : 'Loading...'}
          </Toolbar>

        </AppBar>

        <TableContainer className={classes.Table} component={Paper} elevation={0} square>
          <Table className={classes.table} size="small" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell colSpan={3}>Incomes</TableCell>
                <TableCell colSpan={2}>Expenses</TableCell>
                <TableCell colSpan={4}>Mortgage</TableCell>
                <TableCell colSpan={4}>Credit</TableCell>
                <TableCell colSpan={3}>Savings</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>+ savings</TableCell>
                <TableCell>+ regular</TableCell>
                <TableCell>+ irregular</TableCell>
                <TableCell>− regular</TableCell>
                <TableCell>− irregular</TableCell>
                <TableCell>k</TableCell>
                <TableCell>Debt</TableCell>
                <TableCell>Min. p.</TableCell>
                <TableCell>Act. p.</TableCell>
                <TableCell>k</TableCell>
                <TableCell>Debt</TableCell>
                <TableCell>Min. p.</TableCell>
                <TableCell>Act. p.</TableCell>
                <TableCell>To save</TableCell>
                <TableCell>Last save</TableCell>
                <TableCell>After savings</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              
            {data && data.plan.schedule.map((month, index) => (
              <TableRow>
                <TableCell>{index}</TableCell>
                <TableCell>{Math.round(month.incomes.before_savings * 10) / 10}</TableCell>
                <TableCell>{Math.round(month.incomes.regular_income * 10) / 10}</TableCell>
                <TableCell>{Math.round(month.incomes.irregular_income * 10) / 10}</TableCell>
                <TableCell>{Math.round(month.expenses.regular_expenses * 10) / 10}</TableCell>
                <TableCell>{Math.round(month.expenses.irregular_expenses * 10) / 10}</TableCell>
                <TableCell>{month.debts && month.debts.Mortgage ? (Math.round(month.debts.Mortgage.interest_rate * 12000) / 10).toString() : '-'}</TableCell>
                <TableCell>{month.debts && month.debts.Mortgage ? (Math.round(month.debts.Mortgage.before_debt * 10) / 10).toString() + '→' + (Math.round(month.debts.Mortgage.after_debt * 10) / 10).toString() : '-'}</TableCell>
                <TableCell>{month.debts && month.debts.Mortgage ? (Math.round(month.debts.Mortgage.before_minimal_payment * 10) / 10).toString() + '→' + (Math.round(month.debts.Mortgage.after_minimal_payment * 10) / 10).toString() : '-'}</TableCell>
                <TableCell>{month.debts && month.debts.Mortgage ? (Math.round(month.debts.Mortgage.actual_payment * 10) / 10).toString() : '-'}</TableCell>

                <TableCell>{month.debts && month.debts.Repairing ? (Math.round(month.debts.Repairing.interest_rate * 12000) / 10).toString() : '-'}</TableCell>
                <TableCell>{month.debts && month.debts.Repairing ? (Math.round(month.debts.Repairing.before_debt * 10) / 10).toString() + '→' + (Math.round(month.debts.Repairing.after_debt * 10) / 10).toString() : '-'}</TableCell>
                <TableCell>{month.debts && month.debts.Repairing ? (Math.round(month.debts.Repairing.before_minimal_payment * 10) / 10).toString() + '→' + (Math.round(month.debts.Repairing.after_minimal_payment * 10) / 10).toString() : '-'}</TableCell>
                <TableCell>{month.debts && month.debts.Repairing ? (Math.round(month.debts.Repairing.actual_payment * 10) / 10).toString() : '-'}</TableCell>

                <TableCell>{Math.round(month.to_save * 10) / 10}</TableCell>
                <TableCell>{Math.round(month.last_save * 10) / 10}</TableCell>
                <TableCell>{Math.round(month.after_savings * 10) / 10}</TableCell>
              </TableRow>
            ))}
              <TableRow>
                <TableCell colSpan={17}>Finish</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Dialog>
    </Fragment>
  );
};

Detalization.propTypes = {
  isShowingDetalization:    PropTypes.object.isRequired,
  setIsShowingDetalization: PropTypes.func.isRequired,
};

export default Detalization;