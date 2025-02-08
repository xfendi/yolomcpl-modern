<template>
  <div :style="cssVars" class="container-fluid mx-5 lg:mx-32">
    <component :is="`style`"
      >::-webkit-scrollbar-thumb { background-color:
      {{ this.$config.primaryColor }}; outline: none; }</component
    >
    <Navbar />
    <nuxt />
    <Discord />
    <Footer />
  </div>
</template>

<script>
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";
import Discord from "~/components/Discord.vue";

export default {
  components: {
    Navbar,
    Footer,
    Discord,
  },
  computed: {
    cssVars() {
      return {
        "--primary-color": this.$config.primaryColor,
        "--gradient-color": this.$config.gradientColor,
      };
    },
  },
};
</script>

<style>
::-webkit-scrollbar {
  display: block !important;
  background: #fff;
  width: 5px;
}
</style>
