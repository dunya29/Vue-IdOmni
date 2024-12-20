<script setup>
import {nextTick, ref, watch } from 'vue';

const props = defineProps({
    index: Number,
    isActive: Boolean
})
const accordRef = ref(null)
const accordH = ref(0)
const isActive = ref(props.isActive || false) 
let animDur = 500
const isAnimated = ref(props.isActive || false)
const emit = defineEmits(['update'])
const toggleAccord = async() => {
    emit('update', props.index)
    !isActive.value ? openAccord() : closeAccord()    
}
const openAccord = async() => {
    isActive.value = true
    isAnimated.value = true
    await nextTick(); 
    accordH.value = accordRef.value && accordRef.value.clientHeight + 'px'
    accordRef.value.style.height = '0px';
    setTimeout(function () {
        accordRef.value.style.height = accordH.value
        setTimeout(() => {
            accordRef.value.style.height = null
        }, animDur); 
    }, 0);
}
const closeAccord = () => {
    accordH.value = accordRef.value && accordRef.value.clientHeight + 'px'
    accordRef.value.style.height = accordH.value
    isAnimated.value = false
    setTimeout(function () {
        accordRef.value.style.height = "0"
        setTimeout(() => {
            accordRef.value.style.height = null
            isActive.value = false
        }, animDur);
    }, 0);
}
watch(()=>props.isActive, () => {
    if (accordRef.value) {
        closeAccord()
    }  
}, {deep: true})
</script>
<template>
    <div class="accordion" :class="isAnimated && 'open'">
        <div class="accordion__header" @click="()=>toggleAccord()">
            <slot name="header"></slot>
        </div>
        <div class="accordion__body" ref="accordRef" v-if="isActive">
            <div class="accordion__content">
                <slot></slot>
            </div>        
        </div>
    </div>
</template>