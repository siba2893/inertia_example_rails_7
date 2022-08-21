<template>
  <div class="flex flex-column align-items-center justify-content-center flex-1 bg-gray-100 h-full">
    <flash-messages :flash="$page.props.flash" />
    <slot />
  </div>
</template>

<script setup>
import FlashMessages from '~/components/shared/FlashMessages.vue'
</script>