module.exports = {
  dateFormat: (date) => {
    if (date) {
      return new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      }).format(new Date(date));
    }

    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }).format(new Date());
  },
  timeFormat: (date) => {
    if (date) {
      return new Intl.DateTimeFormat('ru-RU', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }).format(new Date(date));
    }
    return null;
  },
};
