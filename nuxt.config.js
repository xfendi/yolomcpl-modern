import tailwindTypography from "@tailwindcss/typography";

module.exports = {
  buildDir: "dist",
  target: "static", // To wymusza generowanie statycznych plików
  ssr: false,
  publicRuntimeConfig: {
    shop_id: 13760, // id sklepu na vishop
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis, ligula sed lacinia mollis, enim turpis suscipit enim, porta viverra tellus risus et augue.", // opis serwera
    address: "yolomc.pl", // adres serwera
    primaryColor: "#000000", // kolor główny
    gradientColor: "#DAB87D", // daj tutaj lekko jaśniejszy niż główny - kolor używany w środku gradientów,
    showProductName: true, // czy pokazywać nazwy produktów w sklepie
    socialMedia: [
      // social media serwera
      {
        name: "Discord",
        icon: "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6ca814282eca7172c6_icon_clyde_white_RGB.svg",
        link: "https://dc.yolomc.pl/",
      },
      {
        name: "TikTok Fendis54",
        icon: "https://i.imgur.com/w8CLcAH.png",
        link: "https://linktr.ee/fendis54",
      },
      {
        name: "TikTok YoloMC",
        icon: "https://i.imgur.com/kX2fO4Y.png",
        link: "https://tt.yolomc.pl/",
      },
    ],
  },
  head: {
    title: "YOLOMC.PL", // tytuł strony
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Innowacyjny serwer Minecraft z trybem BoxPvp",
      }, // opis strony dla wyszukiwarek i discorda
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/yolologo.png" }, // ikona strony, podmień ją w folderze static
      {
        rel: "stylesheet ",
        href: "https://fonts.googleapis.com/css2?family=Titillium+Web:wght@600&display=swap",
      },
    ],
  },
  /*
   ** Poniższa konfiguracja jest dla bardziej zaawansowanych użytkowników, nie ma tam nic ciekawego
   */
  server: {
    host: "0.0.0.0",
  },
  css: ["@/assets/css/main.css"],
  plugins: [
    { src: "~/plugins/price.js" },
    { src: "~/plugins/aos.js", mode: "client" },
  ],
  buildModules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    config: {
      plugins: [tailwindTypography],
      theme: {
        extend: {
          typography: {
            DEFAULT: {
              css: {
                color: "#ececec",
                h1: {
                  color: "#ececec",
                },
                h2: {
                  color: "#ececec",
                },
                h3: {
                  color: "#ececec",
                },
                h4: {
                  color: "#ececec",
                },
                h5: {
                  color: "#ececec",
                },
                h6: {
                  color: "#ececec",
                },
                strong: {
                  color: "#ececec",
                },
                blockquote: {
                  color: "#ececec",
                },
                code: {
                  color: "#ececec",
                },
                figcaption: {
                  color: "#ececec",
                },
              },
            },
          },
        },
      },
    },
  },
  modules: ["vue-toastification/nuxt"],
  loading: { color: "#3B8070" },
  build: {
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
        });
      }
    },
  },
};
