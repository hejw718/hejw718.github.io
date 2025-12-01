<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="transit-card">
    <div class="transit-icon">{{ data.icon }}</div>
    <div class="transit-info">
      <div class="transit-duration">{{ data.duration }}</div>
      <div class="transit-route" v-html="data.route"></div>
    </div>
    <a v-if="data.ticketUrl" :href="data.ticketUrl" target="_blank" class="transit-ticket-btn">
      🎫 查看票券
    </a>
  </div>
</template>
