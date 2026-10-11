<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import ProductSection from './components/ProductSection.vue'
import FeatureSection from './components/FeatureSection.vue'
import ScreenshotGallery from './components/ScreenshotGallery.vue'
import FAQSection from './components/FAQSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import ProductPage from './components/ProductPage.vue'
import GuidePage from './components/GuidePage.vue'
import GuideLinks from './components/GuideLinks.vue'
import { pages, type Page } from './pages'
withDefaults(defineProps<{ page?: Page }>(), { page: () => pages[0]! })
</script>
<template><SiteHeader /><main id="main"><template v-if="page.kind === 'home'"><HeroSection /><ProductSection /><FeatureSection /><ScreenshotGallery /><FAQSection /><GuideLinks /></template><ProductPage v-else-if="page.kind === 'product'" :page="page" /><GuidePage v-else :page="page" /></main><SiteFooter /></template>
