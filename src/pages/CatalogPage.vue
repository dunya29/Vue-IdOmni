<script setup>
import { catalogApi } from '@/api/api';
import AddPage from '@/components/Catalog/AddPage.vue';
import CatalogItem from '@/components/Catalog/CatalogItem.vue';
import PageWrap from '@/components/PageWrap.vue';
import { useAuthStore } from '@/store/auth'
import { onMounted, provide, ref } from 'vue';
const pageItems = ref([])
const formSuccess = ref(0)
const loading = ref({
    setPagesLoading: false,
    addPageloading: false,
})

const { isAdmin } = useAuthStore()
const fetchPages = async() => {
    loading.setPagesLoading = true
    try {
        const { data } = await catalogApi.getPages()
        pageItems.value = data
    } catch(err) {
        console.log(err)
    } finally {
        loading.setPagesLoading = false
    }
}
const delPage = async(id) => {
    loading.setPagesLoading = true
    try {
        await catalogApi.delPage(id)
        fetchPages()
    } catch(err) {
      console.log(err)
        loading.setPagesLoading = false
    } 
} 
const addNewPage = async (data) => {
    loading.addPageLoading = true
    try {
        await catalogApi.postPage(data)
        fetchPages()
        formSuccess.value++
    } catch(err) {
      console.log(err)
    } finally {
        loading.addPageLoading = false
    }
}
const pageNameOnChange = async(id, data) => {
    try {
        await catalogApi.changePageName(id,data)
        fetchItems()
    } catch (err) {
        console.log(err)
    }
}
provide('delPage', delPage)
onMounted(fetchPages)
</script>
<template>
    <PageWrap>
        <section class="section intro clients-docs">
            <div class="container">
                <div class="sec-top">
                    <h1>Каталог</h1>
                    <p>Доступные вам инструкции на ваши сайты вы найдете ниже.</p>
                    <p>Если вам кажется, что чего-то не хватает, или вам что-то непонятно, пожалуйста свяжитесь с нами</p>
                </div>
                <div class="clients-docs__items">
                    <div class="clients-docs__title"><h2>Список страниц</h2></div>
                    <transition-group type="transition" name="fadeUp">             
                        <CatalogItem v-for="item in pageItems"
                        :key="item.id"
                        :id="item.id"
                        :title="item.title"
                        :isAdmin="isAdmin"
                        @pageNameOnChange="pageNameOnChange"
                        @delPage="delPage"/>
                    </transition-group>
                </div>
                <AddPage v-if="isAdmin" 
                :formSuccess="formSuccess" 
                :addPageLoading="loading.addPageLoading"
                @addNewPage="addNewPage"
                />
            </div>
        </section>
    </PageWrap>
</template>