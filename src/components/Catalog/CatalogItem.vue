<script setup>
import { onMounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
const props = defineProps({
    id: Number,
    title: String,
    isAdmin: Boolean
})
const pageNameRef = ref(null)
const pageNameValue = ref(props.title)
const emit = defineEmits(['delPage', 'pageNameOnChange'])
const pageNameOnInput = () => {
    pageNameRef.value.style.height = ''; 
    pageNameRef.value.style.height = pageNameRef.value.scrollHeight + 'px'
}
const pageNameOnChange = () => {
    let data = {
        "title": pageNameValue.value 
    } 
    emit('pageNameOnChange', props.id, data)
}
onMounted(() => {
    window.addEventListener("resize", pageNameOnInput);
})
watch(pageNameRef, pageNameOnInput)
</script>
<template>
    <div class="item-doc">
        <!-- <div v-if="isAdmin" class="item-doc__handle">
            <svg><use xlink:href="../../assets/img/icons/sprite.svg#chevron-top"></use></svg>
            <svg><use xlink:href="../../assets/img/icons/sprite.svg#chevron-bot"></use></svg>
        </div> -->
        <div class="card-anim item-doc__inner">
            <div class="item-doc__content">
                <h3><textarea ref="pageNameRef" v-model="pageNameValue" @input="()=>pageNameOnInput()" @change="()=>pageNameOnChange()"></textarea></h3>
                <div class="item-doc__action">
                    <RouterLink :to="'/catalog/'+id" class="item-doc__btn">
                        <span>Открыть</span>
                        <img src="../../assets/img/icons/more.svg" alt="">
                    </RouterLink>
                    <button v-if="isAdmin" @click="()=>emit('delPage',id)" class="btn-reset item-doc__btn item-doc__btn--del">
                        <svg><use xlink:href="../../assets/img/icons/sprite.svg#del"></use></svg> 
                    </button>  
                </div>          
            </div>
        </div>
    </div>
</template>