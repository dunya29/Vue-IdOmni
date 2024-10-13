<script setup>
import { inject, onMounted, ref, watch } from 'vue';
const props = defineProps({
    name: String,
    id: Number,
    docURL: String,
    iconURL: String,
    download: Boolean
})
import { useAuthStore } from '@/store/auth'
const { isAdmin } = useAuthStore()
const docNameRef = ref(null)
const delDoc = inject("delDoc")
const changeDocName = inject("changeDocName")
const docNameValue = ref(props.name)
const docNameOnInput = () => {
    docNameRef.value.style.height = ''; 
    docNameRef.value.style.height = docNameRef.value.scrollHeight + 'px'
}
const docNameOnChange = async() => {
    let data = {
        "name": docNameValue.value 
    } 
    changeDocName(props.id,data)
}
onMounted(() => {
    window.addEventListener("resize", docNameOnInput);
})
watch(docNameRef, docNameOnInput)
</script>
<template>
    <div class="item-doc" :data-id="id">
        <div class="item-doc__handle" v-if="isAdmin">
            <svg><use xlink:href="../../assets/img/icons/sprite.svg#chevron-top"></use></svg>
            <svg><use xlink:href="../../assets/img/icons/sprite.svg#chevron-bot"></use></svg>
        </div>
        <div class="card-anim item-doc__inner">
            <div class="item-doc__icon">
                <img :src="'/src/assets/img/'+iconURL" alt="">
            </div>
            <div class="item-doc__content">
                <h5><textarea ref="docNameRef" v-model="docNameValue" @input="()=>docNameOnInput()" @change="()=>docNameOnChange()"></textarea></h5>
                <div class="item-doc__action">
                    <a :href="'/src/assets/docs/'+docURL" download class="item-doc__btn" v-if="download">
                        <span>Скачать</span>
                        <img src="../../assets/img/icons/download.svg" alt="">                   
                    </a>
                    <a :href="'/src/assets/docs/'+docURL" class="item-doc__btn" target="_blank" v-else>
                        <span>Открыть</span>
                        <img src="../../assets/img/icons/more.svg" alt="">
                    </a>
                    <button v-if="isAdmin" @click="()=>delDoc(id)" class="btn-reset item-doc__btn item-doc__btn--del"><svg><use xlink:href="../../assets/img/icons/sprite.svg#del"></use></svg> </button>  
                </div>          
            </div>
        </div>
    </div>
</template>