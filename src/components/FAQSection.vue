<script setup lang="ts">
import { faqs } from '../data'
</script>
<template><section id="faq" class="section container faq-layout"><div><p class="eyebrow">GOOD TO KNOW</p><h2>A little more clarity.</h2><p class="section-intro">Answers before you open your next file.</p></div><div class="faq-list"><details v-for="faq in faqs" :key="faq.question"><summary>{{ faq.question }}<span aria-hidden="true">+</span></summary><p>{{ faq.answer }}</p></details></div></section></template>
