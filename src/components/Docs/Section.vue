<script setup>
import { ref, watch } from 'vue';
import Doc from './Doc.vue';
import draggableComponent from 'vuedraggable';
import draggable from 'vuedraggable';

const props = defineProps({
    id: Number,
    title: String,
    item: Array
})
const emit = defineEmits(['sortDocs'])
const list = ref(props.item)
const update = (e) => {
    let thisItem = {
        itemId: props.item[e.oldIndex].id,
        itemOrderId: props.item[e.newIndex].orderId
    }
    let items = [...props.item]
    let changedItemsArr = []
    if (e.newIndex > e.oldIndex) {
        changedItemsArr = [...items.slice(e.oldIndex+1, e.newIndex+1)].map(item => ({id: item.id, params: {"orderId": item.orderId - 1}}))
    } else {
        changedItemsArr = [...items.slice(e.newIndex, e.oldIndex)].map(item => ({id: item.id, params: {"orderId": item.orderId + 1}}))
    }
    emit('update',thisItem, changedItemsArr)
}
watch(()=>props.item, () => {
    list.value = props.item
   }
)
</script>
<template>
    <div class="clients-docs__title">
        <h2>{{ title }}</h2> 
    </div>
    <draggableComponent 
        v-model="list" 
        item-key="id" 
        handle=".item-doc__handle" 
        @update="update" 
        class="clients-docs__item" 
        :data-parentId="id" > 
            <template #item="{element: el}">   
                <Doc
                :key="el.id"
                :id="el.id"
                :name="el.name"
                :docURL="el.docURL"
                :iconURL="el.iconURL"
                :download="el.download"
                />
            </template>
    </draggableComponent>
</template>