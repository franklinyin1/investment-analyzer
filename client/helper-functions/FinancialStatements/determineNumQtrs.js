function determineNumQtrs(submissions, currentQuarter, statementName) {

  if (statementName === 'BS') {
    return null
  }

  submissions = submissions.filter((submission) => {
    return submission.form === '10-Q' || submission.form === '10-K'
  })
  let fye = submissions[0].fye;
  let fyeEndMonth = fye.slice(0,2)

  if (submissions[0].form === '10-K') {
    return '4'
  }

  let quarterMonth = currentQuarter.slice(4,6)

  if (statementName === 'IS') {
    return '1'
  }

  if (statementName ==='CF') {
    if (fyeEndMonth === '12') {
      if (quarterMonth === '03') {
        return '1'
      } else if (quarterMonth === '06') {
        return '2'
      } else if (quarterMonth === '09') {
        return '3'
      } else if (quarterMonth === '12') {
        return '4'
      }
    } else if (fyeEndMonth === '09') {
      if (quarterMonth === '12') {
        return '1'
      } else if (quarterMonth === '03') {
        return '2'
      } else if (quarterMonth === '06') {
        return '3'
      } else if (quarterMonth === '09') {
        return '4'
      }
    } else if (fyeEndMonth === '06') {
      if (quarterMonth === '09') {
        return '1'
      } else if (quarterMonth === '12') {
        return '2'
      } else if (quarterMonth === '03') {
        return '3'
      } else if (quarterMonth === '06') {
        return '4'
      }
    } else if (fyeEndMonth === '03') {
      if (quarterMonth === '06') {
        return '1'
      } else if (quarterMonth === '09') {
        return '2'
      } else if (quarterMonth === '12') {
        return '3'
      } else if (quarterMonth === '03') {
        return '4'
      }
    }
  }

  return '1'
}

export default determineNumQtrs
