<script setup>
import axios from "axios";
import { onMounted, onUnmounted, reactive, ref, watch } from "vue";

const props = defineProps({
    name: String,
    types: Array,
    format: String,
    maxSize: Number,
    emptyError: Boolean,
    isMultiple: Boolean,
    initValue: Array,
});
const emit = defineEmits(["setFileFieldValue", "fileFieldIsError"]);
const fileInputRef = ref(null);
const filesItems = ref([]);
const filesField = reactive({
    value: [],
    encodeValue: [],
    error: false,
    errorTxt: "Выберите файл",
    progressValue: [],
});
let controller = ref([]);
const resetForm = () => {
    filesField.value = [];
};
const abort = () => {
    if (controller.value.length > 0) {
        controller.value.forEach((item) => item.abort());
    }
};
defineExpose({
    resetForm,
    abort,
});
const resetFileValues = () => {
    filesField.encodeValue = [];
    filesField.progressValue = [];
    filesItems.value = [];
};
const validateFile = (files) => {
    filesField.value = [];
    resetFileValues();
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (props.maxSize && file.size > props.maxSize) {
            filesField.value = [];
            filesField.error = true;
            filesField.errorTxt = `Файл должен быть менее ${
                props.maxSize / 1024 / 1024
            } МБ`;
            return;
        } else if (props.types && !props.types.includes(file.type)) {
            filesField.value = [];
            filesField.error = true;
            filesField.errorTxt = "Разрешённые форматы: " + props.format;
            return;
        } else {
            filesField.error = false;
            filesField.errorTxt = "Выберите файл";
            filesField.value.push(file);
        }
    }
};
const fileOnChange = (e) => {
    validateFile(e.target.files);
};
const delFile = (idx) => {
    if (
        controller.value[idx] &&
        filesField.value[idx].name !==
            (filesField.encodeValue[idx] && filesField.encodeValue[idx].name)
    ) {
        controller.value[idx].abort();
    } else {
        filesField.encodeValue.splice(idx, 1);
    }
    const dt = new DataTransfer();
    const files = filesField.value;
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (i !== idx) {
            dt.items.add(file);
        }
    }
    fileInputRef.value.files = dt.files;
    filesField.value = dt.files;
    filesItems.value.splice(idx, 1);
    filesField.progressValue.splice(idx, 1);
};
const dropFile = (e) => {
    const dt = new DataTransfer();
    if (props.isMultiple) {
        dt.items.add(e.dataTransfer.files);
    } else {
        dt.items.add(e.dataTransfer.files[0]);
    }
    let files = Array.from(dt.files);
    fileInputRef.value.files = dt.files;
    validateFile(files);
};
const setInitVal = () => {
    if (props.initValue && props.initValue.length > 0) {
        filesItems.value = [...props.initValue];
    }
};
onMounted(setInitVal);
onUnmounted(abort);
watch(
    () => filesField.value,
    () => {
        if (fileInputRef.value && filesField.value.length == 0) {
            abort();
            resetFileValues();
            fileInputRef.value.value = "";
            emit("setFileFieldValue", props.name && props.name, [
                ...filesField.encodeValue,
            ]);
            emit("fileFieldIsError", props.name && props.name, false);
        }
        if (filesField.value.length > 0 && filesItems.value.length === 0) {
            filesField.value.forEach(async (item, idx) => {
                filesItems.value.push(item);
                filesField.progressValue.push(0);
                let formData = new FormData();
                formData.append("file", item);
                controller.value[idx] = new AbortController();
                const signal = controller.value[idx].signal;
                emit("fileFieldIsError", props.name && props.name, false);
                try {
                    const { data } = await axios.post(
                        "https://httpbin.org/post",
                        formData,
                        {
                            signal,
                            onUploadProgress: function ({ progress }) {
                                filesField.progressValue[
                                    filesItems.value.findIndex(
                                        (arr) => arr.name === item.name
                                    )
                                ] = Math.floor(progress * 50);
                            },
                            onDownloadProgress: function ({ progress }) {
                                filesField.progressValue[
                                    filesItems.value.findIndex(
                                        (arr) => arr.name === item.name
                                    )
                                ] = 50 + Math.floor(progress * 50);
                            },
                        }
                    );
                    const file = {
                        name: item.name,
                        url: "url",
                    };
                    filesField.encodeValue.push(file);
                    emit("setFileFieldValue", props.name && props.name, [
                        ...filesField.encodeValue,
                    ]);
                    filesField.progressValue[
                        filesItems.value.findIndex(
                            (arr) => arr.name === item.name
                        )
                    ] = 100;
                } catch (err) {
                    console.log(err);
                    if (!signal.aborted) {
                        delFile(idx);
                    }
                } finally {
                    controller.value.splice(idx, 1);
                }
            });
        }
    }
);
watch(
    () => props.emptyError,
    () => {
        if (props.emptyError) {
            filesField.errorTxt = "Выберите файл";
        }
    }
)
</script>
<template>
    <div class="item-form file-form">
        <div class="file-form__type">Допустимые форматы для загрузки: {{ format }}</div>
        <label @dragenter.prevent @dragover.prevent @drop.prevent="e => dropFile(e)">
            <input type="file" ref="fileInputRef" :multiple="isMultiple" name="file" value="" :accept="format" @change="e => fileOnChange(e)">
            <svg>
                <use xlink:href="/static/img/icons/sprite.svg#file-download"></use>
            </svg>
            <span>Перетащите или <span>выберите файл</span></span>
        </label>

        <div class="file-form__items" v-if="filesItems">
            <div class="file-form__item" v-for="(item,idx) in filesItems" :key="idx">
                <div class="file-form__name">{{item.name}}</div>
                <div class="file-form__del" @click.stop="() => delFile(idx)">
                    <img src="/static/img/icons/bin.svg" alt="">
                </div>
            </div>
        </div>

        <div class="file-form__progress" v-for="(item,idx) in filesField.progressValue" :key="idx">
            <div class="progress-bar"><span :style="{width: item +'%'}"></span></div>
            <span v-if="item < 100">Загрузка: {{ item }}%</span>
            <span v-else>Файл загружён</span>
        </div>
        <div data-error="" v-if="filesField.error || emptyError"> {{ filesField.errorTxt }}</div>
    </div>
</template>