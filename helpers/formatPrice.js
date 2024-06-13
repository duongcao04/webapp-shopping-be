function formatPrice(stringInp) {
	if (!stringInp) return
	const arr = stringInp.split('_')
	if (arr[0] === 'tren') {
		arr[0] = '$gt'
	} else {
		arr[0] = '$lte'
	}
	const result = JSON.parse(` {"${arr[0]}" : "${arr[1]}" }`)
	return result
}
module.exports = { formatPrice }