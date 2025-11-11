import React, { useState } from 'react';
import { Collapse, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const NavCollapse = ({ name, icon, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItem button onClick={() => setOpen(!open)}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText>
          {name} {/* Renderiza directamente el elemento React */}
        </ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div style={{ paddingLeft: 32 }}>
          {children}
        </div>
      </Collapse>
    </>
  );
};

export default NavCollapse;