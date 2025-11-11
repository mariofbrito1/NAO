import React from 'react';
import { Typography, Divider } from '@material-ui/core';

const NavSection = ({ name, children }) => {
  return (
    <div style={{ width: '100%', marginBottom: 16 }}>
      {name && (
        <>
          <Typography variant="overline" display="block" gutterBottom>
            {name} {/* Renderiza directamente el elemento React */}
          </Typography>
          <Divider />
        </>
      )}
      {children}
    </div>
  );
};

export default NavSection;