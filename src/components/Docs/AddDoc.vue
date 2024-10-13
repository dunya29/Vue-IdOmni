<script setup>
const props = defineProps({
    addDocLoading: Boolean,
    sections: Array,
    formSuccess: Number
})
import { addFile, fileOnDrop } from '@/functions/addFile';
import { closeDropdown, toggleDropdown } from '@/functions/dropdown';
import { computed, onMounted, reactive, ref, watch } from 'vue';
const emit = defineEmits(["addNewDoc"])
const secSelectRef = ref(null)
const allSec = computed(() => {
    let maxId = Math.max(...props.sections.map(item => item.id))
    let newSecData = {
        id: maxId + 1,
        title: "Новая секция"
    } 
    return [...props.sections, newSecData]
})
const selectedSec = ref(0)
const addNewSec = computed(() => {
    if (selectedSec.value === allSec.value.length - 1) {
        return true
    } else {
        newSecName.value = ""
        newSecName.error = false
        return false
    } 
})
const newSecName = reactive({
    value: "",
    error: false,
    errorTxt: "Заполните поле"
})
const fileLabelRef = ref(null)
let docFormValues = reactive([
    {
        field: "files",
        value: [],
        encodeValue: [],
        error: false,
        errorTxt: "Выберите файл",
        progressValue: []
    },
    {
        field: "docName",
        value: "",
        error: false,
        errorTxt: "Заполните поле"
    },
])
const filesArr  = ref([])
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
const selectOnClick = (idx) => {
    selectedSec.value = idx
    closeDropdown(secSelectRef.value)
}
const resetFileValues = () => {
    filesArr.value = []
    docFormValues[0].encodeValue = []
    docFormValues[0].progressValue = []
}
const fileOnChange = e => {
    resetFileValues()
    addFile(e.target.files, file, docFormValues[0])
}
const delFile = (idx) => {
    const dt = new DataTransfer()
    const files = docFormValues[0].value
    for (let i = 0; i < files.length; i++) {
        let file = files[i]
        if (i !== idx) {
          dt.items.add(file)
        }      
    }
    fileLabelRef.value.querySelector("input").files = dt.files
    docFormValues[0].value = dt.files
    filesArr.value.splice(idx,1)
    docFormValues[0].encodeValue.splice(idx,1)
    docFormValues[0].progressValue.splice(idx,1) 
}
const docFormOnSubmit = () => {
    docFormValues.forEach(item => {
        if (item.value.length > 0) {
            item.error = false
        } else {
            item.error = true
        }
    })
    newSecName.error = addNewSec.value && !newSecName.value ? true: false
    if (!docFormValues.some(item => item.error) && !newSecName.error && docFormValues[0].value.length > 0) {
        //let formData = new FormData();
        docFormValues[0].encodeValue.forEach(item => {
            let newFile = {
            "parentId": allSec.value[selectedSec.value].id,
            "parentTitle": addNewSec.value ? newSecName.value : allSec.value[selectedSec.value].title,
            "docURL": item,
            "name": docFormValues[1].value,
            "iconURL": "/icons/doc.svg",
            "download": false
            }
            //formData.append("file", newFile);
            emit("addNewDoc", newFile)
        })
        //emit("addNewDoc", formData)
    } 
}
onMounted(() => {
    fileOnDrop(fileLabelRef.value, file, docFormValues[0],resetFileValues)
})
watch(() => docFormValues[0].value, ()=> {
    if (fileLabelRef.value && docFormValues[0].value.length == 0) {
        resetFileValues()
        fileLabelRef.value.querySelector("input").value = ''
    } 
    if (docFormValues[0].value.length > 0 && docFormValues[0].encodeValue.length == 0) {
        docFormValues[0].value.forEach((item,idx) => {
            let reader = new FileReader()
            reader.readAsDataURL(item);
            reader.onloadstart = () => {
                filesArr.value.push(item)
                docFormValues[0].progressValue.push(0) 
            }
            reader.onloadend = () => {
                docFormValues[0].progressValue[idx] = 100
                docFormValues[0].encodeValue.push(reader.result)               
            }
            reader.onerror = () => {
              console.log(reader.error);
            } 
            reader.onprogress = (e) => {
                docFormValues[0].progressValue[idx] = (e.loaded / e.total).toFixed(2) * 100
            }
            reader.onabort = (e) => {
                if (docFormValues[0].progressValue[idx]) {
                    docFormValues[0].progressValue[idx] = 0
                }               
            }
        })   
    }
}, {deep: true}) 
watch(()=>props.formSuccess, () => {
    docFormValues.forEach(item => {
        item.value = []
    })
    newSecName.value = "" 
}) 
</script>
<template>
    <div class="clients-docs__form">
        <h2>Создать документ</h2>
        <form class="form" action="" @submit.prevent="docFormOnSubmit">
            <div class="form__fieldset">
                <p class="form__lbl">Загрузите фото</p>
                <div class="item-form file-form">
                    <div class="file-form__type">Допустимые форматы для загрузки: {{ file.format }}</div>
                    <label ref="fileLabelRef">
                        <input type="file" name="file" value="" :accept="file.format" @change="e => fileOnChange(e)">
                        <img src="../../assets/img/icons/file-download.svg" alt="">
                        <span>Перетащите или <span>выберите файл</span></span>
                    </label>
                    <div class="file-form__items" v-if="filesArr">
                        <div class="file-form__item" v-for="(item,idx) in filesArr" :key="idx">
                            <div class="file-form__name">{{item.name}}</div>  
                            <div class="file-form__del" @click="() => delFile(idx)"><svg><use xlink:href="../../assets/img/icons/sprite.svg#del"></use></svg></div>       
                         </div>
                    </div>
                    <div class="file-form__progress" v-for="(item,idx) in docFormValues[0].progressValue" :key="idx">
                        <div class="progress-bar"><span :style="{width: item +'%'}"></span></div>
                        <span v-if="item < 100">Загрузка: {{ item }}%</span>
                        <span v-else>Файл загружён</span>
                    </div>
                    <div data-error="" v-if="docFormValues[0].error"> {{ docFormValues[0].errorTxt }}</div>
                </div> 
                <div class="item-form">
                    <input type="text" name="name" placeholder="Название файла" v-model="docFormValues[1].value">
                    <div data-error="" v-if="docFormValues[1].error">{{ docFormValues[1].errorTxt }}</div>
                </div>
            </div>
            <div class="form__fieldset">
                <p class="form__lbl">Выберите секцию</p>
                <div class="dropdown radio-select" ref="secSelectRef" aria-expanded="false" v-if="sections.length">
                    <div class="dropdown__header" @click="() => toggleDropdown(secSelectRef)">
                        <span>{{ allSec[selectedSec].title }}</span>
                        <svg><use xlink:href="../../assets/img/icons/sprite.svg#chevron-bot"></use></svg>
                    </div>
                    <div class="dropdown__body">
                        <div class="custom-scroll dropdown__options">
                            <label v-for="(item,idx) in allSec" :key="idx">
                                <input type="radio" name="sec" :value="item.id" :checked="item.id === allSec[selectedSec].id" @change="()=>selectOnClick(idx)">
                                <span>{{ item.title }}</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="add-sec" v-if="addNewSec">
                    <div class="item-form">
                        <input type="text" name="newSec" placeholder="Название секции*" v-model="newSecName.value">
                        <div data-error="" v-if="newSecName.error">{{  newSecName.errorTxt }}</div>
                    </div>
                </div> 
            </div>  
            <div class="form__footer">
                <button type="submit" class="btn-reset main-btn" :disabled="addDocLoading">
                    <span :class="addDocLoading && 'loading'">Добавить файл</span>
                </button>
            </div> 
        </form> 
    </div>    
</template>
