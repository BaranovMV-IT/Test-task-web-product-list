import { createStore } from 'vuex'

interface productListItem {
  id: number;
  name: string;
  seller: string;
  integration: 'reels' | 'stories';
}

export { productListItem }

export default createStore({
  state: {
    productList: [] as productListItem[]
  },
  mutations: {
    setProductList(state, value){
      state.productList = value;
    }
  },
  getters: {
  },
  actions: {
    // Записть товаров из localStorage.
    async readProductListFromStorage({commit}){
      try {
        if(localStorage.getItem("cart")){
          const productString: string | null = localStorage.getItem("productList");
          const productList: productListItem[] = await JSON.parse(productString ? productString : '[]');
          commit('setProductList', productList);
        }
      } catch(e){
        console.log(e);
      }
    },
    // Добавление нового товара.
    addItemToProductList({state, commit, dispatch}, newItem: productListItem){
      const productList: productListItem[] = [...state.productList, newItem];
      commit('setProductList', productList);
      dispatch('writeProductListToStorage');
    },
    // Удаление существующего товара.
    removeItemFromProductList({state, commit, dispatch}, id: number){
      let productList: productListItem[] = [...state.productList];
      productList = productList.filter(item => item.id != id);
      commit('setProductList', productList);
      dispatch('writeProductListToStorage');
    },
    // Обновление данных существующего товара.
    updateItemInProductList({state, commit, dispatch}, newItem: productListItem){
      let productList: productListItem[] = [...state.productList];
      productList = productList.map(item => item.id == newItem.id ? newItem : item);
      commit('setProductList', productList);
      dispatch('writeProductListToStorage');
    },
    // Записть товаров в localStorage.
    writeProductListToStorage({state}){
      try {
        localStorage.setItem("productList", JSON.stringify(state.productList));
      } catch(e){
        console.log(e);
      }
    },
  },
  modules: {
  }
})
