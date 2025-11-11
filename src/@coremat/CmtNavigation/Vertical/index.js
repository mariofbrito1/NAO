import React from 'react';
import { List } from '@material-ui/core';
import NavMenuItem from './NavMenuItem';
import NavSection from './NavSection';
import NavCollapse from './NavCollapse';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  sideNavMenu: {
    position: 'relative',
    width: '100%',
    '& .MuiCollapse-container': {
      width: '100%'
    }
  },
}));

const CmtVertical = ({ menuItems }) => {
  const classes = useStyles();
  
  const renderNavItem = (item, index) => {
    if (!item || !item.type) return null;

    const commonProps = {
      key: `${item.type}-${index}`,
      name: item.name,
      icon: item.icon,
      link: item.link
    };

    switch (item.type) {
      case 'section':
        return (
          <NavSection {...commonProps}>
            {item.children && item.children.map(renderNavItem)}
          </NavSection>
        );
      case 'collapse':
        return (
          <NavCollapse {...commonProps}>
            {item.children && item.children.map(renderNavItem)}
          </NavCollapse>
        );
      case 'item':
        return <NavMenuItem {...commonProps} />;
      default:
        console.warn(`Tipo de item desconocido: ${item.type}`);
        return null;
    }
  };

  return (
    <List component="nav" disablePadding className={classes.sideNavMenu}>
      {menuItems && menuItems.map(renderNavItem)}
    </List>
  );
};

export default CmtVertical;