const getDate = () => {
  const currentDate = new Date();
  const displayedDate =
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();
  const startDate = {
    date: currentDate,
    dateDispaly: displayedDate,
  };
  return startDate;
};

module.exports = { getDate };
