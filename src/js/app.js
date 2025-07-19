

if (import.meta.hot) {
    import.meta.hot.accept();
    console.log("Hot Module Replacement Occurred");
}

import './paint.js';
import '../styles/elevate.css';