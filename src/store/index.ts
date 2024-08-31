import { createStore } from 'vuex'

interface productListItem {
  id: number;
  name: string;
  seller: string;
  integration: 'reels' | 'stories';
}

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
    addItemToProductList({state, commit, dispatch}, newItem: productListItem){
      const productList: productListItem[] = [...state.productList, newItem];
      commit('setProductList', productList);
      dispatch('writeProductListToStorage');
    },
    removeItemFromProductList({state, commit, dispatch}, id: number){
      let productList: productListItem[] = [...state.productList];
      productList = productList.filter(item => item.id != id);
      commit('setProductList', productList);
      dispatch('writeProductListToStorage');
    },
    updateItemInProductList({state, commit, dispatch}, newItem: productListItem){
      let productList: productListItem[] = [...state.productList];
      productList = productList.map(item => item.id == newItem.id ? newItem : item);
      commit('setProductList', productList);
      dispatch('writeProductListToStorage');
    },
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
