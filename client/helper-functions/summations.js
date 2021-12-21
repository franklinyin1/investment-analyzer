let summationStats = [
  //Income Statement
  'OperatingIncomeLoss',
  'NetIncomeLoss',
  //Balance Sheet
  'AssetsCurrent',
  'Assets',
  'LiabilitiesCurrent',
  'Liabilities',
  'StockholdersEquity',
  'LiabilitiesAndStockholdersEquity',
  //Cash Flow Statement
  'NetCashProvidedByUsedInOperatingActivities',
  'NetCashProvidedByUsedInInvestingActivities',
  'NetCashProvidedByUsedInFinancingActivities'
]

function summations(tag) {
  return summationStats.includes(tag) ? true : false
}


export default summations
