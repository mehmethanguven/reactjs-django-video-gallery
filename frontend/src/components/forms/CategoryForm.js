import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as actions from '../../redux/categories/categoriesActions';
import Loader from '../Loader';
import { Grid, Typography } from '@material-ui/core';
import Controls from '../controls/Controls';
import { useForm, Form } from '../useForm';

export const CategoryForm = () => {
  const { currentState } = useSelector(
    (state) => ({ currentState: state.categories }),
    shallowEqual,
  );
  const { itemForEdit, listLoading } = currentState;
  const dispatch = useDispatch();
  const [isExists, setIsExists] = useState(false);

  const handleReset = () => {
    setIsExists(false);
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('name' in fieldValues) temp.name = fieldValues.name ? '' : 'Required';

    // if ('isActive' in fieldValues)
    // 	temp.isActive = fieldValues.isActive ? '' : intl.formatMessage({ id: 'ERRORS.REQUIRED' })

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === '');
  };

  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    itemForEdit,
    true,
    validate,
    handleReset,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      if (itemForEdit._id) {
        dispatch(actions.updateCategory(values));
      } else {
        dispatch(actions.addCategory(values));
      }

      // clearTowns()
      // resetForm()
    } else {
      console.log('Form is not valid');
    }
  };

  return (
    <Form onSubmit={handleSubmit} autoComplete='off'>
      <Typography
        variant='h5'
        component='h5'
        className='d-flex justify-content-center mb-5'
      >
        {itemForEdit && itemForEdit._id !== '' ? 'Edit' : 'Add'}
      </Typography>

      {listLoading ? (
        <Loader />
      ) : (
        <Grid container>
          <Grid item xs={12} className='text-center'>
            <Controls.Input
              className='d-flex justify-content-center '
              name='name'
              label='Name'
              value={values.name}
              onChange={handleInputChange}
              error={errors.name}
            />
          </Grid>

          <Grid item xs={12} className='text-center'>
            <Controls.Checkbox
              name='isActive'
              label='isActive'
              value={values.isActive}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <div className='d-flex justify-content-center mt-15'>
              <Controls.Button
                disabled={isExists}
                type='submit'
                text='Submit'
              />
              <Controls.Button
                text='Reset'
                color='default'
                onClick={resetForm}
              />
            </div>
          </Grid>
        </Grid>
      )}
    </Form>
  );
};

export default CategoryForm;
