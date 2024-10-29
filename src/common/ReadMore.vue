<script setup>
const props = defineProps({
    openBtnTxt: String,
    closeBtnTxt: String,
    moreActive: Boolean
})
import { getCurrentInstance, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';

const contentRef = ref(null)
const moreHidden = ref(true)
const moreBtn = ref(false)
const moreActive = ref(props.moreActive || false)
const moreBtnText = ref('')
const currWinW = ref(window.innerWidth)
let lessH = ref(0)
let fullH = ref(0)
const onClick = () => {
    if (!moreActive.value) {
        moreActive.value = true
        moreHidden.value = false 
        contentRef.value.style.height = lessH.value + "px"; 
        setTimeout(function () {
            contentRef.value.style.height = fullH.value + "px"
            moreBtnText.value = props.closeBtnTxt || "Свернуть" 
        }, 0);
    } else {
        moreActive.value = false
        contentRef.value.style.height = fullH.value + "px"
        setTimeout(function () {
            contentRef.value.style.height = lessH.value + "px"
            moreBtnText.value = props.openBtnTxt || "Подробнее"
            setTimeout(() => moreHidden.value = true , 500);
        }, 0);
    }
    setTimeout(() => {
        if (contentRef.value) {
            contentRef.value.style.height = null
        }
    }, 500);
}
const showMoreBtn = async() => {
    await setH()
    if (fullH.value > lessH.value ) {
        moreBtn.value = true
        moreBtnText.value = props.openBtnTxt || "Подробнее"
    } else {
        moreBtn.value = false
    }
}
const onResize = () => {
    if (currWinW.value != window.innerWidth) {
        moreActive.value = false
        showMoreBtn()
        currWinW.value = window.innerWidth
    }
}
const setH = async() => {
    moreHidden.value = true
    lessH.value = contentRef.value.clientHeight
    moreHidden.value = false
    await nextTick()
    fullH.value = contentRef.value.clientHeight
    moreHidden.value = true
}
const instance = getCurrentInstance();

watch(
  () => instance?.slots.default?.(),showMoreBtn
);
onMounted(() => {
    showMoreBtn()
    window.addEventListener("resize", onResize)
})
onUnmounted(() => {
    window.removeEventListener("resize", onResize)
})
</script>
<template>
    <div class="read-more" :class="moreHidden && 'more-hidden'">
        <div class="read-more__content" ref="contentRef">     
            <slot></slot>     
        </div>
        <button class="text-btn read-more__btn" v-if="moreBtn" @click="()=> onClick()">
            <span>{{ moreBtnText }}</span>
        </button>
    </div>
</template>