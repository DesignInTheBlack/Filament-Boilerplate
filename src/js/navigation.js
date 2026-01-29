import { triggerNavFlood } from "./navflood.js";

document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("openMenu");
  const links = document.getElementById("mobileLinks");
  const closeButton = document.getElementById("closeButton");

  if (!el || !links || !closeButton) return;

  let status = "closed";

  // cache original icon markup
  const openIconHTML = el.querySelector("#openButton")?.outerHTML || "";

  // Open (use the container as the click target)
  el.addEventListener("click", (e) => {
    // if you click close button area, ignore
    if (e.target?.id === "closeButton") return;

    if (status !== "open") {
      status = "open";

      links.classList.remove("hidden");

      // remove the open icon entirely
      const openIcon = el.querySelector("#openButton");
      if (openIcon) openIcon.remove();

      el.className =
        "ctx:mobileButton events:auto visible z:1000 absolute top:0 right:0 w:wScreen h:hScreen bg-color:white row:x-center:y-center /lg/ invisible ctx:end";

      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";

      requestAnimationFrame(triggerNavFlood);
    }
  });

  // Close
  closeButton.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent container click from re-opening

    if (status === "open") {
      status = "closed";

      links.classList.add("hidden");

      // put the open icon back
      if (!el.querySelector("#openButton") && openIconHTML) {
        el.insertAdjacentHTML("afterbegin", openIconHTML);
      }

      el.className =
        "ctx:mobileButton events:auto visible z:1000 absolute top:0 right:0 bd:roundbl-s6 w:c1 h:c3 row:x-center:y-center pd-l:d3 /lg/ invisible ctx:end";

      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
  });
});
