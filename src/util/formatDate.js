const getTime = (longDate) => {
  const displayedDate =
    longDate.getHours() +
    ":" +
    longDate.getMinutes() +
    ":" +
    longDate.getSeconds();
  const startDate = {
    date: longDate,
    dateDispaly: displayedDate,
  };
  return startDate;
};

module.exports = { getTime };
