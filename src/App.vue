<template>
  <div class="wrapper">
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useStore } from 'vuex';

const store = useStore();

onBeforeMount(async () => {
  const locStore = localStorage.getItem('productList');
  if(locStore && locStore != '[]'){
    await store.dispatch('readProductListFromStorage');
  } else {
    localStorage.setItem('productList', `[
      {"id": 1,"name": "milk", "seller": "tod", "integration": "reels"},
      {"id": 2,"name": "eggs", "seller": "john", "integration": "stories"},
      {"id": 3,"name": "bread", "seller": "max", "integration": "stories"},
      {"id": 4,"name": "seeds", "seller": "rey", "integration": "stories"},
      {"id": 5,"name": "salad", "seller": "andrew", "integration": "stories"},
      {"id": 6,"name": "fish", "seller": "tod", "integration": "stories"},
      {"id": 7,"name": "meat", "seller": "john", "integration": "stories"},
      {"id": 8,"name": "pork", "seller": "max", "integration": "stories"},
      {"id": 9,"name": "beef", "seller": "rey", "integration": "stories"},
      {"id": 10,"name": "oranges", "seller": "andrew", "integration": "stories"},
      {"id": 11,"name": "juice", "seller": "tod", "integration": "stories"},
      {"id": 12,"name": "carrots", "seller": "john", "integration": "stories"},
      {"id": 13,"name": "garlic", "seller": "max", "integration": "stories"},
      {"id": 14,"name": "tomatoes", "seller": "rey", "integration": "stories"},
      {"id": 15,"name": "bananas", "seller": "andrew", "integration": "stories"},
      {"id": 16,"name": "apples", "seller": "tod", "integration": "reels"},
      {"id": 17,"name": "chicken", "seller": "john", "integration": "stories"},
      {"id": 18,"name": "crabs", "seller": "max", "integration": "stories"},
      {"id": 19,"name": "salmon", "seller": "rey", "integration": "stories"},
      {"id": 20,"name": "tea", "seller": "andrew", "integration": "stories"},
      {"id": 21,"name": "coffee", "seller": "tod", "integration": "stories"},
      {"id": 22,"name": "wine", "seller": "john", "integration": "reels"},
      {"id": 23,"name": "water", "seller": "max", "integration": "stories"},
      {"id": 24,"name": "ham", "seller": "rey", "integration": "stories"},
      {"id": 25,"name": "lemon", "seller": "andrew", "integration": "reels"}
    ]`);
    await store.dispatch('readProductListFromStorage');
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.wrapper {
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
span {
  white-space: nowrap;
}

.clear_button_style {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  transition: all ease-out 0.25s;
}
</style>
