<template>
    <select v-model="selected" @input="$emit('update:modelValue', selected)" class="p-2 border-2 rounded border-gray-400 w-full hover:border-red-600 cursor-pointer" >
        <option v-for="(role, idx) in options" :key="idx" :value="role">{{ role.role }}</option>  
    </select> 
</template>

<script setup>
import { ref } from "vue"


const props = defineProps({
    options: Array
})

const selected = ref(null)

</script>


