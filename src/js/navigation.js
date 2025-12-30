document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("openMenu");
  const links = document.getElementById("mobileLinks");
  const button = document.getElementById('openButton')
  const closeButton = document.getElementById('closeButton')


  if (!el) return;
  let status = ""


  //Open State
  button.addEventListener("click", () => {

    if (status != "open") {
      status = "open"
      links.classList.remove('hidden')
      button.classList.add('hidden')
      console.log('opening!')
      el.className = "ctx:mobileButton events:auto visible z:1000 absolute top:0 right:0 w:wScreen h:hScreen bg-color:black row:x-center:y-center /lg/ invisible ctx:end";
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';

    }  

  });

  //Close State
  closeButton.addEventListener("click", () => {

    if (status == "open") {
      status = "close"
      links.classList.add('hidden')
      button.classList.remove('hidden')
      console.log("closing!")
      el.className = "ctx:mobileButton events:auto visible z:1000 absolute top:0 right:0 bd:roundbl-s6 w:c1 h:c1 row:x-center:y-center pd-l:d3 /lg/ invisible ctx:end";
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

  });


});