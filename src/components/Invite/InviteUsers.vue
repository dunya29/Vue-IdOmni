<script setup>
const props = defineProps({
    inviteUsers: Array,
    loading: Boolean
})
import { ref } from 'vue';
import InviteUsersDelModal from '../Modals/InviteUsersDelModal.vue';
import Accordion from '@/common/Accordion.vue';
const showUsersMod = ref(false)
const delUserId = ref(null)
const openUserMod = (id)=> {
    showUsersMod.value = true
    delUserId.value = id
}
const closeUserMod = ()=> {
    showUsersMod.value = false
    delUserId.value = null
}
</script>
<template>
    <Accordion title="Пользователи" :isActive="true" class="item-acc" :class="loading && 'loading'">
        <div v-for="item in inviteUsers" :key="item.id" class="item-user">
            <span>{{ item.login }}</span>
            <button @click="()=> openUserMod(item.id)" class="btn-reset item-user__del">
                <svg><use xlink:href="/static/img/icons/sprite.svg#del"></use></svg> 
            </button>         
        </div>
    </Accordion>
    <Teleport to="body">
        <transition name="modal-fade">
            <InviteUsersDelModal v-if="showUsersMod" :userId="delUserId" @closeUserMod="closeUserMod"/>
        </transition>       
    </Teleport>
</template>