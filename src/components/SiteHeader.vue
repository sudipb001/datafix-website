<script setup lang="ts">
import { ref } from 'vue'
import { Menu, X, ArrowUpRight } from '@lucide/vue'
import { navigation, asset, products } from '../data'
import { pageHref } from '../pages'
const open = ref(false)
const toggle = ref<HTMLButtonElement>()
const closeOnEscape = () => { open.value = false; toggle.value?.focus() }
</script>
<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header"><div class="container header-inner">
    <a class="brand" :href="pageHref()" aria-label="DataFix home"><img :src="asset(products[0]!.icon)" width="36" height="36" alt="" />Data<span>Fix</span></a>
    <button ref="toggle" class="menu-toggle" :aria-expanded="open" aria-controls="main-navigation" :aria-label="open ? 'Close navigation' : 'Open navigation'" @click="open = !open"><X v-if="open" :size="22" /><Menu v-else :size="22" /></button>
    <nav id="main-navigation" aria-label="Main navigation" :class="{ open }" @keydown.esc="closeOnEscape"><a :href="pageHref()" @click="open = false">Home</a><a v-for="product in products" :key="product.id" :href="pageHref(product.id + '/')" @click="open = false">{{ product.name }}</a><a v-for="item in navigation" :key="item.id" :href="pageHref() + '#' + item.id" @click="open = false">{{ item.label }}</a></nav>
    <a class="header-cta" :href="pageHref() + '#products'">Find your app <ArrowUpRight :size="16" /></a>
  </div></header>
</template>
