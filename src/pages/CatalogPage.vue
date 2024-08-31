<template>
  <div class="page">
    <span class="page__title">Каталог</span>
    <div class="page__main">
      <div class="page__main__list">
        <span class="page__main__controls__title" v-if="pagesCount == 0">Нет товаров</span>
        <div 
          class="page__main__list__item"
          v-for="item in getReviewsData"
          :key="item.id"
        >
          <div class="page__main__list__item__data">
            <div class="page__main__list__item__data__poster">
              <img 
                class="page__main__list__item__data__poster__image"
                src="https://sc01.alicdn.com/kf/HLB1Dgg3MwHqK1RjSZFgq6y7JXXak.jpg" 
                alt="Товар"
              >
            </div>
            <div class="page__main__list__item__data__info">
              <span class="page__main__list__item__data__info__title">{{ `${item.name} (${item.seller})` }}</span>
              <span class="page__main__list__item__data__info__subtitle">{{ item.integration }}</span>
            </div>
          </div>
          <div class="page__main__list__item__controls">
            <button class="page__main__list__item__controls__edit  clear_button_style" @click="$router.push(`/add_product?id=${item.id}`)">&#9998;</button>
            <button class="page__main__list__item__controls__remove  clear_button_style" @click="store.dispatch('removeItemFromProductList',item.id)">&#215;</button>
          </div>
        </div>
        <div class="page__main__list__pagination">
          <button 
            class="page__main__list__pagination__item  clear_button_style" 
            v-for="n in pagesCount" 
            :key="n" 
            @click="selectedPage=n"
            :class="{pagination__selected: n==selectedPage}"
          >
            {{ n }}
          </button>
        </div>
      </div>
      <div class="page__main__controls">
        <span class="page__main__controls__title">Меню управления</span>
        <span class="page__main__controls__subtitle">Новый товар</span>
        <button class="page__main__controls__add-button  clear_button_style" @click="$router.push('/add_product')">Добавить</button>
        <span class="page__main__controls__subtitle">Сортировка по названию</span>
        <SelectComponent v-model="selectedSort" :sel="selectedSort" :options="sortOptions" />
        <span class="page__main__controls__subtitle">Фильтрация по способу интеграции</span>
        <SelectComponent v-model="selectedFilter" :sel="selectedFilter" :options="filterOptions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import SelectComponent from '@/components/SelectComponent.vue';

const store = useStore();
const prodsOnPage: number = 20;
let selectedPage = ref<number>(1);
let pagesCount = ref<number>(1);
const sortOptions = [
  {value: 'up', title: 'От А до Я'},
  {value: 'down', title: 'От Я до А'}
]
const filterOptions = [
  {value: 'any', title: 'Любая'},
  {value: 'reels', title: 'Reels'},
  {value: 'stories', title: 'Stories'}
]
let selectedSort = ref<string>();
let selectedFilter = ref<string>();

const getReviewsData = computed(() => {
  let prodList = store.state.productList ? [...store.state.productList] : [];

  prodList = prodList.filter(item => selectedFilter.value == 'any' || item.integration == selectedFilter.value);
  pagesCount.value = Math.ceil(prodList.length / prodsOnPage);
  if(pagesCount.value != 0 && selectedPage.value > pagesCount.value){
    selectedPage.value = pagesCount.value;
  }
  prodList = prodList.slice(selectedPage.value * prodsOnPage - prodsOnPage, selectedPage.value * prodsOnPage);
  prodList.sort((item1,item2) => {
    if(selectedSort.value == 'up'){
      return item1.name.localeCompare(item2.name)
    }
    return item2.name.localeCompare(item1.name)
  })

  return prodList
})

onMounted(()=>{
  selectedSort.value = sortOptions[0].value;
  selectedFilter.value = filterOptions[0].value;
})

defineComponent({
  name: 'CatalogPage',
});
</script>

<style lang="scss" scoped>
$blockMargin: calc(100vw / 54.85714);
$borderRadius: calc(100vw / 76.8);
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
  &__main {
    display: flex;
    flex-grow: 1;
    &__list {
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      background-color: rgb(240, 240, 240);
      border-radius: $borderRadius;
      padding: 10px;
      &__item {
        display: flex;
        height: 100px;
        border-radius: 20px;
        overflow: hidden;
        margin-bottom: 10px;
        &__data {
          display: flex;
          flex-grow: 1;
          padding: 10px;
          &__poster {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            aspect-ratio: 1/1;
            background-color: $mainOrange;
            border-radius: 20px;
            overflow: hidden;
            &__image {
              height: 100%;
            }
          }
          &__info {
            display: flex;
            flex-direction: column;
            margin-left: 20px;
            &__title {
              width: fit-content;
              font-size: 30px;
              margin-bottom: 5px;
              cursor: pointer;
              &:hover {
                color: $mainOrange;
                text-decoration: underline;
              }
              &::first-letter {
                text-transform: uppercase;
              }
            }
            &__subtitle {
              font-size: 20px;
              color: gray;
            }
          }
        }
        &__controls {
          display: flex;
          &__edit {
            height: 100%;
            aspect-ratio: 1/1;
            font-size: 30px;
            color: $mainOrange;
            &:hover {
              background-color: white;
              color: black;
            }
          }
          &__remove {
            height: 100%;
            aspect-ratio: 1/1;
            font-size: 45px;
            color: $mainOrange;
            &:hover {
              background-color: rgb(235,76,66);
              color: white;
            }
          }
        }
        transition: box-shadow ease-out 0.25s;
        &:hover {
          box-shadow: 5px 5px 10px 5px lightgray;
        }
      }
      &__pagination {
        display: flex;
        justify-content: center;
        margin-top: auto;
        margin-bottom: 10px;
        &__item {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 50px;
          margin-right: 5px;
          color: rgb(223, 223, 225);
          background-color: $mainOrange;
          border-radius: 5px;
          font-size: 18px;
          transition: background-color ease 0.25s;
          &:hover {
            background-color: $mainDarkOrange;
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
    &__controls {
      width: 400px;
      height: fit-content;
      display: flex;
      flex-direction: column;
      margin-left: $blockMargin;
      background-color: rgb(240, 240, 240);
      border-radius: $borderRadius;
      padding: 20px;
      &__title {
        font-size: 30px;
        font-weight: 600;
        text-align: center;
      }
      &__add-button {
        background-color: $mainOrange;
        color: white;
        padding: 10px 20px;
        font-size: 20px;
        border-radius: 5px;
        &:hover {
          background-color: $mainDarkOrange;
        }
      }
      &__subtitle {
        font-size: 20px;
        margin: 10px 0px;
      }
      &__select {
        height: 50px;
        border-radius: 5px;
        border: 2px solid $mainOrange;
        font-size: 16px;
        padding: 0px 10px;
      }
    }
  }
}

.pagination__selected {
  font-weight: 600;
  text-decoration: underline;
  background-color: $mainDarkOrange;
}
</style>