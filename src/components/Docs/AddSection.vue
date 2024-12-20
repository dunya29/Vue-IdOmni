<script setup>
const props = defineProps({
    addSecLoading: Boolean
})
import { reactive } from 'vue';
const emit = defineEmits(['addNewSec'])
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
const secFormOnSubmit = async () => {
    if (nameField.value.length > 0) {
        let newSec = {
            "title": nameField.value
        }
        emit('addNewSec', newSec)
        nameField.error = false
    } else {
        nameField.error = true
    }
}
</script>
<template>
    <div class="add-section">
        <form class="form" @submit.prevent="secFormOnSubmit">
            <div class="form__items">
                <div class="item-form">
                    <input type="text" name="title" placeholder="введите название раздела" v-model="nameField.value">
                    <div data-error="" v-if="nameField.error">{{ nameField.errorTxt }}</div>
                </div>
            </div>
            <button class="btn primary-btn">
                <span :class="addSecLoading && 'loading'">Добавить раздел<svg><use xlink:href="/static/img/icons/sprite.svg#plus"></use></svg></span>            
            </button>
        </form>
    </div>
</template>