<template>
  <div class="page">
    <span class="page__title">{{ $route.query.id ? 'Изменение товара' : 'Добавление нового товара' }}</span>
    <div class="page__block">
      <span class="page__block__title">Название товара</span>
      <input 
        class="page__block__input  clear_button_style" 
        type="text"
        v-model.trim="name"
      >
    </div>
    <div class="page__block">
      <span class="page__block__title">Название селлера</span>
      <input 
        class="page__block__input  clear_button_style" 
        type="text"
        v-model.trim="seller"
      >
    </div>
    <div class="page__block">
      <span class="page__block__title">Способ интеграции</span>
      <SelectComponent 
        class="sel" 
        v-model="integration" 
        :sel="integration" 
        :options="options" 
      />
    </div>
    <button 
      class="page__block__button  clear_button_style" 
      @click="productAction()"
      :class="{button_disable: (name=='' || seller=='') || (route.query.id!=undefined && (name=='' || seller==''))}"
    >
      <span>{{ $route.query.id ? 'Обновить данные товара' : 'Добавить товар' }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { productListItem } from '@/store';
import SelectComponent from '@/components/SelectComponent.vue';

const store = useStore();
const route = useRoute();
const router = useRouter();
let name = ref<string>('');
let seller = ref<string>('');
let integration = ref<'reels' | 'stories'>();
const product = ref<productListItem>();
const options = [
  {value: 'reels', title: 'Reels'},
  {value: 'stories', title: 'Stories'}
]

// Получаем данные товара.
const getProductById = () => {
  for(let item of store.state.productList){
    if(item.id == route.query.id){
      product.value = item;
      break;
    }
  }
  if(product.value){
    name.value = product.value.name;
    seller.value = product.value.seller;
    integration.value = product.value.integration;
  } else {
    router.push('/');
  }
}

/* Если страница в "режиме" редактирования товара, то тогда вызываем  
функцию обновления его данных, а если нет, то добовляем его. */
const productAction = () => {
  if(product.value && route.query.id != undefined && name.value != '' && seller.value != '' && integration.value){
    const newProduct: productListItem = {
      id: Number(product.value.id),
      name: name.value,
      seller: seller.value,
      integration: integration.value
    };
    store.dispatch('updateItemInProductList', newProduct);
    router.push('/');
  } else if(name.value && seller.value && integration.value) {
    const newProduct: productListItem = {
      id: Date.now(),
      name: name.value,
      seller: seller.value,
      integration: integration.value
    };
    store.dispatch('addItemToProductList', newProduct);
    router.push('/');
  }
}

onMounted(() => {
  if(route.query.id){
    // Если страница в "режиме" редактирования товара, то тогда получаем его данные.
    getProductById();
  } else {
    integration.value = options[0].value as 'reels';
  }
})

defineComponent({
  name: 'AddProductPage',
});
</script>

<style lang="scss" scoped>
$mainOrange: rgb(254,114,0);
$mainDarkOrange: rgb(211, 67, 0);

.page {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding: 100px 0px 100px 0px;
  width: 1440px;
  margin: 0 auto;
  &__title {
    font-size: 50px;
    font-weight: 600;
    margin-bottom: 25px;
  }
  &__block {
    width: fit-content;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    &__title {
      font-size: 30px;
      margin: 10px 0px;
    }
    &__input {
      height: 50px;
      border-radius: 5px;
      border: 2px solid $mainOrange;
      font-size: 20px;
      padding: 0px 10px;
      cursor: text;
      &:focus {
        border: 2px solid $mainDarkOrange;
      }
    }
    &__button {
      width: fit-content;
      background-color: $mainOrange;
      color: white;
      padding: 10px 40px;
      font-size: 25px;
      border-radius: 5px;
      margin-top: 20px;
      &:hover {
        background-color: $mainDarkOrange;
      }
    }
  }
}

.button_disable {
  background-color: gray;
  cursor: default;
  &:hover {
    background-color: gray;
  }
}

@media (max-width: 1500px) {
  .page {
    width: 1000px;
    padding: 70px 0px 70px 0px;
    &__title {
      font-size: 45px;
      margin-bottom: 20px;
    }
  }
  .page__block__title {
    font-size: 25px;
  }
}
@media (max-width: 1000px) {
  .page {
    width: 95%;
    padding: 50px 0px 50px 0px;
    &__title {
      font-size: 35px;
      margin-bottom: 15px;
    }
  }
  .page__block {
    &__title {
      font-size: 20px;
    }
    &__input {
      font-size: 18px;
      height: 45px;
    }
    &__button {
      font-size: 20px;
    }
  }
  .sel {
    height: 45px;
    padding: 0px 5px;
  }
}
@media (max-width: 500px) {
  .page {
    padding: 35px 0px 35px 0px;
    &__title {
      font-size: 27px;
      margin-bottom: 10px;
    }
  }
  .page__block {
    margin-bottom: 5px;
    &__title {
      font-size: 16px;
    }
    &__input {
      font-size: 16px;
      height: 40px;
    }
    &__button {
      font-size: 18px;
      margin-top: 10px;
    }
  }
  .sel {
    height: 40px;
    padding: 0px 5px;
  }
}
@media (max-width: 400px) {
  .page {
    padding: 15px 0px 15px 0px;
    &__title {
      font-size: 25px;
      margin-bottom: 5px;
    }
  }
  .page__block {
    margin-bottom: 5px;
    &__button {
      font-size: 16px;
    }
    &__input {
      font-size: 16px;
      height: 35px;
    }
    &__button {
      font-size: 16px;
      margin-top: 10px;
    }
  }
  .sel {
    height: 35px;
    padding: 0px 5px;
  }
}
</style>