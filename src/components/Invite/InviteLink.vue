<script setup>
const props = defineProps({
    inviteLink: String
})
const emit = defineEmits(['setInviteLink', 'randomizeInviteLink'])
const copyInviteLink = () => {
    let inp = document.createElement("input");
    document.body.append(inp)
    let val = location.origin + location.pathname + '?invite=' + props.inviteLink
    inp.value = val
    inp.select()
    document.execCommand("copy")
    inp.remove()
}
const delInviteLink = async() => {
    let data = {
        "link": ""
    }
    emit('setInviteLink',data)
}
</script>
<template>
    <div class="invite-link">
        <p>Инвайт ссылка</p>
        <div class="invite-link__inner">
            <span class="invite-link__link"  v-if="inviteLink">{{ inviteLink }}</span>
            <div class="invite-link__action">
                <button class="btn-reset" v-if="inviteLink" @click="()=>copyInviteLink()">Копировать</button>
                <button class="btn-reset" v-if="inviteLink" @click="()=>delInviteLink()">Удалить</button>
                <button class="btn-reset" @click="()=>emit('randomizeInviteLink')">{{ inviteLink ? 'Создать заново' : 'Создать' }}</button>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .invite-link {     
        margin-bottom: 24px;
        &__link {
            display: block;
            word-break: break-word;
            margin-right: 40px;
            margin-bottom: 16px;
        }
        &__inner {
            display: inline-block;
            font-weight: 500;
            line-height: 1;
            padding: 12px;
            border: 2px solid #000;
            border-radius: 20px;
            margin-top: 8px;
        }
        &__action {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            margin: -5px;
            button {
                margin: 5px;
            }
        }
    }
</style>