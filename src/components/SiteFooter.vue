<script setup lang="ts">
import { ArrowRight, ArrowUpRight } from '@lucide/vue'
import { products } from '../data'
const year = new Date().getFullYear()
</script>
<template><aside class="closing container"><p class="eyebrow">MAKE YOUR NEXT FILE A CLEANER ONE</p><h2>Ready to find your fix?</h2><a class="button primary" href="#products">Explore Our Apps <ArrowRight :size="18" /></a></aside><footer class="container site-footer"><div class="footer-main"><div><a class="brand" href="#home">Data<span>Fix</span></a><p>Windows tools for cleaner data<br />and clearer workflows.</p></div><nav aria-label="Footer navigation"><a v-for="product in products" :key="product.id" :href="product.storeUrl" target="_blank" rel="noopener noreferrer">{{ product.name }} on Microsoft Store <ArrowUpRight :size="14" /></a><a href="https://github.com/sudipb001/datafix-website" target="_blank" rel="noopener noreferrer">Website on GitHub <ArrowUpRight :size="14" /></a></nav></div><div class="footer-bottom"><span>© {{ year }} DataFix. All rights reserved.</span><span>Made for Windows. Built around your data.</span></div></footer></template>
