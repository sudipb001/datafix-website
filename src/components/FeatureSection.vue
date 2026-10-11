<script setup lang="ts">
import { Monitor, ScanSearch, ShieldCheck, Workflow } from '@lucide/vue'
const benefits = [
  { icon: Monitor, title: 'At home on Windows', text: 'Native desktop applications with familiar file-based workflows. Open a file and get to work.' },
  { icon: ScanSearch, title: 'Clarity before cleanup', text: 'Inspect your data and understand what needs attention. DataFix lets you preview supported changes.' },
  { icon: ShieldCheck, title: 'Your data stays local', text: 'Both apps process files on your computer. DataFix Magic uses Microsoft Store for purchase verification.' },
  { icon: Workflow, title: 'Less repetitive work', text: 'Convert supported formats with DataFix, or reuse recipes across CSV and XLSX files with DataFix Magic.' }
]
</script>
<template><section id="features" class="feature-section"><div class="container section"><p class="eyebrow">BUILT AROUND YOUR WORK</p><h2>Why choose DataFix tools?</h2><p class="section-intro">A practical path from untidy files to useful data.</p><div class="benefit-grid"><article v-for="benefit in benefits" :key="benefit.title"><div class="benefit-icon"><component :is="benefit.icon" :size="24" aria-hidden="true" /></div><h3>{{ benefit.title }}</h3><p>{{ benefit.text }}</p></article></div></div></section></template>
