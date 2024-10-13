<script setup>
import { modalOnClick, openModal } from '@/functions/modal';
import { onMounted, ref } from 'vue';
const emit = defineEmits(['delUser','closeUserMod'])
const delMod = ref(null)
onMounted(() =>{
    openModal(delMod.value)
})
</script>
<template>
    <div class="modal" ref="delMod" @click="e=>modalOnClick(e,delMod,()=>emit('closeUserMod'))">
        <div class="modal__overlay">
            <div class="modal__content">
                <button class="btn-reset btn-close modal__close" aria-label="Закрыть всплывающее окно">
                    <svg><use xlink:href="../../assets/img/icons/sprite.svg#close"></use></svg>
                </button>
                <div class="modal__scroll">
                    <div class="modal__top">
                        <h3>Удаления пользователя</h3>
                    </div>
                    <p>При удалении пользователя, ссылка-приглашение изменится на новую, что бы пользователь не авторизовался по старой ссылке</p>
                    <div class="btn-main">
                        <button @click="()=>emit('delUser')" class="btn-reset btn-main-body">ОК</button>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>