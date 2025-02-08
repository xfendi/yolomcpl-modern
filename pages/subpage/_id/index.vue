<template>
<div>
    <div data-aos="fade-up" class="lighter-bg p-10 rounded-3xl links-colored prose max-w-none" v-html="$store.state.subpage.content"></div>
</div>
</template>

<script>
import Divider from "@/components/Divider";

export default {
  name: "index",
  components: {Divider},
  mounted () {
    this.$store.dispatch('loadSubpage', this.$route.params.id)
  }
}
</script>

<style scoped>

</style>
