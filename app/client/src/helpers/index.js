export const saveProductsToAppState = (props, state) => {
  const { handbags, accessories, mens_store, shoes, vintage, wallets } = props.allProductsOfCategory;
  const { allProductsOfCategory } = state;
  if (allProductsOfCategory.length) {
    return {
      categories: props.categories,
      allProductsOfCategory: props.allProductsOfCategory,
    };
  }
  if (handbags && handbags.length) {
    return {
      allProductsOfCategory: {
        handbags: handbags,
        accessories: allProductsOfCategory.accessories,
        mens_store: allProductsOfCategory.mens_store,
        shoes: allProductsOfCategory.shoes,
        vintage: allProductsOfCategory.vintage,
        wallets: allProductsOfCategory.wallets,
      },
    };
  }
  if (accessories && accessories.length) {
    return {
      allProductsOfCategory: {
        handbags: allProductsOfCategory.handbags,
        accessories,
        mens_store: allProductsOfCategory.mens_store,
        shoes: allProductsOfCategory.shoes,
        vintage: allProductsOfCategory.vintage,
        wallets: allProductsOfCategory.wallets,
      },
    };
  }
  if (mens_store && mens_store.length) {
    return {
      allProductsOfCategory: {
        handbags: allProductsOfCategory.handbags,
        accessories: allProductsOfCategory.accessories,
        mens_store,
        shoes: allProductsOfCategory.shoes,
        vintage: allProductsOfCategory.vintage,
        wallets: allProductsOfCategory.wallets,
      },
    };
  }
  if (shoes && shoes.length) {
    return {
      allProductsOfCategory: {
        handbags: allProductsOfCategory.handbags,
        accessories: allProductsOfCategory.accessories,
        mens_store: allProductsOfCategory.mens_store,
        shoes,
        vintage: allProductsOfCategory.vintage,
        wallets: allProductsOfCategory.wallets,
      },
    };
  }
  if (vintage && vintage.length) {
    return {
      allProductsOfCategory: {
        handbags: allProductsOfCategory.handbags,
        accessories: allProductsOfCategory.accessories,
        mens_store: allProductsOfCategory.mens_store,
        shoes: allProductsOfCategory.shoes,
        vintage,
        wallets: allProductsOfCategory.wallets,
      },
    };
  }
  if (wallets && wallets.length) {
    return {
      allProductsOfCategory: {
        handbags: allProductsOfCategory.handbags,
        accessories: allProductsOfCategory.accessories,
        mens_store: allProductsOfCategory.mens_store,
        shoes: allProductsOfCategory.shoes,
        vintage: allProductsOfCategory.vintage,
        wallets,
      },
    };
  }
  return null;
};

export const calcCartItemLength = (cart) => {
  if (!cart.length) {
    return 0;
  }
  return cart.map((item) => item.quantity).reduce((acc, cur) => acc + cur);
};

export const receiveCategoryName = (oneProdOfEachCat, categories) => {
  const updOneProdOfEachCat = oneProdOfEachCat.map((item) => {
    categories.forEach((cat) => {
      if (item._id === cat._id) {
        item['categoryName'] = cat.name;
      }
    });
    return item;
  });
  receiveFirstFourCategory(updOneProdOfEachCat);
  return updOneProdOfEachCat;
};

export const receiveFirstFourCategory = (oneProdOfEachCat) => {
  return oneProdOfEachCat
    .map((item) => ({
      id: item._id,
      img: item.productImages[0].url,
      category: item.categoryName,
    }))
    .slice(0, 4);
};

export function changeCountOfProduct(payload, totalPrice, flag) {
  const { id, cart } = payload;
  const selectedProduct = Array.isArray(cart) ? cart.find((item) => item._id === id) : cart;
  if (flag === 'increment') {
    selectedProduct.quantity = selectedProduct.quantity + 1;
    totalPrice = selectedProduct.price + totalPrice;
  } else if (flag === 'decrement') {
    selectedProduct.quantity = selectedProduct.quantity - 1;
    totalPrice = totalPrice - selectedProduct.price;
    if (Array.isArray(cart)) {
      const updCart = cart.filter((item) => item.quantity !== 0);
      return { cart: updCart, totalPrice };
    } else if (selectedProduct.quantity === 0) {
      return { cart: [], totalPrice: 0 };
    }
    return { cart, totalPrice };
  }
  return { cart, totalPrice };
}

export const getActionCreator = (categoryName, actionCreator) => {
  switch (categoryName) {
    case 'handbags':
      actionCreator(categoryName);
      break;
    case 'wallets':
      actionCreator(categoryName);
      break;
    case 'accessories':
      actionCreator(categoryName);
      break;
    case 'mens_store':
      actionCreator(categoryName);
      break;
    case 'shoes':
      actionCreator(categoryName);
      break;
    case 'vintage':
      actionCreator(categoryName);
      break;
    default:
      return 'such category not exist!';
  }
};

export const categoriesName = {
  handbags: 'handbags',
  wallets: 'wallets',
  accessories: 'accessories',
  mens_store: 'mens store',
  shoes: 'shoes',
  vintage: 'vintage',
};

export const setAuthToken = (token) => {
  let myHeaders = new Headers();
  if (token) {
    myHeaders.append('Authorization', token);
  } else {
    myHeaders.delete('Authorization');
  }
};

export const uuid = () => {
  const p1 = Math.random().toString(36).slice(-8);
  const p2 = Math.random().toString(36).slice(-4);
  const p3 = Math.random().toString(36).slice(-4);
  const p4 = Math.random().toString(36).slice(-4);
  const p5 = Math.random().toString(36).slice(-10);
  return `${p1}-${p2}-${p3}-${p4}-${p5}`;
};
