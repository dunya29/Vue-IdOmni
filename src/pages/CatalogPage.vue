<script setup>
import { catalogApi } from '@/api/api';
import AddPage from '@/components/Catalog/AddPage.vue';
import CatalogItem from '@/components/Catalog/CatalogItem.vue';
import PageWrap from '@/components/PageWrap.vue';
import { useAuthStore } from '@/store/auth'
import { onMounted, ref } from 'vue';
import draggableComponent from 'vuedraggable';
const pageItems = ref([])
const pageList = ref([...pageItems.value])
const setPagesLoading = ref(false)
const addPageLoading= ref(false)
const storeAuth = useAuthStore()
const addPageForm = ref(null)
const sortFetchCount = ref(0)
const fetchPages = async() => {
    setPagesLoading.value = true
    try {
        const { data } = await catalogApi.getPages()
        pageItems.value = data
        pageList.value = [...pageItems.value]
    } catch(err) {
        console.log(err)
    } finally {
        setPagesLoading.value = false
    }
}
const delPage = async(id) => {
    setPagesLoading.value = true
    try {
        await catalogApi.delPage(id)
        fetchPages()
    } catch(err) {
        console.log(err)
        setPagesLoading.value = false
    } 
} 
const addNewPage = async (data) => {
    addPageLoading.value = true
    try {
        await catalogApi.postPage(data)
        addPageForm.value.resetForm()  
        fetchPages()
    } catch(err) {
      console.log(err)
    } finally {
        addPageLoading.value = false
    }
}
const pageNameOnChange = async(id, text) => {
    let data = {
        "title": text
    } 
    try {
        await catalogApi.changePageName(id,data)
    } catch (err) {
        console.log(err)
    }
}
const sortPages = async(thisItem, changedItemsArr) => {
    setPagesLoading.value = true
    let updateCount = changedItemsArr.length + 1
    try {
        await catalogApi.sortPages(thisItem.id, { "orderId": thisItem.orderId })
        sortFetchCount.value++
        changedItemsArr.forEach(async(item) => {
            try {
                await catalogApi.sortPages(item.id, item.params) 
                sortFetchCount.value++
                if (sortFetchCount.value == updateCount) {
                    fetchPages()
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
const update = (e) => {
    let thisItem = {
        id: pageItems.value[e.oldIndex].id,
        orderId: pageItems.value[e.newIndex].orderId
    }
    let items = [...pageItems.value]
    let changedItemsArr = []
    if (e.newIndex > e.oldIndex) {
        changedItemsArr = [...items.slice(e.oldIndex+1, e.newIndex+1)].map(item => ({id: item.id, params: {"orderId": item.orderId - 1}}))
    } else {
        changedItemsArr = [...items.slice(e.newIndex, e.oldIndex)].map(item => ({id: item.id, params: {"orderId": item.orderId + 1}}))
    } 
    sortPages(thisItem, changedItemsArr)
    console.log("updateend")
}
onMounted(fetchPages)
</script>
<template>
    <PageWrap>
        <section class="section intro docs-p">
            <div class="container">
                <div class="sec-top">
                    <h1>Каталог</h1>
                    <p>Доступные вам инструкции на ваши сайты вы найдете ниже.</p>
                    <p>Если вам кажется, что чего-то не хватает, или вам что-то непонятно, пожалуйста свяжитесь с нами</p>
                </div>
                <div class="docs-p__items">
                    <div class="docs-p__title"><h2>Список страниц</h2></div>
                    <draggableComponent
                        v-if="pageItems.length"
                        item-key="id"
                        v-model="pageList" 
                        handle=".item-doc__handle" 
                        class="docs-p__pages" 
                        @update="update"> 
                            <template #item="{element: item}">   
                                <CatalogItem
                                :key="item.id"
                                :id="item.id"
                                :title="item.title"
                                :isAdmin="storeAuth.userData.isAdmin"
                                @pageNameOnChange="pageNameOnChange"
                                @delPage="delPage"/>
                            </template>
                    </draggableComponent>
                </div>
                <AddPage v-if="storeAuth.userData.isAdmin" 
                ref="addPageForm"
                :addPageLoading="addPageLoading"
                @addNewPage="addNewPage"
                />
            </div>
        </section>
    </PageWrap>
</template>