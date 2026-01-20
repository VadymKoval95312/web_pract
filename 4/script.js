const btns = document.querySelectorAll(".mode-btn");

function setActive(mode){
  btns.forEach(b => b.classList.toggle("active", b.dataset.mode === mode));
}

function clearModes(){
  document.body.classList.remove("mode-sm","mode-md","mode-lg");
}

btns.forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const mode = btn.dataset.mode;

    if(mode === "auto"){
      clearModes();
      localStorage.removeItem("mode");
      setActive("auto");
      return;
    }

    clearModes();
    document.body.classList.add("mode-" + mode);
    localStorage.setItem("mode", mode);
    setActive(mode);
  });
});

const saved = localStorage.getItem("mode");
if(saved){
  clearModes();
  document.body.classList.add("mode-" + saved);
  setActive(saved);
} else {
  setActive("auto");
}
