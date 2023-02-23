<template>
  <div v-cloak>


    <router-view :key="$route.path" />
    <router-link to="/xd">xd</router-link>

  </div>
</template>
