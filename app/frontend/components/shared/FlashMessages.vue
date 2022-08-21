<template>
  <div v-if="show">
    <Message
        v-if="$page.props.flash.success"
        severity="success">
      {{ $page.props.flash.success }}
    </Message>

    <Message
        v-else-if="$page.props.flash.notice"
        severity="info">
      {{ $page.props.flash.notice }}
    </Message>

    <Message
        v-else-if="$page.props.flash.alert"
        severity="error">
      {{ $page.props.flash.alert }}
    </Message>

    <Message
        v-if="$page.props.errors.length"
        severity="error">
      {{ $page.props.errors.join(', ') }}
    </Message>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

import Message from 'primevue/message/sfc'

const show = ref(false)

const props = defineProps({
  flash: Object
})

watch(() => props.flash, (o, n) => show.value = true)

</script>