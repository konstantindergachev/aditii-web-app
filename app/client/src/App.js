import PropTypes from 'prop-types';
import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cart from './components/cart/Cart';
import Navbar from './components/navbar/Navbar';
import Spinner from './components/ui/spinner/Spinner';
import { calcCartItemLength, saveProductsToAppState } from './helpers';
import Footer from './layout/footer/Footer';
import Header from './layout/header/Header';
import { categoriesReceiver, oneProductsOfEachCategoryReceiver } from './redux/actions/products-actions';

const HomePage = lazy(() => import('./pages/homepage/HomePage'));
const AuthPage = lazy(() => import('./pages/authpage/AuthPage'));
const HistoryPage = lazy(() => import('./pages/historypage/HistoryPage'));
const PopularPage = lazy(() => import('./pages/popularpage/PopularPage'));
const ContactPage = lazy(() => import('./pages/contactpage/ContactPage'));
const StuffPage = lazy(() => import('./pages/stuffpage/StuffPage'));
const ProductDetail = lazy(() => import('./components/product-detail/ProductDetail'));
const AboutPage = lazy(() => import('./pages/aboutpage/AboutPage'));
const StoreAddressesPage = lazy(() => import('./pages/storeaddressespage/StoreAddressesPage'));
const OrderPage = lazy(() => import('./pages/orderpage/OrderPage'));
const ExchangePage = lazy(() => import('./pages/exchangepage/ExchangePage'));
const RewiewsPage = lazy(() => import('./pages/rewiewspage/RewiewsPage'));
const NewPage = lazy(() => import('./pages/newpage/NewPage'));
const BestSellersPage = lazy(() => import('./pages/bestsellerspage/BestSellersPage'));
const OffersPage = lazy(() => import('./pages/offerspage/OffersPage'));
const ComingSoonPage = lazy(() => import('./pages/comingsoonpage/ComingSoonPage'));

class App extends Component {
  state = {
    isAuth: false,
    username: '',
    cartLength: 0,
    allProductsOfCategory: {
      handbags: {},
      accessories: {},
      mens_store: {},
      shoes: {},
      vintage: {},
      wallets: {},
    },
  };
  static getDerivedStateFromProps(props, state) {
    const { user, carts } = props;
    if (!Object.keys(user).length) {
      const products = saveProductsToAppState(props, state);
      return {
        isAuth: false,
        username: '',
        cartLength: 0,
        ...products,
      };
    }
    if (Object.keys(user).length) {
      const products = saveProductsToAppState(props, state);
      return {
        isAuth: user.isAuth,
        username: user.name,
        cartLength: carts.length ? calcCartItemLength(carts) : 0,
        ...products,
      };
    }
    return saveProductsToAppState(props, state);
  }
  componentDidMount() {
    this.props.oneProductsOfEachCategoryReceiver();
    this.props.categoriesReceiver();
  }

  renderMainProductPageRoute = (categories, allProductsOfCategory) => {
    return categories.map((category) => {
      return (
        <Route
          key={category._id}
          exact
          path={`/${category.name}`}
          render={(props) => {
            return <StuffPage categoryName={category.name} allProductsOfCategory={allProductsOfCategory} />;
          }}
        />
      );
    });
  };
  renderProductPageDetailRoute = (categories) => {
    return categories.map((category) => {
      return <Route key={category._id} exact path={`/${category.name}/:id`} component={ProductDetail} />;
    });
  };

  render() {
    const { oneProdOfEachCat, categories, popularProduct } = this.props;
    const { isAuth, username, allProductsOfCategory, cartLength } = this.state;
    return (
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <div className="container">
            <Header allProductsOfCategory={allProductsOfCategory} isAuth={isAuth} username={username} cartLength={cartLength} />
            <Navbar allProductsOfCategory={allProductsOfCategory} isAuth={isAuth} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <HomePage
                    {...props}
                    oneProdOfEachCat={oneProdOfEachCat}
                    categories={categories}
                    popularProduct={popularProduct}
                    allProductsOfCategory={allProductsOfCategory}
                  />
                )}
              />
              <Route exact path="/auth" component={AuthPage} />
              {this.renderMainProductPageRoute(categories, allProductsOfCategory)}
              {this.renderProductPageDetailRoute(categories)}
              <Route exact path="/popular" component={PopularPage} />
              <Route exact path="/history" component={HistoryPage} />
              <Route exact path="/contacts" component={ContactPage} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/about_store" component={AboutPage} />
              <Route exact path="/store_addresses" component={StoreAddressesPage} />
              <Route exact path="/order" component={OrderPage} />
              <Route exact path="/exchange" component={ExchangePage} />
              <Route exact path="/rewiews" component={RewiewsPage} />
              <Route exact path="/new" component={NewPage} />
              <Route exact path="/best_sellers" component={BestSellersPage} />
              <Route exact path="/special_offers" component={OffersPage} />
              <Route exact path="/coming_soon" component={ComingSoonPage} />
            </Switch>
            <Footer />
          </div>
        </Suspense>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  user: PropTypes.object.isRequired,
  carts: PropTypes.array.isRequired,
  oneProdOfEachCat: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  popularProduct: PropTypes.object.isRequired,
  oneProductsOfEachCategoryReceiver: PropTypes.func.isRequired,
  categoriesReceiver: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { users, products, categories, carts } = state;
  return {
    user: users.user,
    oneProdOfEachCat: products.oneProductOfEachCategory,
    categories: categories.categories,
    popularProduct: categories.popularProduct,
    allProductsOfCategory: products.allProductsOfCategory,
    carts: carts.cart,
  };
};
export default connect(mapStateToProps, {
  oneProductsOfEachCategoryReceiver,
  categoriesReceiver,
})(App);
