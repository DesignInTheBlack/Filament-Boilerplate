document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("openMenu");
  console.log("navButton found?", el);

  if (!el) return;

  el.addEventListener("click", () => {
    // 1) capture current class list
    const prevClassList = el.className; // string version (easy to store/restore)

    // 2) replace it with a new class list (empty for now)
    el.className = "ctx:mobileButton events:auto visible z:1000 absolute top:0 right:0 w:wScreen h:hScreen bg-color:black row:x-center:y-center pd-b:d2 pd-l:d3 /lg/ invisible ctx:end";

    // optional: verify
    console.log({ prevClassList, newClassList: el.className });
  });
});