import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

import useStyles from './styles';
import AuthWrapper from './AuthWrapper';
import ContentLoader from '../../ContentLoader';
import IntlMessages from '../../../utils/IntlMessages';
import CmtImage from '../../../../@coremat/CmtImage';
import { setForgetPassMailSent, setResetPasswordEmail, setResetPasswordEmailSuccess } from 'redux/actions/Auth';
import { AuhMethods } from '../../../../services/auth';
import { CurrentAuthMethod } from '../../../constants/AppConstants';

//variant = 'default', 'standard'
const SignIn = ({ method = CurrentAuthMethod, variant = 'default', wrapperVariant = 'default' }) => {
  const { sendForgetPasswordEmail, resetPasswordEmail, resetPasswordEmailSuccess } = useSelector(({ auth }) => auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles({ variant });

  const onSubmit = e => {
    e.preventDefault();
    dispatch(AuhMethods[method].onLogin({ email, password }));
  };

  useEffect(() => {
    if (sendForgetPasswordEmail) {
      dispatch(setForgetPassMailSent(false));
    }

    if (resetPasswordEmailSuccess) {
      dispatch(setResetPasswordEmailSuccess(false));
      dispatch(setResetPasswordEmail(''));
    }
  }, [sendForgetPasswordEmail, resetPasswordEmail, resetPasswordEmailSuccess]);

  return (
    <>
      <AuthWrapper variant={wrapperVariant}>
        {variant === 'default' ? (
          <Box className={classes.authThumb}>
            <CmtImage src={'/images/auth/login-img.png'} />
          </Box>
        ) : null}
        <Box className={classes.authContent}>
          <Box mt={4} mb={4} style={{ textAlign: 'center' }}>
            <CmtImage width={300} src={'/images/logo.png'} />
          </Box>
          <Typography component="div" variant="h2" className={classes.titleRoot}>
            Ingresos
          </Typography>
          <form onSubmit={onSubmit}>
            <Box>
              <TextField
                label={<IntlMessages id="appModule.email" />}
                fullWidth
                onChange={event => setEmail(event.target.value)}
                defaultValue={email}
                margin="normal"
                variant="outlined"
                className={classes.textFieldRoot}
                required
                autoFocus
              />
            </Box>
            <Box mb={2}>
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
              />
            </Box>
            <Box mb={4}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                <IntlMessages id="appModule.signIn" />
              </Button>
            </Box>
            <Box component="p" fontSize={{ xs: 14, sm: 16 }} className={classes.linkContainer}>
              <NavLink to="/forgot-password" className={classes.link}>
                <IntlMessages id="appModule.forgotPassword" />
              </NavLink>
            </Box>
          </form>
          <ContentLoader />
        </Box>
      </AuthWrapper>
    </>
  );
};

export default SignIn;
