<script setup>
import { RouterLink } from 'vue-router';
import TextareaEdit from '../TextareaEdit.vue';
const props = defineProps({
    id: Number,
    title: String,
    isAdmin: Boolean
})
const emit = defineEmits(['delPage', 'pageNameOnChange'])

const pageNameOnChange = (text) => {
    emit('pageNameOnChange', props.id, text)
}
</script>
<template>
    <div class="item-doc">
        <div v-if="isAdmin" class="item-doc__handle">
            <svg><use xlink:href="../../assets/img/icons/sprite.svg#chevron-top"></use></svg>
            <svg><use xlink:href="../../assets/img/icons/sprite.svg#chevron-bot"></use></svg>
        </div> 
        <div class="card-anim item-doc__inner">
            <div class="item-doc__content">
                <div class="item-doc__info">
                    <h5>
                        <TextareaEdit v-if="isAdmin" :initVal="title" @onChange="pageNameOnChange"/> 
                        <span v-else>{{ title }}</span>
                    </h5>
                </div>         
                <div class="item-doc__action">
                    <RouterLink :to="{ name: 'docs', params: { id: id } }" class="item-doc__btn">
                        <span>Открыть</span>
                        <svg><use xlink:href="../../assets/img/icons/sprite.svg#ext-link"></use></svg>
                    </RouterLink>
                    <button v-if="isAdmin" @click="()=>emit('delPage',id)" class="btn-reset item-doc__btn item-doc__btn--del">
                        <img src="../../assets/img/icons/bin.svg" alt="">
                    </button>  
                </div>          
            </div>
        </div>
    </div>
</template>