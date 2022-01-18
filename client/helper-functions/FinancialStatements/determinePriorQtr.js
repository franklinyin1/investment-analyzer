function determinePriorQtr(submissions, currentQtr, statementName) {

  submissions = submissions.filter((submission) => {
    return submission.form === '10-Q' || submission.form === '10-K'
  })

  let year = currentQtr.slice(0,4)
  let priorYear = `${Number(year)-1}`
  let month = currentQtr.slice(4,6)
  let day = currentQtr.slice(6,8)
  let fye = submissions[0].fye

  if (submissions[0].form === '10-K') {
    return priorYear + month + day
  }

  if (month === '06') {
    if (statementName === 'IS' || statementName === 'CF') {
      return priorYear + month + day
    }

    if (statementName === 'BS') {
      return priorYear + fye
    }
  }

  return priorYear + month + day
}

export default determinePriorQtr
