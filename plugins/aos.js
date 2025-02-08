// plugins/aos.js
import AOS from 'aos';
import 'aos/dist/aos.css';

export default ({ app }) => {
  if (process.client) {
    AOS.init({
      duration: 500,
      easing: 'ease-in-out',
      once: true,
    });
    AOS.refresh(); // <-- Odświeżenie AOS po inicjalizacji
  }
};