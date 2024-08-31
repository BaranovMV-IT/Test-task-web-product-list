<template>
  <select 
    class="select  clear_button_style"
    v-model="selectedOption">
    <option 
      v-for="option in options"
      :value="option.value"
      :key="option.value"
    >
      {{ option.title }}
    </option>
  </select>
</template>

<script lang="js">
export default {
  name: 'SelectComponent',
  props: {
    sel: {
      type: String
    },
    options: {
      type: Array,
      required: true
    }
  },
  data(){
    return {
      selectedOption: ''
    }
  },
  watch: {
    // Эмитим выбранное значение в родительский компонент.
    selectedOption(){
      this.$emit("update:modelValue", this.selectedOption);
    }
  },
  beforeUpdate(){
    // Устанавливаем переданное значение по-умолчанию.
    if(this.sel){
      for(let optn of this.options){
        if(optn.value == this.sel){
          this.selectedOption = this.sel;
          break;
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.select {
  height: 50px;
  border-radius: 5px;
  border: 2px solid rgb(254,114,0);
  font-size: 16px;
  padding: 0px 10px;
}
</style>