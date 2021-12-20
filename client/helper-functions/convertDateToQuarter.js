function convertDateAndQuartersToFiscalPeriod(date, quarters) {
  let year = date.slice(0, 4)
  let month = date.slice(4, 6)
  let day = date.slice(6, 8)
  let fiscalPeriod
  if (quarters === '1' || quarters === null) {
    if (month === '03') {
      fiscalPeriod = 'Q1'
    } else if (month === '06') {
      fiscalPeriod = 'Q2'
    } else if (month === '09') {
      fiscalPeriod = 'Q3'
    } else if (month === '12') {
      fiscalPeriod = 'Q4'
    }
  } else if (quarters === '2') {
    if (month === '6') {
      fiscalPeriod = 'H1'
    } else if (month === '12') {
      fiscalPeriod = 'H2'
    }
  } else if (quarters === '4') {
    fiscalPeriod = 'FY'
  }

  if (fiscalPeriod === 'FY') {
    fiscalPeriod += year
  } else {
    fiscalPeriod = `${fiscalPeriod}'${year}`
  }

  return fiscalPeriod
}

export default convertDateAndQuartersToFiscalPeriod
