<script setup lang="ts">
/**
 *
 */
definePageMeta({
  layout: 'user-layout',
})
</script>

<template>
  <h1 class="font-medium text-2xl">Nuevo Servicio</h1>
  <Card>
    <div class="space-y-1">
      <Label>Número Servicio</Label>
      <Input placeholder="0001" />
    </div>

    <div class="space-y-1">
      <Label>Número Servicio</Label>
      <Input placeholder="0001" />
    </div>

    <div class="space-y-1">
      <Label>Número Servicio</Label>
      <Input placeholder="0001" />
    </div>

    <div class="text-end">
      <Button>Crear</Button>
    </div>
  </Card>
</template>
