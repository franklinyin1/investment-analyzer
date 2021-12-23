let summationStats = [
  'MarketCap',
  'TotalAssetValue',
  'EnterpriseValue'
]

function summations(tag) {
  return summationStats.includes(tag) ? true : false
}


export default summations
