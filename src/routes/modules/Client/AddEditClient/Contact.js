import React from 'react';
import { Box } from '@material-ui/core';
import CmtCard from '../../../../@coremat/CmtCard';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import PropTypes from 'prop-types';
import { alpha, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import UserIcon from '@material-ui/icons/AccountBox';
import infoIcon from '@material-ui/icons/CheckBox';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import blue from '@material-ui/core/colors/blue';
import { geValidUrl } from '../../../../@jumbo/utils/commonHelper';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  iconView: {
    backgroundColor: alpha(blue['500'], 0.1),
    color: blue['500'],
    padding: 8,
    borderRadius: 4,
    '& .MuiSvgIcon-root': {
      display: 'block',
    },
    '&.web': {
      backgroundColor: alpha(theme.palette.warning.main, 0.1),
      color: theme.palette.warning.main,
    },
    '&.phone': {
      backgroundColor: alpha(theme.palette.success.main, 0.15),
      color: theme.palette.success.dark,
    },
  },
  wordAddress: {
    wordBreak: 'break-all',
    cursor: 'pointer',
  },
}));

const Contact = ({ userDetail }) => {
  const { email, phone, name } = userDetail;
  const classes = useStyles();

  const [checked, setChecked] = React.useState(false);
  const toggleChecked = () => {
    setChecked(prev => !prev);
  };

  return (
    <CmtCard>
      <CmtCardContent>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 6 }}>
          <Box ml={5}>
            <Box style={{ marginLeft: '20px' }} component="span" fontSize={12} color="text.secondary">
              Estado
            </Box>
            <Box style={{ marginLeft: '20px' }}>
              <FormControlLabel control={<Switch checked={checked} onChange={toggleChecked} />} label="Activado" />
            </Box>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 6 }}>
          <Box className={clsx(classes.iconView, 'web')}>
            <UserIcon />
          </Box>
          <Box ml={5}>
            <Box component="span" fontSize={12} color="text.secondary">
              Nombre y Apellido
            </Box>
            <Box component="p" className={classes.wordAddress} fontSize={16}>
              <Box>{name}</Box>
            </Box>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 6 }}>
          <Box className={classes.iconView}>
            <MailOutlineIcon />
          </Box>
          <Box ml={5}>
            <Box component="span" fontSize={12} color="text.secondary">
              Email
            </Box>
            <Box component="p" className={classes.wordAddress} fontSize={16}>
              <Box component="a" href={`mailto:${email}`}>
                {email}
              </Box>
            </Box>
          </Box>
        </Box>

        <Box display="flex" alignItems="center">
          <Box className={clsx(classes.iconView, 'phone')}>
            <LocalPhoneIcon />
          </Box>
          <Box ml={5}>
            <Box component="span" fontSize={12} color="text.secondary">
              Telefono/Cel:
            </Box>
            <Box component="p" className={classes.wordAddress} fontSize={16} color="text.primary">
              {phone}
            </Box>
          </Box>
        </Box>
      </CmtCardContent>
    </CmtCard>
  );
};

export default Contact;

Contact.prototype = {
  userDetail: PropTypes.object.isRequired,
};
