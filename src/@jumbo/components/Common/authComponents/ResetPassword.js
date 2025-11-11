import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Box, Collapse } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import useStyles from './styles';
import AuthWrapper from './AuthWrapper';
import ContentLoader from '../../ContentLoader';
import CmtImage from '../../../../@coremat/CmtImage';
import IntlMessages from '../../../utils/IntlMessages';
import { CurrentAuthMethod } from '../../../constants/AppConstants';
import { AuhMethods } from '../../../../services/auth';

//variant = 'default', 'standard', 'bgColor'
const ResetPassword = ({ method = CurrentAuthMethod, variant = 'default', wrapperVariant = 'default' }) => {
  const { resetPasswordEmail, resetPasswordEmailSuccess } = useSelector(({ auth }) => auth);
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles({ variant });
  const history = useHistory();

  useEffect(() => {
    if (!resetPasswordEmail) {
      history.push('/login');
    }
  }, [resetPasswordEmail]);

  useEffect(() => {
    if (resetPasswordEmailSuccess) {
      setOpen(true);
      setTimeout(() => {
        history.push('/signin');
      }, 4000);
    }
  }, [resetPasswordEmailSuccess]);

  const onSubmit = e => {
    e.preventDefault();
    dispatch(AuhMethods[method].onChangePassword(resetPasswordEmail, password, repeatPassword));
  };

  return (
    <AuthWrapper variant={wrapperVariant}>
      {variant === 'default' ? (
        <Box className={classes.authThumb}>
          <CmtImage src={'/images/auth/sign-up-img.png'} />
        </Box>
      ) : null}
      <Box className={classes.authContent}>
        <Box mt={8} mb={4} style={{ textAlign: 'center' }}>
          <CmtImage src={'/images/logo.png'} />
        </Box>
        <Box mb={3}>
          <Typography component="div" variant="h2" className={classes.titleRoot}>
            Ingrese su nueva contraseña
          </Typography>
        </Box>
        <Typography component="p">
          Cree una nueva contraseña para el usuario <b>{resetPasswordEmail}</b>
        </Typography>
        <form onSubmit={onSubmit}>
          <Box>
            <TextField
              type="password"
              label={<IntlMessages id="appModule.password" />}
              fullWidth
              onChange={event => setPassword(event.target.value)}
              defaultValue={password}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
              required
              autoFocus
            />
          </Box>
          <Box mb={4}>
            <TextField
              type="password"
              label={<IntlMessages id="appModule.repeatPassword" />}
              fullWidth
              onChange={event => setRepeatPassword(event.target.value)}
              defaultValue={repeatPassword}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
              required
            />
          </Box>
          <Box mb={4} style={{ display: resetPasswordEmailSuccess ? 'none' : 'auto' }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              <IntlMessages id="appModule.createNewPassword" />
            </Button>
          </Box>
        </form>
        <Collapse in={open} className={classes.collapseContainer}>
          <Alert variant="outlined" severity="success" className={classes.alertRoot}>
            El cambio de contraseña se realizó con éxito. Será redirigido al login.
          </Alert>
        </Collapse>
        <ContentLoader />
      </Box>
    </AuthWrapper>
  );
};

export default ResetPassword;
