import { alpha, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  authContent: {
    backgroundColor: 'white',
    padding: '0 30px',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      order: 1,
      width: props => (props.variant === 'default' ? '50%' : '100%'),
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '800px',
      paddingBottom: '16px',
    },
    borderRadius: 4,
  },
  authThumb: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
      order: 2,
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  titleRoot: {
    color: theme.palette.text.primary,
  },
  textFieldRoot: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette.common.dark, 0.12),
    },
  },
  formcontrolLabelRoot: {
    '& .MuiFormControlLabel-label': {
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
  },
  collapseContainer: {
    [theme.breakpoints.up('md')]: {
      marginBottom: 16,
    },
  },
  alertRoot: {
    marginBottom: 16,
  },
  resetPasswordButtonsContainer: {
    display: props => (props.sendForgetPasswordEmail ? 'none' : 'flex'),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  resetPasswordButton: {
    marginBottom: '12px',
    [theme.breakpoints.up('md')]: {
      marginBottom: 0,
      marginRight: '4px',
    },
  },
  cancelButton: {
    [theme.breakpoints.up('md')]: {
      marginLeft: '4px',
    },
  },
  linkContainer: {
    textAlign: 'center',
  },
  link: {
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default useStyles;
