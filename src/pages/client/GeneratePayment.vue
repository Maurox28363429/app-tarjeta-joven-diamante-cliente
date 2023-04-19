<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()

const { id } = router.currentRoute.value.params
const mau = ref({})
onMounted(() => {
  console.log(id)
})
</script>

<template>
  <div>
    <h1>{{ mau }}</h1>
  </div>
</template>
