<template>
  <n-layout has-sider class="h-full">
    <n-layout-sider
        bordered
        show-trigger
        collapse-mode="width"
        :width="220"
        :collapsed-width="64"
        :native-scrollbar="false">
      <n-menu
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
      />
    </n-layout-sider>
    <n-layout>
      <n-layout-content content-style="padding: 16px">
        <slot/>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup>
import { h } from 'vue'
import { renderIcon } from '~/composables/renderIcon'
import { Link } from '@inertiajs/inertia-vue3'
import FluentFoodApple20Regular from '~icons/fluent/food-apple-20-regular'
import FluentClipboardBulletListRtl20Regular from '~icons/fluent/clipboard-bullet-list-rtl-20-regular'

const menuOptions = [
  {
    label: () => h(Link, { href: "/ingredients" }, { default: () => 'Recetas' }),
    key: 'ingredients',
    icon: renderIcon(FluentClipboardBulletListRtl20Regular)
  },
  {
    label: () => h(Link, { href: "/recipes" }, { default: () => 'Ingredientes' }),
    key: 'recipes',
    icon: renderIcon(FluentFoodApple20Regular)
  }
]
</script>