import React, { useEffect } from 'react';
import { Slide, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import PageLoader from '../PageComponents/PageLoader';
import { hideMessage } from '../../../redux/actions';

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const ContentLoader = () => {
  const { error, loading, message, showMessage, warning } = useSelector(({ common }) => common);
  const dispatch = useDispatch();
  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        dispatch(hideMessage());
      }, 3000);
    }
  }, [dispatch, showMessage]);

  return (
    <React.Fragment>
      {loading && <PageLoader />}
      {
        <Snackbar
          open={Boolean(error)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          TransitionComponent={SlideTransition}>
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        </Snackbar>
      }
      {
        <Snackbar
          open={Boolean(message)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          TransitionComponent={SlideTransition}>
          <Alert variant="filled" severity="success">
            {message}
          </Alert>
        </Snackbar>
      }
      {
        <Snackbar
          open={Boolean(warning)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          TransitionComponent={SlideTransition}>
          <Alert variant="filled" severity="warning">
            {warning}
          </Alert>
        </Snackbar>
      }
    </React.Fragment>
  );
};

export default ContentLoader;
