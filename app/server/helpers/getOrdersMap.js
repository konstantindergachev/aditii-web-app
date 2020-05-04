const { dateFormat } = require('./dateFormat');

module.exports = {
  getOrdersMap(orders = []) {
    const daysOrders = {};
    orders.forEach((order) => {
      const date = dateFormat(order.createdAt);
      if (date === dateFormat()) return;
      if (!daysOrders[date]) daysOrders[date] = [];
      daysOrders[date].push(order);
    });
    return daysOrders;
  },
};
