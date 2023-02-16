import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/videos/videosActions';
//import { useHistory } from 'react-router-dom'
import { VideoForm } from '../forms/VideoForm';

export function VideoEditDialog({ open }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(actions.handleDialogEditForm({ open: false }));
  };

  //let history = useHistory()

  return (
    <div>
      <Dialog
        maxWidth={'sm'}
        fullWidth={true}
        open={open}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        {' '}
        <DialogTitle id='customized-dialog-title'>
          <Grid container>
            <Grid item xs={11} className='text-center'>
              Add Video
            </Grid>
            <Grid item xs={1}>
              <Button
                className='float-right'
                onClick={handleClose}
                variant='contained'
                color='secondary'
              >
                X
              </Button>
            </Grid>
          </Grid>
          <span></span>
        </DialogTitle>
        <DialogContent>
          <VideoForm />
          {/* <ServerForm /> */}
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
