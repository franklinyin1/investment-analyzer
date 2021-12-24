let perShareItems = [
  'EarningsPerShareBasic',
  'EarningsPerShareDiluted',
]


function isPerShareItem(item){
  if (perShareItems.includes(item)) {
    return true
  } else {
    return false
  }
}

export default isPerShareItem
