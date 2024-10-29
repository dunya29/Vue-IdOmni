<script setup>
import { onMounted, provide, ref } from 'vue';
import { docsApi, inviteApi, sectionsApi } from '@/api/api';
import Section from '@/components/Docs/Section.vue';
import Invite from '@/components/Invite/Invite.vue';
import { useAuthStore } from '@/store/auth'
import { useRoute, useRouter } from 'vue-router';
import PageWrap from '@/components/PageWrap.vue';
import AddSection from '@/components/Docs/AddSection.vue';
const route = useRoute()
const router = useRouter()
const docs = ref([])
const sectionTotal = ref(0)
const sections = ref([])
const sortFetchCount = ref(0)
const docsLoading = ref(false)
const addSecLoading = ref(false)
const routeId = ref(null)
const storeAuth = useAuthStore()
const pageLoad = ref(false)
const addSecForm = ref(null)
const fetchSections = async () => {
    docsLoading.value = true
    try {
        const {data} = await sectionsApi.getSections(routeId.value)
        sections.value = [...data]
        sectionTotal.value = data.length
        fetchDocs()
    } catch(err) {
        console.log(err)
        docsLoading.value = false
    } 
}
const fetchDocs = async () => {
    docsLoading.value = true
    try {
        let ids = sections.value.map(item => item.id)
        const {data} = await docsApi.getDocs(routeId.value, ids)
        docs.value = [...data]
        sections.value = sections.value.map(sec => {
            return {...sec, "docs": data.filter(doc => doc.sectionId === sec.id)}
        })
    } catch(err) {
        console.log(err)
    } finally {
       docsLoading.value = false
    }
}
const addNewDoc = async(data) => {
    try {
        await docsApi.postDoc(routeId.value, data)
        fetchDocs()
        
    } catch(err) {
        console.log(err)
    }
}
const delDoc = async(id) => {
    docsLoading.value = true
    try {
        const { data } = await docsApi.delDoc(routeId.value, id)
        fetchDocs()
    } catch(err) {
      console.log(err)
      docsLoading.value = false
    }
} 
const sortDocs = async(thisItem, changedItemsArr) => {
    docsLoading.value = true
    let updateCount = changedItemsArr.length + 1
    try {
        await docsApi.sortDocs(routeId.value, thisItem.id, { "orderId": thisItem.orderId })
        sortFetchCount.value++
        changedItemsArr.forEach(async(item) => {
            try {
                await docsApi.sortDocs(routeId.value, item.id, item.params) 
                sortFetchCount.value++
                if (sortFetchCount.value == updateCount) {
                    fetchDocs()
                    sortFetchCount.value = 0
                } 
            } catch(err) {
                console.log(err)
            }     
        })
    } catch(err) {
      console.log(err)
    }

}
const changeDocName = async(id, text) => {
    let data = {
        "name": text
    }
    try {
        await docsApi.changeDocName(routeId.value, id, data)
    } catch(err) {
      console.log(err)
    }
} 
const changeDocDesc = async(id, data) => {
    try {
        await docsApi.changeDocDesc(routeId.value, id, data)
        fetchDocs()
    } catch(err) {
      console.log(err)
    }
} 
const addNewSec = async(data) => {
    addSecLoading.value = true
    try {
        await sectionsApi.postSection(routeId.value, data)
        addSecForm.value.resetForm()  
        fetchSections()
        
    } catch(err) {
        console.log(err)
    } finally {
        addSecLoading.value = false
    }
}
const delSec = async(id) => {
    docsLoading.value = true
    try {
        await sectionsApi.delSection(routeId.value, id)
        fetchSections()
    } catch(err) {
      console.log(err)
      docsLoading.value = false
    }
} 
const changeSecName = async(id, text) => {
    let data = {
        "title": text
    } 
    try {
        await sectionsApi.changeSectionTitle(routeId.value, id, data)
    } catch(err) {
      console.log(err)
    }
} 
provide('addNewDoc', addNewDoc)
provide('delDoc', delDoc)
provide('changeDocName', changeDocName)
provide('changeDocDesc', changeDocDesc)

onMounted(async() => {
    routeId.value = route.params.id
    if (storeAuth.userData.isAdmin) {
        pageLoad.value = true
        fetchSections()
    } else {
        let urlMatchInvite = route.fullPath.match("invite")
        let link = urlMatchInvite ? route.fullPath.substring(urlMatchInvite.index + 7) : ""
        if (storeAuth.logged) {
            const login = storeAuth.userData.login
            const email = storeAuth.userData.email
            try {
                const { data } = await inviteApi.checkUser(routeId.value, email)
                if (data.length > 0) {
                    pageLoad.value = true
                    fetchSections()
                } else {
                    if (urlMatchInvite || localStorage.getItem("inviteLink")) {
                        try {
                            let pageInviteLink = link ? link : JSON.parse(localStorage.getItem("inviteLink")).link
                            const {data} = await inviteApi.checkInviteLink(routeId.value, pageInviteLink)
                            if (data.length > 0) {
                                try {
                                    let newInviteUser = {
                                        "login": login,
                                        "email": email
                                    }
                                    await inviteApi.setUser(routeId.value, newInviteUser )
                                    pageLoad.value = true
                                    fetchSections()
                                } catch(err) {
                                    console.log(err)
                                }
                            } else {
                                router.push({name: 'access-denied'})
                            }
                        } catch(err) {
                            console.log(err)
                        } 
                        localStorage.removeItem("inviteLink")
                    }  else {
                        router.push({name: 'access-denied'})
                    }               
                }
            } catch(err) {
                console.log(err)
            }
        } else {
            if (urlMatchInvite) {
                localStorage.setItem("inviteLink", JSON.stringify({id:routeId.value, link}))
            }
            router.push({name: 'login'})
        }
    }
})
</script>
<template>
    <PageWrap>
        <section class="section intro docs-p" v-if="pageLoad">
            <div class="container">
                <div class="sec-top docs-p__top">
                    <div class="docs-p__content">
                        <h1>nn-dobro.ru</h1>
                        <p>На этой странице вы найдете инструкции и полезные документы для работы с ваши сайтом</p>
                    </div>
                    <Invite v-if="storeAuth.userData.isAdmin"/>
                </div>              
                <div class="docs-p__items" v-if="sectionTotal" :class="docsLoading && 'loading'">
                    <Section v-for="item in sections"
                    :key="item.id"
                    :id="item.id"
                    :title="item.title"
                    :item="item.docs"
                    :isAdmin="storeAuth.userData.isAdmin"
                    @sortDocs="sortDocs"
                    @delSec="delSec"
                    @changeSecName="changeSecName"
                    /> 
                </div>
                <AddSection ref="addSecForm" v-if="storeAuth.userData.isAdmin" :addSecLoading="addSecLoading" @addNewSec="addNewSec"/>
            </div>
        </section>
    </PageWrap>
</template>


