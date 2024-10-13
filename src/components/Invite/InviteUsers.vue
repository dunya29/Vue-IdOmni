<script setup>
const props = defineProps({
    inviteUsers: Array
})
import { toggleDropdown } from '@/functions/dropdown';
import { ref } from 'vue';
import { enableScroll } from '@/functions/scroll';
import InviteUsersDelModal from './InviteUsersDelModal.vue';
const emit = defineEmits(['delInviteUser'])
const inviteUsersRef = ref(null)
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
const delUser = () => {
    emit('delInviteUser', delUserId.value) 
    delUserId.value = null
    enableScroll()
    setTimeout(() => {
        showUsersMod.value = false 
    }, 0);   
}
</script>
<template>
    <div class="dropdown" v-if="inviteUsers.length" ref="inviteUsersRef" aria-expanded="false">
        <div class="dropdown__header" @click="() => toggleDropdown(inviteUsersRef)">
            <span>Пользователи</span>
            <svg><use xlink:href="../../assets/img/icons/sprite.svg#chevron-bot"></use></svg>
        </div>
        <div class="dropdown__body">
            <ul class="custom-scroll dropdown__options">
                <li v-for="item in inviteUsers" :key="item.id" class="item-user">
                    <span>{{ item.login }}</span>
                    <button @click="()=>openUserMod(item.id)" class="btn-reset item-user__del">
                        <svg><use xlink:href="../../assets/img/icons/sprite.svg#del"></use></svg> 
                    </button>         
                </li>
            </ul>
        </div>
    </div>
    <InviteUsersDelModal v-if="showUsersMod" @delUser=delUser @closeUserMod="closeUserMod" />
</template>