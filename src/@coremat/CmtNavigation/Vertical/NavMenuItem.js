import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

const NavMenuItem = ({ name, icon, link }) => {
  return (
    <ListItem 
      button 
      component={Link} 
      to={link || '#'}
      style={{ paddingLeft: 20 }}
    >
      {icon && <ListItemIcon style={{ fontSize: 10 }}>{icon}</ListItemIcon>}
      <ListItemText>
        {name} {/* Renderiza directamente el elemento React */}
      </ListItemText>
    </ListItem>
  );
};

export default NavMenuItem;