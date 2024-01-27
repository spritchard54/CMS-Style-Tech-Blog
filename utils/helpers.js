module.exports = {
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
      new Date(date).getFullYear()
    }` + " at " + date.toLocaleTimeString([], {
      timeStyle: 'short'});
  },
  sort: (arr) => {
    return arr.sort((a, b) => {
      return a.id - b.id;
  });
  }
};