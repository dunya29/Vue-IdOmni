<script setup>
const props = defineProps({
    title: String,
    loading: Boolean
})
import { disableScroll, enableScroll } from '@/functions/scroll';
import { onMounted, onUnmounted, ref } from 'vue';

const modalRef = ref(null)
const emit = defineEmits(['closeModal'])
const closeModal = () => {
    emit('closeModal');  
};
const handleClickOutside = (event) => {
    if (modalRef.value && !modalRef.value.contains(event.target)) {
        closeModal();
    }
};
onMounted(() => {
    disableScroll()
})
onUnmounted(() => {
    setTimeout(() => {
       enableScroll() 
    }, 300);
})
</script>
<template>
    <div class="modal" @click="handleClickOutside" :class="loading && 'loading'">
        <div class="custom-scroll modal__overlay">
            <div class="modal__content" ref="modalRef">
                <button @click="closeModal" class="btn-reset btn-close modal__close" aria-label="Закрыть всплывающее окно">
                    <svg><use xlink:href="../assets/img/icons/sprite.svg#close"></use></svg>
                </button>
                <div class="modal__scroll">
                    <div class="modal__top">
                        <h3>{{ title }}</h3>
                    </div>
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.modal-fade-enter-active, .modal-fade-leave-active {
    visibility: visible;
    opacity: 1;
    transition: all .3s ease-out;
    .modal__content {
        opacity: 1;
        transform: translateY(0);
        transition: all .3s ease-out;
    }
}
.modal-fade-enter-from, .modal-fade-leave-to {
    visibility: hidden;
    opacity: 0;
    .modal__content {
        opacity: 0;
        transform: translateY(30px);
    }
}
.modal.loading {
    &:before {
        content: none;
    }
    .modal__content {
        opacity: 0;
    }
}
</style>