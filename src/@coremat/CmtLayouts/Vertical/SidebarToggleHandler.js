import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LayoutContext from '../LayoutContext';

const SidebarToggleHandler = ({ children, ...restProps }) => {
  const { isSidebarOpen, setSidebarOpen } = useContext(LayoutContext);

  return (
    <IconButton className="Cmt-toggle-menu" onClick={() => setSidebarOpen(!isSidebarOpen)} {...restProps}>
      {children || <CloseIcon />}
    </IconButton>
  );
};

export default SidebarToggleHandler;
