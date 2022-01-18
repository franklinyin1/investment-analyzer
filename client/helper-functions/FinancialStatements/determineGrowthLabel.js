function determineGrowthLabel(submissions, currentQtr, statementName) {

  submissions = submissions.filter((submission) => {
    return submission.form === '10-Q' || submission.form === '10-K'
  })

  let month = currentQtr.slice(4,6)

  if (submissions[0].form === '10-K') {
    return 'YoY Growth'
  }

  if (month === '06') {
    if (statementName === 'IS' || statementName === 'CF') {
      return 'YoY Growth'
    }

    if (statementName === 'BS') {
      return 'YTD growth'
    }
  }

  return 'YoY Growth'
}

export default determineGrowthLabel
