<script setup lang="ts">
import { Check, ArrowUpRight } from '@lucide/vue'
import { asset, type Product } from '../data'
import { pageHref } from '../pages'
defineProps<{ product: Product }>()
</script>
<template>
<article class="product-card" :class="product.id" :aria-labelledby="`${product.id}-title`">
  <div class="product-top"><a :href="product.storeUrl" target="_blank" rel="noopener noreferrer" :aria-label="`View ${product.name} on Microsoft Store (opens in a new tab)`"><img :src="asset(product.icon)" width="76" height="76" :alt="`Official ${product.name} application icon`" loading="lazy" /></a><div><p class="eyebrow">{{ product.label }}</p><h3 :id="`${product.id}-title`">{{ product.name }}</h3></div></div>
  <p class="product-description">{{ product.description }}</p><div class="badges"><span v-for="format in product.formats" :key="format">{{ format }}</span></div>
  <ul class="product-features"><li v-for="feature in product.features" :key="feature"><Check :size="17" aria-hidden="true" />{{ feature }}</li></ul>
  <p><a class="text-link" :href="pageHref(product.id + '/')">Explore {{ product.name }} features <ArrowUpRight :size="16" /></a></p>
  <a class="button store-button" :href="product.storeUrl" target="_blank" rel="noopener noreferrer" :aria-label="`View ${product.name} on Microsoft Store (opens in a new tab)`"><span class="windows-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>View on Microsoft Store <ArrowUpRight :size="18" /></a>
  <a class="product-preview" :href="`#${product.id}-screenshots`" :aria-label="`See ${product.name} screenshots`"><img :src="asset(product.screenshots[0]!.file)" :width="product.screenshots[0]!.width" :height="product.screenshots[0]!.height" :alt="product.screenshots[0]!.alt" loading="lazy" decoding="async" /></a>
</article>
</template>
