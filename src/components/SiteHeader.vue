<script setup lang="ts">
import { ref } from 'vue'
import { Menu, X, ArrowUpRight } from '@lucide/vue'
import { navigation, asset, products } from '../data'
const open = ref(false)
</script>
<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header"><div class="container header-inner">
    <a class="brand" href="#home" aria-label="DataFix home"><img :src="asset(products[0]!.icon)" width="36" height="36" alt="" />Data<span>Fix</span></a>
    <button class="menu-toggle" :aria-expanded="open" aria-controls="main-navigation" :aria-label="open ? 'Close navigation' : 'Open navigation'" @click="open = !open"><X v-if="open" :size="22" /><Menu v-else :size="22" /></button>
    <nav id="main-navigation" aria-label="Main navigation" :class="{ open }" @keydown.esc="open = false"><a v-for="item in navigation" :key="item.id" :href="`#${item.id}`" @click="open = false">{{ item.label }}</a></nav>
    <a class="header-cta" href="#products">Find your app <ArrowUpRight :size="16" /></a>
  </div></header>
</template>
