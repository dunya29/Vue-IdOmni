<script setup>
const props = defineProps({
    id: Number,
    title: String,
    item: Array,
    isAdmin: Boolean
})
import { computed, ref, watch } from 'vue';
import Doc from './Doc.vue';
import draggableComponent from 'vuedraggable';
import AddDocModal from '../Modals/AddDocModal.vue';
import TextareaEdit from '../TextareaEdit.vue';
const maxOrderId = computed(() => Math.max(...props.item.map(item => item.orderId)))
const isAaddDocMod = ref(false)
const closeAddDocMod = () => {
    isAaddDocMod.value = false
}
const emit = defineEmits(['sortDocs','delSec','changeSecName'])
const list = ref(props.item)
const update = (e) => {
    let thisItem = {
        id: props.item[e.oldIndex].id,
        orderId: props.item[e.newIndex].orderId
    }
    let items = [...props.item]
    let changedItemsArr = []
    if (e.newIndex > e.oldIndex) {
        changedItemsArr = [...items.slice(e.oldIndex+1, e.newIndex+1)].map(item => ({id: item.id, params: {"orderId": item.orderId - 1}}))
    } else {
        changedItemsArr = [...items.slice(e.newIndex, e.oldIndex)].map(item => ({id: item.id, params: {"orderId": item.orderId + 1}}))
    }
    emit('sortDocs',thisItem, changedItemsArr)
}
const secNameOnChange = (text) => {
    emit('changeSecName', props.id, text)
}
watch(()=>props.item, () => {
    list.value = props.item
   }
)
</script>
<template>
    <div class="sec-docs">
        <div class="sec-docs__top">
            <h2 class="sec-docs__title">  
                <TextareaEdit v-if="isAdmin" :initVal="title" @onChange="secNameOnChange"/> 
                <span v-else>{{ title }}</span>
            </h2> 
            <button class="btn primary-btn" v-if="isAdmin" @click="() => isAaddDocMod = true">
                <span>Добавить документ<svg><use xlink:href="../../assets/img/icons/sprite.svg#plus"></use></svg></span>
            </button>
            <Teleport to="body">
                <transition name="modal-fade">
                    <AddDocModal v-if="isAaddDocMod" :id="id" :title="title" :maxOrderId="maxOrderId" @closeAddDocMod="closeAddDocMod"/>
                </transition>  
            </Teleport>
        </div>
        <draggableComponent 
            v-if="item && item.length"
            v-model="list" 
            item-key="id" 
            handle=".item-doc__handle" 
            @update="update" 
            class="sec-docs__items" > 
                <template #item="{element: el}">   
                    <Doc
                    :id="el.id"
                    :name="el.name"
                    :content="el.content"
                    :docURL="el.docURL"
                    :iconURL="el.iconURL"
                    :download="el.download"
                    />
                </template>
        </draggableComponent>
        <button class="btn sec-docs__del" v-if="isAdmin" @click="()=>emit('delSec', id)"><svg><use xlink:href="../../assets/img/icons/sprite.svg#plus"></use></svg>Удалить раздел</button>
    </div>
</template>