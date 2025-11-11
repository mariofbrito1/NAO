import React from 'react';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import CmtAvatar from '../../../../@coremat/CmtAvatar';

import { useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import ClearIcon from '@material-ui/icons/Clear';
import useStyles from './index.style';
const ProviderDetailView = ({ open, onCloseDialog }) => {
  const classes = useStyles();
  const { currentProvider } = useSelector(({ ProvidersReducer }) => ProvidersReducer);
  const { name, profile_pic } = currentProvider;

  return (
    <Dialog open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
      <Box className={classes.userInfoRoot}>
        <Box mr={3} display="flex" alignItems="center">
          <Box className={classes.avatarView} mr={{ xs: 4, md: 6 }}>
            <CmtAvatar size={70} src={profile_pic} alt={name} />
          </Box>
        </Box>

        <Box px={6} py={5}>
          <Box mb={5} component="p" color="common.dark">
            Detalle de Proveedor
          </Box>
        </Box>

        <Box ml="auto" mt={-2} display="flex" alignItems="center">
          <Box ml={1}>
            <IconButton onClick={onCloseDialog}>
              <ClearIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ProviderDetailView;

ProviderDetailView.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
