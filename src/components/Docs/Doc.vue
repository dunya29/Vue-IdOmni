<script setup>
import { inject, ref } from 'vue';
const props = defineProps({
    id: Number,
    name: String,
    content: String,
    docURL: String,
    iconURL: String,
    download: Boolean
})
import { useAuthStore } from '@/store/auth'
import Tiptap from '../Wysiwyg/Tiptap.vue';
import TextareaEdit from '../TextareaEdit.vue';
import ReadMore from '@/common/ReadMore.vue';
const storeAuth = useAuthStore()
const delDoc = inject("delDoc")
const changeDocName = inject("changeDocName")
const changeDocDesc = inject("changeDocDesc")
const docNameOnChange = (text) => {
    changeDocName( props.id, text)
}
const showEditor = ref(false)
const descContent = ref(props.content)
const setDescContent = async() => {
    let data = {
        "content": descContent.value
    } 
    try {
       await changeDocDesc(props.id, data)   
       showEditor.value = false 
    } catch(err) {
        console.log(err)
    } 
}
const updateDescContent = (content) => {
    descContent.value = content
}
const resetContent = () => {
    showEditor.value = false
    descContent.value = props.content
}
</script>
<template>
    <div class="item-doc item-doc--file">
        <div class="item-doc__handle" v-if="storeAuth.userData.userRole === 'admin'">
            <svg><use xlink:href="/static/img/icons/sprite.svg#chevron-top"></use></svg>
            <svg><use xlink:href="/static/img/icons/sprite.svg#chevron-bot"></use></svg>
        </div>
        <div class="card-anim item-doc__inner" :class="showEditor && 'res-hover'">
            <div class="item-doc__icon">
                <img :src="'/static/img/'+iconURL" alt="">
            </div>
            <div class="item-doc__content">
                <div class="item-doc__info">
                    <h5>
                        <TextareaEdit v-if="storeAuth.userData.userRole === 'admin'" :initVal="name" @onChange="docNameOnChange" />
                        <span v-else>{{ name }}</span>
                    </h5> 
                    <div class="item-doc__desc">
                        <div class="pointer item-doc__desc-empty" v-if="!content.length && storeAuth.userData.userRole === 'admin' && !showEditor" @click="() => showEditor = true"><p>Введите описание</p></div>
                        <ReadMore v-if="!showEditor">
                            <template #default>
                                <div class="page-content" :class="storeAuth.userData.userRole === 'admin' && 'pointer'" v-html="content" @click="() => storeAuth.userData.userRole === 'admin' ? showEditor = true : null"></div>
                            </template>
                        </ReadMore>
                        <Tiptap v-else 
                        :content="descContent"
                        @updateValue="updateDescContent"
                        />
                        <div class="item-doc__desc-btns" v-if="showEditor">
                            <button type="button" class="btn primary-btn" @click="() =>setDescContent()">
                                <span>Сохранить</span>
                            </button>
                            <button type="button" class="btn stroke-btn" @click="() =>resetContent()">
                                <span>Отменить</span>
                            </button>
                        </div>
                    </div>            
                </div>
                <div class="item-doc__action">
                    <a :href="'/static/docs/'+docURL" download class="item-doc__btn" v-if="download">
                        <span>Скачать</span>
                        <svg><use xlink:href="/static/img/icons/sprite.svg#download"></use></svg>                 
                    </a>
                    <a :href="'/static/docs/'+docURL" class="item-doc__btn" target="_blank" v-else>
                        <span>Открыть</span>
                        <svg><use xlink:href="/static/img/icons/sprite.svg#ext-link"></use></svg>
                    </a>
                    <button v-if="storeAuth.userData.userRole === 'admin'" @click="()=>delDoc(id)" class="btn item-doc__btn item-doc__btn--del">
                        <img src="/static/img/icons/bin.svg" alt="">
                    </button>  
                </div>          
            </div>
        </div>
    </div>
</template>