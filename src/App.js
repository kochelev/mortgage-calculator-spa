// TODO: validate data from SessionStorage
// TODO: make default prerequisites and mortgages as lazy loading

import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { init } from './store/actions';
import clsx from 'clsx';

// Material-UI

import { useTheme } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import GitHubIcon from '@material-ui/icons/GitHub';
import Link from '@material-ui/core/Link';

// Custom Components

import Prerequisites from './components/prerequisites/prerequisites';
import Comparison from './components/comparison/comparison';
import Detalization from './components/detalization/detalization';
import Forms from './forms';
import Plug from './components/plug/plug';
import defaultPrerequisites from './defaults/defaultPrerequisites';
import defaultMortgages from './defaults/defaultMortgages';

// Custum Styles

import useStyles from './styles';

const App = (props) => {

  useEffect(() => {
    if (sessionStorage.getItem('data')) {
      props.init(JSON.parse(sessionStorage.getItem('data')));
    } else {
      props.init({
        prerequisites: defaultPrerequisites,
        mortgages: defaultMortgages,
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const Home = () => {
  
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
  
    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);
  
    const [ isPending, setIsPending ] = useState(false);
    const [ isSettingPrerequisites, setIsSettingPrerequisites ] = useState({isShown: false});
    const [ isSettingMortgage, setIsSettingMortgage ] = useState({isShown: false, data: null});
    const [ isSettingRealty, setIsSettingRealty ] = useState({isShown: false, data: null});
    const [ isShowingDetalization, setIsShowingDetalization ] = useState({isShown: false, data: null});
  
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          elevation={0}
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}>
          
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}>
              
              <ChevronRightIcon />
            </IconButton>
  
              <ButtonGroup size="small" color="primary" aria-label="small outlined primary button group">
                <Button disabled>Eng</Button>
                <Button disabled>Рус</Button>
                <Button disabled>中文</Button>
              </ButtonGroup>
  
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}>
  
          <Box className={classes.contentWrapper}>
            <div className={classes.drawerHeader}>
  
              <Typography className={classes.siteName}>
                Mortgage<br/>Calculator ++
              </Typography>
              
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
              
            </div>

            <Divider />
            
            <Prerequisites
              isPending={isPending}
              isSettingPrerequisites={isSettingPrerequisites}
              setIsPending={setIsPending}
              setIsSettingPrerequisites={setIsSettingPrerequisites} />
          
          </Box>
  
          <Box className={classes.links}>
            <Link
              href="https://github.com/kochelev"
              color="inherit"
              target="_blank"
              className={classes.linkGitHub} >
              <GitHubIcon className={classes.ghLink}/>
              <Typography variant="body2">kochelev</Typography>
            </Link>
          </Box>
          <Box className={classes.footer}>
            <Typography variant="body2">
              Vesion 1.0.01
            </Typography>
          </Box>
          
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}>
          
          <div className={classes.contenWrapper}>
            <div className={classes.drawerHeader} />
            <Comparison
              isPending={isPending}
              setIsPending={setIsPending}
              isSettingRealty={isSettingRealty}
              setIsSettingRealty={setIsSettingRealty}
              isSettingMortgage={isSettingMortgage}
              setIsSettingMortgage={setIsSettingMortgage}
              isShowingDetalization={isShowingDetalization}
              setIsShowingDetalization={setIsShowingDetalization} />
          </div>

          {!props.realties || Object.keys(props.realties).length === 0 ?
            <Plug />
          : null}
  
          <Box className={classes.footer}>
            
          </Box>
  
        </main>
        <Forms
          isPending={isPending}
          setIsPending={setIsPending}
          isSettingPrerequisites={isSettingPrerequisites}
          setIsSettingPrerequisites={setIsSettingPrerequisites}
          isSettingRealty={isSettingRealty}
          setIsSettingRealty={setIsSettingRealty}
          isSettingMortgage={isSettingMortgage}
          setIsSettingMortgage={setIsSettingMortgage} />

        <Detalization
          isShowingDetalization={isShowingDetalization}
          setIsShowingDetalization={setIsShowingDetalization} />

        <Backdrop className={classes.backdrop} open={isPending}>
          <CircularProgress color="inherit" />
        </Backdrop>

      </div>
    );
  };

  return (
    <Switch>
      <Route path='/' exact render={() => <Home />} />
      <Route render={() => <Redirect to="/" /> } />
    </Switch>
  );

};

const mapStateToProps = state => {
  return {
    prerequisites: state.prerequisites,
    realties: state.realties,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    init: (...args) => dispatch(init(...args)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
