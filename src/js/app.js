if (import.meta.hot) {
    import.meta.hot.accept();
    console.log("Hot Module Replacement Occurred");
}

import Glide from '@glidejs/glide';

// Initialize after DOM is ready
let slidegap = 30;
let firstSlide = document.querySelector('.glide__slide').offsetWidth;
console.log(firstSlide)
console.log('firstwidth',firstSlide)
document.addEventListener('DOMContentLoaded', () => {
  new Glide(".glide", {
    peek: {
      before: 0, // Amount to peek on the left (previous slide)
      after: firstSlide // Amount to peek on the right (next slide)
    },
    gap:slidegap,
    type: "carousel"
  }).mount();
});

//Paint Effects
import './paint.js';
import './paintflood.js';

//Elevate CSS
import '../styles/elevate.css';
import '../../node_modules/@glidejs/glide/dist/css/glide.core.min.css'
import '../../node_modules/@glidejs/glide/dist/css/glide.theme.min.css'


