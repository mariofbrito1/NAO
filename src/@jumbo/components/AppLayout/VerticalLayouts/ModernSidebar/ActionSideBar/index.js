import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';

import { Box, Hidden, IconButton, withWidth } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MessageIcon from '@material-ui/icons/Message';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';

import CmtDropdownMenu from '../../../../../../@coremat/CmtDropdownMenu';
import CmtAvatar from '../../../../../../@coremat/CmtAvatar';
import SidebarToggleHandler from '../../../../../../@coremat/CmtLayouts/Vertical/SidebarToggleHandler';
import LayoutContext from '../../../../../../@coremat/CmtLayouts/LayoutContext';

import { AuhMethods } from '../../../../../../services/auth';
import { CurrentAuthMethod } from '../../../../../constants/AppConstants';
import Logo from '../../../partials/Logo';
import ActionBarDrawer from './ActionBarDrawer';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    padding: '10px 24px 10px 15px',
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'column',
      padding: '16px 5px',
    },
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  iconBtn: {
    position: 'relative',
    color: alpha(theme.palette.common.white, 0.9),
    '&:hover, &:focus': {
      color: theme.palette.common.white,
    },
  },
  counterRoot: {
    color: theme.palette.common.white,
    border: `solid 1px ${theme.palette.common.white}`,
    backgroundColor: theme.palette.warning.main,
    width: 20,
  },
}));


let initSidebarWidth = 0;
const ActionSideBar = ({ width }) => {

  

  const { authUser } = useSelector(({ auth }) => auth);
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isDrawerOpen, setDrawerStatus] = useState(false);
  const [activeOption, setActiveOption] = useState(null);
  const { isSidebarOpen, sidebarWidth, setSidebarWidth } = useContext(LayoutContext);
  
  const actionsList = [
    
    {
      icon: <PersonIcon />,
      label: authUser && `${authUser.nombre} ${authUser.apellido}`
    },
    {
      icon: <ExitToAppIcon />,
      label: 'Cerrar Sesión',
    },
  ];

  useEffect(() => {
    initSidebarWidth = sidebarWidth;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSidebarOpen && (width === 'lg' || width === 'xl')) {
      setSidebarWidth(0);
    } else {
      setSidebarWidth(initSidebarWidth);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSidebarOpen, width]);

  useEffect(() => {
    if (activeOption && !isDrawerOpen) {
      setDrawerStatus(true);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOption]);

  const onItemClick = item => {
    if (item.label === 'Cerrar Sesión') {
      dispatch(AuhMethods[CurrentAuthMethod].onLogout());
      history.push('/signin');
    }
  };

  const onIconClick = option => {
    setActiveOption(option);
  };

  const onDrawerClose = () => {
    setDrawerStatus(false);
    setActiveOption(null);
  };

  // config sidebar modern
  return (
    <div className={clsx(classes.root, 'actionSidebar')}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <SidebarToggleHandler className={classes.iconBtn}>
          {isSidebarOpen && (width === 'lg' || width === 'xl') && <MenuIcon />}
        </SidebarToggleHandler>
        <Hidden lgUp>
          <Logo color="white" ml={{ xs: 3, sm: 6 }} />
        </Hidden>
      </div>
      <Box display="flex" flexDirection={{ xs: 'row', lg: 'column' }} ml={{ xs: 'auto', lg: 'unset' }}>
        {false &&<IconButton className={classes.iconBtn} onClick={() => onIconClick('search')}>
          <SearchIcon />
        </IconButton>}

        <IconButton className={classes.iconBtn} onClick={() => onIconClick('messages')}>
          <MessageIcon />
        </IconButton>

        <IconButton className={classes.iconBtn} onClick={() => onIconClick('notifications')}>
          <Badge badgeContent={0} classes={{ badge: classes.counterRoot }} overlap="rectangular">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Box>
     
      <Box display="flex" flexDirection={{ xs: 'row', lg: 'column' }} mt={{ xs: 'unset', lg: 'auto' }}>
        
        <p style={{ marginLeft: '3px', fontSize: '0.9em'}}>{authUser && authUser.nombre}</p>
        <p style={{  marginLeft: '3px', fontSize: '0.9em'}}>{authUser && authUser.apellido}</p>
        <CmtDropdownMenu
          onItemClick={onItemClick}
          TriggerComponent={<CmtAvatar style={{margin: '15px'}} src={'./images'} alt="User Avatar" />}
          items={actionsList}
        />
      </Box>

      <ActionBarDrawer
        activeOption={activeOption}
        open={isDrawerOpen}
        onDrawerClose={onDrawerClose}
        onIconClick={onIconClick}
      />
    </div>
  );
};

export default withWidth()(ActionSideBar);
