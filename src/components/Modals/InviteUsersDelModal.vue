<script setup>
const props = defineProps({
    userId: Number
})
import Modal from '@/common/Modal.vue';
import { inject, ref } from 'vue';
const emit = defineEmits(['closeUserMod'])
const delUser = inject('delInviteUser')
const loading = ref(false)

const delUserOnClick = async () => {
    loading.value = true
    await delUser(props.userId)
    emit('closeUserMod')
}
</script>
<template>
    <Modal title="Удаления пользователя" @closeModal="emit('closeUserMod')" class="del-user-mod">
        <p>При удалении пользователя, ссылка-приглашение изменится на новую, что бы пользователь не авторизовался по старой ссылке</p>
        <button @click="()=>delUserOnClick()" class="btn main-btn"><span :class="loading && 'loading'">ОК</span></button>
    </Modal>
</template>