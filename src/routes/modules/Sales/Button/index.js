/* eslint-disable react/react-in-jsx-scope */
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';

const ButtonPurchase = ({ text, color }) => {
  const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  const theme = createTheme({
    palette: {
      primary: green,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Button variant="outlined" color={color} className={classes.margin}>
        {text}
      </Button>
    </ThemeProvider>
  );
};

export default ButtonPurchase;
