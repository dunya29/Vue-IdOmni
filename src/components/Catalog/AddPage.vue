<script setup>
const props = defineProps({
    addPageLoading: Boolean,
    formSuccess: Number
})
import { reactive, watch } from 'vue';
const emit = defineEmits(["addNewPage"])
const newPageName = reactive({
    value: "",
    error: false,
    errorTxt: "Заполните поле"
})
const pageFormOnSubmit = () => {
    newPageName.error = !newPageName.value ? true: false
    if (!newPageName.error) {
        //let formData = new FormData();
        let newPage = {
            "title": newPageName.value,
        }
        //formData.append("page", newPage);
        emit("addNewPage", newPage)
        //emit("addNewFile", formData)
    } 
}
watch(()=>props.formSuccess, () => {
    newPageName.value = "" 
}) 
</script>
<template>
    <div class="clients-docs__form">
        <h2>Создать новую страницу</h2>
        <form class="form" action="" @submit.prevent="pageFormOnSubmit">
            <div class="form__fieldset">
                <div class="form__items">
                    <div class="item-form">
                        <input type="text" name="title" placeholder="Название страницы*" v-model="newPageName.value">
                        <div data-error="" v-if="newPageName.error">{{  newPageName.errorTxt }}</div>
                    </div>
                </div>
            </div> 
            <div class="form__footer">
                <button type="submit" class="btn-reset main-btn" :disabled="addPageLoading">
                    <span :class="addPageLoading && 'loading'">Добавить страницу</span>
                </button>
            </div>
        </form> 
    </div>    
</template>
