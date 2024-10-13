<script setup>
const props = defineProps({
    routeid: Number
})
import InviteLink from './InviteLink.vue';
import InviteUsers from './InviteUsers.vue';
import randomatic from 'randomatic';
import { inviteApi } from '@/api/api';
import { onMounted, ref } from 'vue';
const inviteLink = ref('')
const inviteUsers = ref([])
const fetchInviteLink = async() => {
    try {
        const {data} = await inviteApi.getInviteLink(props.routeid)
        inviteLink.value = data.link
    } catch (err) {
        console.log(err)
    }
}
const setInviteLink = async(params) => {
    try {
        await inviteApi.setInviteLink(props.routeid, params)
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
    try {
        const { data } = await inviteApi.getUsers(props.routeid) 
        inviteUsers.value = data
    } catch(err) {
      console.log(err)
    } 
}
const delInviteUser = async(id) => {
    try {
        await inviteApi.delUser(props.routeid, id)
        randomizeInviteLink()
        fetchInviteUsers()
    } catch(err) {
      console.log(err)
    } 
}
onMounted(async() => {
    fetchInviteUsers()
    fetchInviteLink()
})
</script>

<template>
    <div class="client-docs__invite">
        <InviteLink :inviteLink="inviteLink" @setInviteLink="setInviteLink" @randomizeInviteLink="randomizeInviteLink"/>
        <InviteUsers :inviteUsers="inviteUsers" @delInviteUser="delInviteUser"/>
    </div>
</template>