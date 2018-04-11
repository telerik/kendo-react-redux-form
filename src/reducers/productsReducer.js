import data from '../data/products.json';
let initialState = {
  products: data
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {

    case "ITEM_ADD":
      let makeNewID = Math.random() * new Date().getMilliseconds() * 100
      let newProductID = Math.floor(makeNewID)
      let productForAdd = action.payload
      productForAdd.ProductID = newProductID;
      let productsAfterAdd = state.products.slice()
      productsAfterAdd.unshift(productForAdd)
      let newStateAdd = Object.assign({ products: productsAfterAdd }, {});
      return newStateAdd;

    case "ITEM_UPDATE":
      let products = state.products.map((product) => {
        if (product.ProductID === action.payload.ProductID) {
          return action.payload
        }
        return product
      })
      let newState = Object.assign({ products: products }, {});
      return newState;

    case "ITEM_DELETE":
      let index = state.products.findIndex(product => product.ProductID === action.payload.ProductID);
      let productsAfterDelete = state.products.slice()
      productsAfterDelete.splice(index, 1)
      let newStateDelete = Object.assign({ products: productsAfterDelete }, {});
      return newStateDelete;

    default:
      return state
  }
}