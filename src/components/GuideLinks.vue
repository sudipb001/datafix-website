<script setup lang="ts">
import { guides, pageHref } from '../pages'
defineProps<{ current?: string }>()
</script>
<template><section id="guides" class="container section guide-links" aria-labelledby="guides-heading"><p class="eyebrow">PRACTICAL DATA GUIDES</p><h2 id="guides-heading">A clearer next step for your data</h2><div class="guide-grid"><a v-for="guide in guides.filter(g => g.path !== current)" :key="guide.path" :href="pageHref(guide.path)"><h3>{{ guide.h1 }}</h3><p>{{ guide.description }}</p><span>Read the guide →</span></a></div></section></template>
