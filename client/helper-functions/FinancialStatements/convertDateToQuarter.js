function convertDateAndQuartersToFiscalPeriod(date, quarters, submissions) {
  submissions = submissions.filter((submission) => {
    return submission.form === "10-Q" || submission.form === "10-K";
  });

  let year = date.slice(0, 4);
  let month = date.slice(4, 6);
  let day = date.slice(6, 8);
  let fye = submissions[0].fye;

  let fiscalPeriod;

  if (quarters === "4") {
    fiscalPeriod = "FY";
  }

  if (quarters === "3") {
    fiscalPeriod = "YTD";
  }

  if (fye === "1231") {
    if (quarters === "1" || quarters === null) {
      if (month === "03") {
        fiscalPeriod = "Q1";
      } else if (month === "06") {
        fiscalPeriod = "Q2";
      } else if (month === "09") {
        fiscalPeriod = "Q3";
      } else if (month === "12") {
        fiscalPeriod = "Q4";
      }
    } else if (quarters === "2") {
      if (month === "06") {
        fiscalPeriod = "H1";
      } else if (month === "12") {
        fiscalPeriod = "H2";
      }
    }
  } else if (fye === "0930") {
    if (quarters === "1" || quarters === null) {
      if (month === "12") {
        fiscalPeriod = "Q1";
      } else if (month === "03") {
        fiscalPeriod = "Q2";
      } else if (month === "06") {
        fiscalPeriod = "Q3";
      } else if (month === "09") {
        fiscalPeriod = "Q4";
      }
    } else if (quarters === "2") {
      if (month === "03") {
        fiscalPeriod = "H1";
      } else if (month === "09") {
        fiscalPeriod = "H2";
      }
    }
  } else if (fye === "0630") {
    if (quarters === "1" || quarters === null) {
      if (month === "09") {
        fiscalPeriod = "Q1";
      } else if (month === "12") {
        fiscalPeriod = "Q2";
      } else if (month === "03") {
        fiscalPeriod = "Q3";
      } else if (month === "06") {
        fiscalPeriod = "Q4";
      }
    } else if (quarters === "2") {
      if (month === "12") {
        fiscalPeriod = "H1";
      } else if (month === "06") {
        fiscalPeriod = "H2";
      }
    }
  } else if (fye === '0331') {
    if (quarters === "1" || quarters === null) {
      if (month === "06") {
        fiscalPeriod = "Q1";
      } else if (month === "09") {
        fiscalPeriod = "Q2";
      } else if (month === "12") {
        fiscalPeriod = "Q3";
      } else if (month === "03") {
        fiscalPeriod = "Q4";
      }
    } else if (quarters === "2") {
      if (month === "09") {
        fiscalPeriod = "H1";
      } else if (month === "03") {
        fiscalPeriod = "H2";
      }
    }
  }

  if (fiscalPeriod === "FY" || fiscalPeriod === "YTD") {
    fiscalPeriod += year;
  } else {
    fiscalPeriod = `${fiscalPeriod}'${year}`;
  }

  return fiscalPeriod;
}

export default convertDateAndQuartersToFiscalPeriod;
