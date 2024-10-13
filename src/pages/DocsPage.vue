<script setup>
import { onMounted, provide, reactive, ref } from 'vue';
import { docsApi, inviteApi } from '@/api/api';
import AddDoc from '@/components/Docs/AddDoc.vue';
import Section from '@/components/Docs/Section.vue';
import Invite from '@/components/Invite/Invite.vue';
import { useAuthStore } from '@/store/auth'
import { useRoute, useRouter } from 'vue-router';
import PageWrap from '@/components/PageWrap.vue';
const route = useRoute()
const router = useRouter()
const items = ref([])
const totalCount = ref(0)
const sections = ref([])
const formSuccess = ref(0)
const sortFetchCount = ref(0)
const loading = reactive({
    setDocsLoading: false,
    addDocLoading: false,
})
const routeId = ref(0)
const { isAdmin } = useAuthStore()
const fetchDocs = async() => {
    loading.setDocsLoading = true
    try {
        const { data } = await docsApi.getDocs(routeId.value)
        let newData = data.reduce((acc, current) => {
            let findItem = acc.find(item => item.find(el => el.parentId == current.parentId))
            if (findItem ) {
                let idx = acc.findIndex(item => item == findItem)
                acc = [...acc]
                 acc[idx].push(current)
            } else {
                acc = [...acc, [current]]
            }
            return acc
        }, [])
        items.value = [...newData].map(item => item.sort((a,b) => a.orderId - b.orderId))
        sections.value = items.value.map(item => {
            let data = {
                id: item[0].parentId,
                title: item[0].parentTitle
            }
            return data
        })
        totalCount.value = data.length
    } catch(err) {
        router.push("/notfound")
    } finally {
        loading.setDocsLoading = false
    }
}
const delDoc = async(id) => {
    loading.setDocsLoading = true
    try {
        const { data } = await docsApi.delDoc(routeId.value, id)
        fetchDocs()
    } catch(err) {
      console.log(err)
      loading.setDocsLoading = false
    }
} 
const addNewDoc = async(formData) => {
   loading.addDocLoading = true
    try {
        await docsApi.postDoc(routeId.value, formData)
        fetchDocs()
        formSuccess.value++
        
    } catch(err) {
        console.log(err)
    } finally {
        loading.addDocLoading = false
    }
}
const sortDocs = async(thisItem, changedItemsArr) => {
    loading.setDocsLoading = true
    let updateCount = changedItemsArr.length + 1
    try {
        await docsApi.sortDocs(routeId.value, thisItem.itemId, { "orderId": thisItem.itemOrderId })
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
const changeDocName = async(id, data) => {
    try {
        await docsApi.changeDocName(routeId.value, id, data)
        fetchDocs()
    } catch(err) {
      console.log(err)
    }
} 
provide('delDoc', delDoc)
provide('changeDocName', changeDocName)
onMounted(async() => {
    const user = localStorage.getItem('user')
    routeId.value = route.params.id
    let urlMatchInvite = route.fullPath.match("invite")
    let link = urlMatchInvite ? route.fullPath.substring(urlMatchInvite.index + 7) : ""
    if (user) {
        if (urlMatchInvite) {
            try {
                const {data} = await inviteApi.checkInviteLink(routeId.value, link)
                if (data.length > 0) {
                    fetchDocs()
                } else {
                    router.push("/access-denied")
                }
            } catch(err) {
                console.log(err)
            }
        } else {
            const email = JSON.parse(user).email
            try {
                const { data } = await inviteApi.checkUser(routeId.value, email)
                if (data.length > 0) {
                    fetchDocs()
                } else {
                    router.push("/access-denied")
                }
            } catch(err) {
                console.log(err)
            }
        }
    } else {
        if (urlMatchInvite) {
            localStorage.setItem("inviteLink", JSON.stringify({id:routeId.value, link}))
        }
        router.push("/login")
    }
})
</script>
<template>
    <PageWrap>
        <section class="section intro clients-docs">
            <div class="container">
                <div class="sec-top">
                    <h1>nn-dobro.ru</h1>
                    <p>На этой странице вы найдете инструкции и полезные документы для работы с ваши сайтом</p>
                </div>
                <Invite :routeId="routeId" v-if="isAdmin"/>
                <div class="clients-docs__items" v-if="totalCount" :class="loading.setDocsLoading && 'loading'">
                    <Section v-for="(arr,idx) in items"
                    :key="idx"
                    :id="sections[idx].id"
                    :title="sections[idx].title"
                    :item="arr"
                    @sortDocs="sortDocs"
                    />
                </div>
                <AddDoc v-if="isAdmin"
                :addDocLoading="loading.addDocLoading"
                :sections="sections" 
                :formSuccess="formSuccess"
                @addNewDoc="addNewDoc" 
                />
            </div>
        </section>
    </PageWrap>
</template>


