<script setup lang="ts">
import { pageHref, type Page } from '../pages'
defineProps<{ page: Page }>()
</script>
<template><nav class="breadcrumbs" aria-label="Breadcrumb"><ol><li><a :href="pageHref()">Home</a></li><li v-if="page.kind === 'guide'"><a :href="pageHref() + '#guides'">Guides</a></li><li aria-current="page">{{ page.productId === 'datafix' ? 'DataFix' : page.productId === 'datafix-magic' ? 'DataFix Magic' : page.h1 }}</li></ol></nav></template>
