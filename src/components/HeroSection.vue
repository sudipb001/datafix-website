<script setup lang="ts">
import { ArrowRight, Check, Monitor } from '@lucide/vue'
import { products, asset } from '../data'
</script>
<template>
<section id="home" class="hero container">
  <div class="hero-copy"><p class="eyebrow"><span class="status-dot"></span> A CLEARER WAY TO WORK WITH DATA</p><h1>Messy Data?<br />Meet Your <span class="gradient-text">Fix.</span></h1><p class="hero-description">Your files have potential. Bring it into focus with Windows tools for cleaning, inspecting, and transforming data.</p><div class="hero-actions"><a class="button primary" href="#products">Explore Our Apps <ArrowRight :size="18" /></a><a class="text-link" href="#screenshots">See them in action <ArrowRight :size="16" /></a></div><p class="hero-note"><Monitor :size="15" /> Built for Windows <span>·</span> Data processed on your computer</p></div>
  <div class="hero-art"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="hero-product hero-product-main"><a :href="products[0]!.storeUrl" target="_blank" rel="noopener noreferrer" aria-label="View DataFix on Microsoft Store (opens in a new tab)"><img :src="asset(products[0]!.icon)" width="140" height="140" alt="Official DataFix application icon" fetchpriority="high" /></a><span>DataFix</span><small>Clean Data. Better Results.</small></div><div class="hero-product hero-product-magic"><a :href="products[1]!.storeUrl" target="_blank" rel="noopener noreferrer" aria-label="View DataFix Magic on Microsoft Store (opens in a new tab)"><img :src="asset(products[1]!.icon)" width="110" height="110" alt="Official DataFix Magic application icon" /></a><span>DataFix Magic</span><small>Clean. Validate. Repeat.</small></div><div class="art-tag"><Check :size="16" /> A fresh start for your data</div><span class="format-float format-csv">.CSV</span><span class="format-float format-xlsx">.XLSX</span><span class="format-float format-json">.JSON</span></div>
</section>
<div class="format-strip container"><span>YOUR FILES. MORE POSSIBILITIES.</span><div>CSV <i></i> Excel XLSX <i></i> JSON <i></i> SQLite</div><small>Format support varies by app</small></div>
</template>
