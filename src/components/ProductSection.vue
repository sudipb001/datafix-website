<script setup lang="ts">
import ProductCard from './ProductCard.vue'
import { products } from '../data'
</script>
<template><section id="products" class="section container"><div class="section-heading"><div><p class="eyebrow">OUR WINDOWS APPS</p><h2>Two tools. Your kind of fix.</h2></div><p>Everyday cleanup or a repeatable workflow.<br />Choose the app that fits your files.</p></div><div class="product-grid"><ProductCard v-for="product in products" :key="product.id" :product="product" /></div></section></template>
