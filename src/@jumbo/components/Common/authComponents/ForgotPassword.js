import React, {useEffect, useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {Box, Collapse} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

import useStyles from "./styles";
import AuthWrapper from "./AuthWrapper";
import ContentLoader from "../../ContentLoader";
import IntlMessages from "../../../utils/IntlMessages";
import CmtImage from "../../../../@coremat/CmtImage";
import {CurrentAuthMethod} from "../../../constants/AppConstants";
import {AuhMethods} from "../../../../services/auth";

//variant = 'default', 'standard', 'bgColor'
const ForgotPassword = ({
  method = CurrentAuthMethod,
  variant = "default",
  wrapperVariant = "default"
}) => {
  const {sendForgetPasswordEmail} = useSelector(({auth}) => auth);
  const [ open, setOpen ] = React.useState(false);
  const [ email, setEmail ] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles({variant, sendForgetPasswordEmail});
  const history = useHistory();

  useEffect(
    () => {
      if (sendForgetPasswordEmail) {
        setOpen(true);
      }
    },
    [ sendForgetPasswordEmail ]
  );

  const onSubmit = e => {
    e.preventDefault();
    dispatch(AuhMethods[method].onForgotPassword(email));
  };

  return (
    <AuthWrapper variant={wrapperVariant}>
      {variant === "default" ? (
        <Box className={classes.authThumb}>
          <CmtImage src={"/images/auth/forgot-img.png"} />
        </Box>
      ) : null}
      <Box className={classes.authContent}>
        <Box mt={8} mb={4} style={{textAlign: "center"}}>
          <CmtImage src={"/images/logo.png"} />
        </Box>
        <Box mb={3}>
          <Typography
            component="div"
            variant="h2"
            className={classes.titleRoot}
          >
            ¿No recuerdas tu contraseña?
          </Typography>
        </Box>
        <Typography component="p">
          Ingresa tu dirección de email y te enviaremos un correo con los pasos
          para recuperar tu contraseña.
        </Typography>
        <form onSubmit={onSubmit}>
          <Box mb={4}>
            <TextField
              label={<IntlMessages id="appModule.email" />}
              fullWidth
              onChange={event => setEmail(event.target.value)}
              defaultValue={email}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
              disabled={sendForgetPasswordEmail}
              autoFocus
            />
          </Box>
          <Box className={classes.resetPasswordButtonsContainer}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.resetPasswordButton}
            >
              <IntlMessages id="appModule.resetPassword" />
            </Button>
            <Button
              onClick={() => history.push("/signin")}
              variant="contained"
              color="secondary"
              fullWidth
              className={classes.cancelButton}
            >
              <IntlMessages id="appModule.cancel" />
            </Button>
          </Box>
        </form>
        <Collapse in={open} className={classes.collapseContainer}>
          <Alert
            variant="outlined"
            severity="success"
            className={classes.alertRoot}
          >
            Enviamos un correo a <b>admin@aberturasNAO.com</b> con la
            nueva contraseña. Recuenrda solicitar dicha información para cambiar
            o renovar tu clave
          </Alert>
          <Box
            component="p"
            fontSize={{xs: 14, sm: 16}}
            className={classes.linkContainer}
          >
            Ya puedes{" "}
            <NavLink to="/signin" className={classes.link}>
              iniciar sesión
            </NavLink>
          </Box>
        </Collapse>
        <ContentLoader />
      </Box>
    </AuthWrapper>
  );
};

export default ForgotPassword;
