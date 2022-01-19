function determineGrowthLabel(submissions, currentQtr, statementName) {

  submissions = submissions.filter((submission) => {
    return submission.form === '10-Q' || submission.form === '10-K'
  })

  let fye = submissions[0].fye;
  let fyeEndMonth = fye.slice(0,2)
  let month = currentQtr.slice(4,6)

  if (month !== fyeEndMonth && statementName === 'BS') {
    return 'YTD Growth'
  } else {
    return 'YoY Growth'
  }

}

export default determineGrowthLabel
