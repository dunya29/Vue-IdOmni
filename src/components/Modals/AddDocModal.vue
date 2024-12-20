<script setup>
const props = defineProps({
    id: Number,
    title: String,
    maxOrderId: Number
})
import FileForm from '@/common/FileForm.vue';
import Modal from '@/common/Modal.vue';
import { inject, reactive, ref, useTemplateRef } from 'vue';
const emit = defineEmits(['closeAddDocMod'])
const addNewDoc = inject('addNewDoc')
const fileForm = useTemplateRef('fileForm')
const loading = ref(false)
let docFormFields = reactive([
    {
        field: "docName",
        value: "",
        required: true,
        error: false,
        errorTxt: "Заполните поле"
    },
    {
        field: "description",
        value: "",
    },
    {
        field: "files",
        value: [],
        required: true,
        error: false       
    }
])
let file = {
    types: [
    "video/mp4",//.mp4,
    "video/webm", //.webm
    "application/msword", //.doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", //docx
    "application/pdf", //.pdf
    "application/vnd.ms-excel", //.xls, .xlt,.xla
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", //.xlsx 
    ],
    format: ".mp4, .webm, .doc, .docx, .pdf, .xls, .xlt, .xla, .xlsx",
    size: 100 * 1024 * 1024
}
const setFileFieldValue = (name, val) => {
    docFormFields[name].value = val      
}
const fileFieldIsError = (name,val) => {
    docFormFields[name].error = val
}
const docFormOnSubmit = async () => {
    docFormFields.forEach(item => {
        if (item.required) {
            item.error = item.value.length > 0 ? false : true         
        }
    })
    if (!docFormFields.some(item => item.error)) {
        //let formData = new FormData();
        let newDoc = {
            "sectionId": props.id,
            "sectionTitle": props.title,
            "name": docFormFields[0].value,
            "content": docFormFields[1].value, 
            "docURL": docFormFields[2].value[0].url,
            "iconURL": "/icons/doc.svg",
            "download": false,
            "orderId": props.maxOrderId + 1
        }
        //formData.append("doc", newDoc);
        loading.value = true
        try {
            // await addNewDoc(formData)
            await addNewDoc(newDoc)
            docFormFields.forEach(item => {
                item.value = ""
            })
            fileForm.value.resetForm() 
            emit('closeAddDocMod')         
        } catch (err) {
            console.log(err)
        } finally {
            loading.value = false
        }
    } 
}
</script>
<template>
    <Modal title="Добавить Документ" @closeModal="emit('closeAddDocMod')">
        <form class="form doc-form" @submit.prevent="docFormOnSubmit">
            <div class="form__items">
                <div class="item-form">
                    <input type="text" name="name" placeholder="Название документа" v-model="docFormFields[0].value">
                    <div data-error="" v-if="docFormFields[0].error">{{ docFormFields[0].errorTxt }}</div>
                </div>
                <div class="item-form">
                    <input type="text" name="content" placeholder="Описание" v-model="docFormFields[1].value">
                </div>
                <FileForm ref="fileForm" :types="file.types" name="2" :emptyError="docFormFields[2].error" :format="file.format" :maxSize="file.size" @setFileFieldValue="setFileFieldValue" @fileFieldIsError="fileFieldIsError"/>           
            </div>
            <div class="form__footer">
                <button type="submit" class="btn primary-btn" :disabled="loading">
                    <span :class="loading && 'loading'">Сохранить</span>
                </button>
                <button type="reset" class="btn stroke-btn">
                    <span>Отменить</span>
                </button>
            </div> 
        </form>
    </Modal>   
</template>
