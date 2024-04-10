function formatDate(isoString) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const nth = (d) => {
    if (d > 3 && d < 21) return 'th'
    switch (d % 10) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  const date = new Date(isoString)
  const day = date.getDate()
  const monthIndex = date.getMonth()
  const year = date.getFullYear()

  return `${day}${nth(day)} ${months[monthIndex]} ${year}`
}

function capitalize(string) {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  return ''
}

function formatNumber(number) {
  return Number(number.toFixed(2))
}

function reduceAmount(object, propName) {
  let total = 0
  total += object.reduce((acc, item) => acc + item[propName], 0)
  let grandTotal = formatNumber(total)
  console.log('grandTotal', grandTotal)
  return grandTotal
}

export { formatDate, capitalize, formatNumber, reduceAmount }
