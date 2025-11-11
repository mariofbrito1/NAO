import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { alpha } from '@material-ui/core/styles';
import CmtImage from '../../../../@coremat/CmtImage';
import CmtAvatar from '../../../../@coremat/CmtAvatar';

const useStyles = makeStyles(theme => ({
  headerRoot: {
    position: 'relative',
    margin: '-30px -15px 0 -15px',
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 30,
    paddingBottom: 20,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 56,
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: -50,
      marginRight: -50,
      paddingLeft: 50,
      paddingRight: 50,
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: -65,
      marginRight: -65,
      paddingLeft: 65,
      paddingRight: 65,
    },
    [theme.breakpoints.up('xl')]: {
      marginLeft: -88,
      marginRight: -88,
      paddingLeft: 88,
      paddingRight: 88,
    },
  },
  headerBgImg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    minHeight: 370,
    zIndex: 0,
    [theme.breakpoints.up('sm')]: {
      minHeight: 270,
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      backgroundColor: alpha(theme.palette.primary.main, 0.5),
    },
    '& img': {
      width: '100%',
      height: '100%',
    },
  },
  headerContent: {
    position: 'relative',
    zIndex: 3,
  },
  titleRoot: {
    color: theme.palette.common.white,
    marginBottom: 4,
  },
  subTitleRoot: {
    color: alpha(theme.palette.common.white, 0.74),
  },
  followerList: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: -15,
    marginRight: -15,
    [theme.breakpoints.up('md')]: {
      marginLeft: -24,
      marginRight: -24,
    },
  },
  followerListItem: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    cursor: 'pointer',
    color: alpha(theme.palette.common.white, 0.74),
    fontSize: 12,
    [theme.breakpoints.up('md')]: {
      paddingLeft: 24,
      paddingRight: 24,
    },
    '&:not(:first-child)': {
      borderLeft: `solid 1px ${alpha(theme.palette.common.white, 0.38)}`,
    },
  },
  followerListTitle: {
    color: theme.palette.common.white,
    marginBottom: 3,
  },
  tabsList: {
    position: 'relative',
    minHeight: 10,
    '& .MuiTabs-indicator': {
      backgroundColor: alpha(theme.palette.common.white, 0.4),
    },
  },
  tabItem: {
    maxWidth: 'none',
    minWidth: 10,
    minHeight: 10,
    padding: '5px 10px',
    textTransform: 'capitalize',
    color: theme.palette.common.white,
    fontSize: 14,
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Header = ({ providerDetail, tabValue, handleTabChange }) => {
  const { title, provider_pic, location } = providerDetail;
  const classes = useStyles();

  return (
    <Box className={classes.headerRoot}>
      <Box className={classes.headerBgImg}>
        <CmtImage src={'/images/auth/auth-bg-pattern.png'} />
      </Box>
      <Box className={classes.headerContent}>
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center" mb={4}>
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center">
            <Box className={classes.avatarView} mr={{ xs: 4, md: 6 }}>
              <CmtAvatar size={130} src={provider_pic} alt={title} />
            </Box>
            <Box>
              <Typography className={classes.titleRoot} component="div" variant="h1">
                {title}
              </Typography>
              <Typography className={classes.subTitleRoot}>{location}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;

Header.prototype = {
  userDetail: PropTypes.object.isRequired,
  tabValue: PropTypes.string.isRequired,
  handleTabChange: PropTypes.func,
};
