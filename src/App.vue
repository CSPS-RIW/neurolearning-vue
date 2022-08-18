<template>
  <div v-cloak>
        
        <transition>
          <router-view :key="$route.path" />
        </transition>
  </div>
</template>
