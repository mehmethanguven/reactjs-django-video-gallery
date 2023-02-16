import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

export function useForm(
  initialFValues,
  validateOnChange = false,
  validate,
  handleReset,
) {
  const [values, setValues] = useState(initialFValues);
  const [fieldTitles, setFieldTitles] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e, v) => {
    const { name, value } = e.target;
    console.log('name', v);
    if (v) {
      setValues({
        ...values,
        category: v,
      });
      console.log('setted Values', values);
    }

    if (name === 'city') {
      setValues({
        ...values,
        [name]: value,
        town: '',
        district: '',
      });
    } else if (name === 'colName') {
      setValues({
        ...values,
        [name]: value,
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
    if (name === 'city' || name === 'town' || name === 'district') {
      const title = e.nativeEvent.target.innerText;
      setFieldTitles({
        ...fieldTitles,
        [name + 'Name']: title,
      });
    }
    if (name === 'tutor') {
      const title = e.nativeEvent.target.innerText;
      setFieldTitles({
        ...fieldTitles,
        [name + 'Name']: title,
      });
    }

    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialFValues);
    handleReset();
    setErrors({});
  };

  return {
    values,
    setValues,
    fieldTitles,
    setFieldTitles,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1),
    },
  },
}));

export function Form(props) {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form className={classes.root} autoComplete='off' {...other}>
      {props.children}
    </form>
  );
}
