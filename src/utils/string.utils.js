export function stringHashCode(string) {
	if (string.length === 0) return 0
	return string.split('').reduce((res, char) => {
		res = ((res << 5) - res) + char.charCodeAt(0)
		return res & res
	}, 0)
}
