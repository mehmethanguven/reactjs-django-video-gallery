export function titleCase(str) {
	const formattedStr = str.replace(/\w\S*/g, function(txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
	})

	//	console.log('formattedStr', formattedStr)
	return formattedStr
}
