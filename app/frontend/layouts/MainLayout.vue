<template>
  <!--  <div class="flex flex-column flex-1 bg-gray-100 h-full">-->
  <!--    <flash-messages :flash="$page.props.flash"/>-->

  <!--    <slot/>-->
  <!--  </div>-->

  <div class="layout-wrapper layout-static">
    <Menu :model="items"/>

    <slot/>
  </div>
</template>

<script setup>
/* Logic Imports */
import { ref } from 'vue'
import { usersSessions } from '../api/all'

/* Component Imports */
import FlashMessages from '~/components/shared/FlashMessages.vue'

/* PrimeVue Imports */
import Menu from 'primevue/menu/sfc'
import { Inertia } from '@inertiajs/inertia'

const items = ref([
  {
    label: 'Recipes',
    icon: 'pi pi-sign-out',
    command: () => {
      Inertia.delete(usersSessions.destroy.path())
    }
  },
  {
    label: 'Ingredients',
    icon: 'pi pi-sign-out',
    command: () => {
      Inertia.delete(usersSessions.destroy.path())
    }
  },
  {
    label: 'Quotes',
    icon: 'pi pi-sign-out',
    command: () => {
      Inertia.delete(usersSessions.destroy.path())
    }
  },
  {
    separator:true
  },
  {
    label: 'Logout',
    icon: 'pi pi-sign-out',
    command: () => {
      Inertia.delete(usersSessions.destroy.path())
    }
  }
]);

</script>