import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/categories/categoriesActions';
//import { useHistory } from 'react-router-dom'
import CategoryForm from '../forms/CategoryForm';

export function CategoryEditDialog({ open }) {
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
          <Button
            className='float-right'
            onClick={handleClose}
            variant='contained'
            color='secondary'
          >
            X
          </Button>
        </DialogTitle>
        <DialogContent>
          <CategoryForm />
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
