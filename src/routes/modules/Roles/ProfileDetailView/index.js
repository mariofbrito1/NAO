import React from 'react';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import CmtAvatar from '../../../../@coremat/CmtAvatar';

import { useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import ClearIcon from '@material-ui/icons/Clear';
import EmailIcon from '@material-ui/icons/Email';
import useStyles from './index.style';
import { Block, CheckCircleOutline } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';

const UserDetailView = ({ open, onCloseDialog }) => {
  const classes = useStyles();
  const { currentUser } = useSelector(({ usersReducer }) => usersReducer);

  const { name, email, profile_pic, status } = currentUser;

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
            Detalle de Perfil
          </Box>
          <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
            <EmailIcon />
            <Box ml={5} color="primary.main" component="p" className="pointer">
              {email}
            </Box>
          </Box>
        </Box>

        <Box ml="auto" mt={-2} display="flex" alignItems="center">
          <Box ml={1}>
            <Tooltip title={status}>
              <IconButton aria-label="filter list">
                {status === 'suspended' && <Block color="primary" />}
                {status === 'active' && <CheckCircleOutline color="primary" />}
              </IconButton>
            </Tooltip>
          </Box>
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

export default UserDetailView;

UserDetailView.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
