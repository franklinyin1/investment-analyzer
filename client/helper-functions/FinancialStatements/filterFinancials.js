function filterFinancials(company, statementName, currentQuarter, numQtrs){
  //filter financials to only include statementName items
  let financials = company.financials.filter((financial) => {
    let presentation = company.presentations.filter((presentation) => {
      return presentation.adsh === financial.adsh && presentation.stmt === statementName && presentation.tag === financial.tag
    })
    return presentation.length > 0
  })

  //filter financials to only include current quarter
  let currentQuarterFinancials = financials.filter((financial) => {
    return financial.ddate === currentQuarter && (financial.qtrs === numQtrs || numQtrs === null)
  })

  //add presentation detail as a key-value pair of each financial object
  currentQuarterFinancials = currentQuarterFinancials.map(financial => {
    let presentation = company.presentations.filter((presentation) => {
      return presentation.adsh === financial.adsh && presentation.stmt === statementName && presentation.tag === financial.tag
    })
    if (presentation.length > 0){
      financial.presentation = presentation
    } else {
      financial.presentation = [{line: Infinity}]
    }
    return financial
  })

  //sort the current quarter financials based on order of appearance in the income statement
  currentQuarterFinancials = currentQuarterFinancials.sort((x,y) => x.presentation[0].line - y.presentation[0].line)

  //remove all current quarter financials without a specified line on the income statement
  currentQuarterFinancials = currentQuarterFinancials.filter((financial) => financial.presentation[0].line !== Infinity)

  return currentQuarterFinancials
}

export default filterFinancials

