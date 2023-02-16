import React from 'react'
import { TextField } from '@material-ui/core'

export default function Input(props) {
	const { name, label, value, error = null, onChange, inputProps, InputProps, type, multiline } = props
	return (
		<TextField
			variant='outlined'
			autoComplete='new-password'
			multiline={multiline}
			label={label}
			name={name}
			type={type}
			value={value}
			onChange={onChange}
			inputProps={inputProps}
			InputProps={InputProps}
			{...error && { error: true, helperText: error }}
		/>
	)
}
