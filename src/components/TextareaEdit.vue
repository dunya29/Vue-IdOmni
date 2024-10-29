<script setup>
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
    initVal: String
})
const emit = defineEmits(['onChange'])
const textRef = ref(null)
const textValue = ref(props.initVal)
const textOnInput = () => {
    if (textRef.value) {
        textRef.value.style.height = ''; 
        textRef.value.style.height = textRef.value.scrollHeight + 'px'
    }
}
const textOnChange = async() => {
    let value = textValue.value.replace(/\n$/, "")   
    textRef.value.value = value   
    emit('onChange', value)
    textOnInput()
}
watch(textRef, textOnInput)
onMounted(() => {
    window.addEventListener("resize", textOnInput);
})
</script>
<template>
    <textarea class="edit-txt" ref="textRef" v-model="textValue" @input="()=>textOnInput()" @change="()=>textOnChange()"></textarea>
</template>