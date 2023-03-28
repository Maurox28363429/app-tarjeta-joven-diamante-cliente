<script setup>
import { useRouter } from 'vue-router'
import MembershipsPayment from '../../src/components/MembershipsPayment.vue'
/* eslint-disable camelcase */
const router = useRouter()

const membresia_name = router.currentRoute.value.fullPath.split('/')[2]

console.log(membresia_name, 'params')

const memberships = {
  pro: {
    name: 'pro',
    price: 100,
    benefits: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    ]
  },
  free: {
    name: 'free',
    price: 0,
    benefits: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    ]
  }
}

const { name, price, benefits } = memberships[membresia_name]

console.log(memberships[membresia_name], 'memberships')
</script>

<template>
  <MembershipsPayment :name="name" :price="price" :benefits="benefits" />
</template>
