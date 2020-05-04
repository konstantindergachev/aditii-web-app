export default {
  users: {
    fetchUser: async (user) => {
      const { payload: oneUser } = user;
      try {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify(oneUser),
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
          },
        });
        const user = await response.json();
        return user;
      } catch (err) {
        return err.message;
      }
    },
    createUser: async (user) => {
      const { payload: oneUser } = user;
      try {
        const response = await fetch('/api/users/register', {
          method: 'POST',
          body: JSON.stringify(oneUser),
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
          },
        });
        const user = await response.json();
        return user;
      } catch (err) {
        return err.message;
      }
    },
  },
  products: {
    fetchAllCategories: async () => {
      try {
        const response = await fetch('/api/products/categories');
        const categories = await response.json();
        return categories;
      } catch (err) {
        return err.message;
      }
    },
    fetchFirstProductsOfEachCategory: async () => {
      try {
        const response = await fetch('/api/products/first-product-of-each-category');
        const products = await response.json();
        return products;
      } catch (err) {
        return err.message;
      }
    },
    fetchAllProductsOfCategory: async (categoryName) => {
      try {
        const response = await fetch(`/api/products/category?categoryName=${categoryName}`);
        const products = await response.json();
        return products;
      } catch (err) {
        return err.message;
      }
    },
    fetchAllProducts: async () => {
      try {
        const response = await fetch('/api/products');
        const products = await response.json();
        return products;
      } catch (err) {
        return err.message;
      }
    },
  },
  cart: {
    addToCart: async (cartItem, token) => {
      try {
        const response = await fetch('/api/users/cart', {
          method: 'POST',
          body: JSON.stringify(cartItem),
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: token,
          },
        });
        const cart = await response.json();
        return cart;
      } catch (err) {
        return err.message;
      }
    },
    removeOneItemFromCart: async (cartItem, token) => {
      try {
        const response = await fetch('/api/users/remove_one_item_from_cart', {
          method: 'POST',
          body: JSON.stringify(cartItem),
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: token,
          },
        });
        const cart = await response.json();
        return cart;
      } catch (err) {
        return err.message;
      }
    },
    removeAllItemsOfOneCategoryFromCart: async (cartItem, token) => {
      try {
        const response = await fetch('/api/users/remove_all_items_of_one_category_from_cart', {
          method: 'POST',
          body: JSON.stringify(cartItem),
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: token,
          },
        });
        const cart = await response.json();
        return cart;
      } catch (err) {
        return err.message;
      }
    },
    clearCart: async (token) => {
      try {
        const response = await fetch('/api/users/remove_cart', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: token,
          },
        });
        const cart = await response.json();
        return cart;
      } catch (err) {
        return err.message;
      }
    },
    makeAPurchase: async (cart) => {
      const { payload } = cart;
      try {
        const response = await fetch('/api/users/buy', {
          method: 'POST',
          body: JSON.stringify(payload.purchase),
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: payload.token,
          },
        });
        const purchase = await response.json();
        return purchase;
      } catch (err) {
        return err.message;
      }
    },
  },
};
