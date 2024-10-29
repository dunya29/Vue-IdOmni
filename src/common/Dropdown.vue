<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
    selectedValue: null,
    selectedInitValue: String,
    isDropdownVisible: Boolean,
    closeOnSelect: Boolean
})
const isDropdownVisible = ref(props.isDropdownVisible || false)
const dropDownRef = ref(null)
const selectedValue = computed(() => props.selectedValue ? props.selectedValue : props.selectedInitValue)
const toggleDropdownVisibility = () => {
    if (!isDropdownVisible.value) {
        isDropdownVisible.value = true
        window.addEventListener("click", function clickOutside(e) {
            if (dropDownRef.value &&!dropDownRef.value.contains(e.target)) {
                isDropdownVisible.value = false
                window.removeEventListener("click", clickOutside)
            }
        })
    } else {
        isDropdownVisible.value = false
    } 
}
const closeDropdown = () => {
    isDropdownVisible.value = false 
}
</script>
<template>
    <div class="dropdown" :class="isDropdownVisible && 'open'" ref="dropDownRef">
        <div class="dropdown__header" @click="() => toggleDropdownVisibility()" :aria-label="isDropdownVisible ? 'Закрыть' : 'Открыть'">
            <span>{{ selectedValue }}</span> 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M22.2459 9.04585L12 19.2917L1.75414 9.04585L3.45119 7.34879L10.8 14.6976L12 15.9832L13.2 14.6976L20.5488 7.34879L22.2459 9.04585Z" fill="black"/>
            </svg>                    
        </div>
        <transition name="dropdown-fade">
            <div class="dropdown__body" v-if="isDropdownVisible">           
                <div class="custom-scroll dropdown__options">
                    <slot :closeDropdown="closeOnSelect && closeDropdown" />
                </div>                  
            </div>
        </transition>   
    </div>
</template>

<style lang="scss">
.dropdown-fade-enter-active, .dropdown-fade-leave-active {
    visibility: visible;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    pointer-events: all;
    transition: all .3s linear;
}
.dropdown-fade-enter-from, .dropdown-fade-leave-to {
    visibility: hidden;
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    pointer-events: none;
}
</style>