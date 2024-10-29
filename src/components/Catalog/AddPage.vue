<script setup>
const props = defineProps({
    addPageLoading: Boolean
})
import { reactive } from 'vue';
const emit = defineEmits(['addNewPage'])
const nameField = reactive({
    value: "",
    error: false,
    errorTxt: "Заполните поле"
})
const resetForm = () => {
    nameField.value = ""
}
defineExpose({
    resetForm
})
const pageFormOnSubmit = () => {
    if (nameField.value.length > 0) {
        let newPage = {
            "title": nameField.value
        }
        emit('addNewPage', newPage)
        nameField.error = false
    } else {
        nameField.error = true
    }
}
</script>
<template>
    <div class="add-page">
        <form class="form" @submit.prevent="pageFormOnSubmit">
            <div class="form__items">
                <div class="item-form">
                    <input type="text" name="title" placeholder="Введите название страницы" v-model="nameField.value">
                    <div data-error="" v-if="nameField.error">{{ nameField.errorTxt }}</div>
                </div>
            </div>
            <button class="btn primary-btn">
                <span :class="addPageLoading && 'loading'">Добавить страницу<svg><use xlink:href="../../assets/img/icons/sprite.svg#plus"></use></svg></span>            
            </button>
        </form>
    </div>
</template>