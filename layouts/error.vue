<template>
  <div class="text-center mt-20">
    <h1
      v-if="error.statusCode === 404"
      class="metropolis text-5xl text-gray-800"
    >
      Nie znaleziono
    </h1>
    <h1 v-else class="metropolis text-5xl text-gray-800">Wystąpił błąd</h1>
    <NuxtLink to="/">Wróć do strony głównej</NuxtLink>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "error", // you can set a custom layout for the error page
};
</script>
