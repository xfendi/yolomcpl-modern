<template>
  <div>
    <section
      data-aos="flip-up"
      class="mt-20 intro relative flex flex-col lg:flex-row justify-center overflow-hidden lg:justify-between items-center md:items-start bg-yellow-100 p-10 xl:pb-0 rounded-3xl"
    >
      <div
        class="flex flex-col gap-5 text-center items-center md:text-left md:items-start z-10"
      >
        <h1 class="metropolis text-6xl text-gray-800">
          Chcesz być na <br />
          bieżąco?
        </h1>
        <p>
          Dołącz do naszej społeczności Discord. <br />
          Poznaj eventy, konkursy i wiele innych.
        </p>
        <div
          class="flex flex-col md:flex-row items-center md:items-start gap-5"
        >
          <a
            href="https://dc.yolomc.pl"
            class="nav-btn p-4 px-10 rounded-xl border-2 border-black hover:bg-yellow-300"
            >DOŁACZ TERAZ</a
          >
        </div>
      </div>
      <div class="z-10 hidden xl:flex">
        <img
          src="~assets/discord.png"
          alt="render"
          width="300"
          class="opacity-50"
        />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "discord",
};
</script>

<style scoped></style>
