import React from 'react';
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';

export default function Select(props) {
  const { name, label, value, error = null, onChange, options } = props;

  return (
    <FormControl variant='outlined' {...(error && { error: true })}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange}>
        <MenuItem value=''>Select</MenuItem>
        {options &&
          options.map(
            (item) =>
              item && (
                <MenuItem
                  key={item._id ? item._id : item.id}
                  value={item.key ? item.key : item.id ? item.id : item.title}
                >
                  {item.title}
                </MenuItem>
              ),
          )}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
