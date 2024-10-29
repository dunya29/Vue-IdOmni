<script setup>
import { ref } from 'vue';
import InviteModal from '../Modals/InviteModal.vue';

const showInviteModal = ref(false)
const openInviteMod = () => {
    showInviteModal.value = true
}
const closeInviteMod = () => {
    showInviteModal.value = false
}
</script>

<template>
    <button class="btn primary-btn" @click="()=>openInviteMod()"><span>Поделиться ссылкой</span></button>
    <Teleport to="body">
        <transition name="modal-fade">
            <InviteModal v-if="showInviteModal" @closeInviteMod="closeInviteMod"/>
        </transition>       
    </Teleport>
</template>