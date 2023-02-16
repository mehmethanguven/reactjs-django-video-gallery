import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core'

export default function SelectColumn(props) {

	const { name, label,value, error = null, onChange, options } = props

	return (
		<FormControl variant='outlined' {...error && { error: true }}>
			<InputLabel>{label}</InputLabel>
			<MuiSelect label={label} name={name} value={value} onChange={onChange}>
				{/* <MenuItem value='FirstName'>{intl.formatMessage({ id: 'SELECT' })}</MenuItem> */}
				{options &&
					options.map(
						(item) =>
							item && (
								<MenuItem
									key={item}
									value={item}
								>
									{item}
								</MenuItem>
							)
					)}
			</MuiSelect>
			{error && <FormHelperText>{error}</FormHelperText>}
		</FormControl>
	)
}
