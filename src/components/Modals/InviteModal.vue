<script setup>
import randomatic from 'randomatic';
import { inviteApi } from '@/api/api';
import { onMounted, provide, reactive, ref } from 'vue';
import InviteLink from '../Invite/InviteLink.vue';
import InviteUsers from '../Invite/InviteUsers.vue';
import Modal from '@/common/Modal.vue';
import { useRoute } from 'vue-router';
const inviteLink = ref('')
const inviteUsers = ref([])
const emit = defineEmits(['closeInviteMod'])
const route = useRoute()
const routeId = ref(null)
const inviteLoading = reactive({
    users: false
})
const fetchInviteLink = async() => {
    try {
        const {data} = await inviteApi.getInviteLink(routeId.value)
        inviteLink.value = data.link
    } catch (err) {
        console.log(err)
    }
}
const setInviteLink = async(params) => {
    try {
        await inviteApi.setInviteLink(routeId.value, params)
        fetchInviteLink()
    } catch (err) {
        console.log(err)
    }
}
const randomizeInviteLink = () => {
    let data = {
        "link": randomatic('Aa0', 100)
    }
    setInviteLink(data)
}
const fetchInviteUsers = async() => {
    inviteLoading.users = true
    try {
        const { data } = await inviteApi.getUsers(routeId.value) 
        inviteUsers.value = data
    } catch(err) {
      console.log(err)
    } finally {
        inviteLoading.users = false
    }
}
const delInviteUser = async(id) => {
    try {
        await inviteApi.delUser(routeId.value, id)
        randomizeInviteLink()
        fetchInviteUsers()
    } catch(err) {
      console.log(err)
    } 
}
onMounted(async() => {
    routeId.value = route.params.id
    fetchInviteUsers()
    fetchInviteLink()
})
provide('delInviteUser', delInviteUser)
</script>
<template>
    <Modal title="Ссылка" @closeModal="emit('closeInviteMod')" :loading="inviteLoading.users">
        <InviteLink :inviteLink="inviteLink" @setInviteLink="setInviteLink" @randomizeInviteLink="randomizeInviteLink"/>
        <InviteUsers v-if="inviteUsers.length" :inviteUsers="inviteUsers" :loading="inviteLoading.users"/>
    </Modal>
</template>