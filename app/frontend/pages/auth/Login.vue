<template>
  <div class="min-w-[320px] md:min-w-[450px] max-w-[450px]">
    Login
  </div>
</template>

<script setup>
/* Imports */
import { Link } from '@inertiajs/inertia-vue3'

import { ref, computed } from 'vue'
import api from '~/api'

/* Variables */
const formRef = ref(null)
const formModel = ref({
  email: '',
  password: ''
})

/* Computed Properties */
const routes = computed(() => {
  return {
    getSignUp: api.usersRegistrations.new.path(),
  }
})
</script>