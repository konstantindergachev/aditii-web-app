module.exports = {
  calculatePrice(orders = []) {
    return orders.reduce((total, order) => {
      const orderPrice = order.list.reduce((orderTotal, item) => {
        return (orderTotal += item.cost);
        // return (orderTotal += item.cost * item.quantity);
      }, 0);
      return (total += orderPrice);
    }, 0);
  },
};
