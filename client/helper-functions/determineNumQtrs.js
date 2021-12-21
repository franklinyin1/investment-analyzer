function determineNumQtrs(submissions, currentQuarter, statementName) {

  if (statementName === 'BS') {
    return null
  }

  submissions = submissions.filter((submission) => {
    return submission.form === '10-Q' || submission.form === '10-K'
  })
  if (submissions[0].form === '10-K') {
    return '4'
  }

  let quarterMonth = currentQuarter.slice(4,6)

  if (quarterMonth === '06'){
    if (statementName === 'IS') {
      return '1'
    }

    if (statementName === 'CF') {
      return '2'
    }
  }

  return '1'
}

export default determineNumQtrs
