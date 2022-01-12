//diewalds js :)
const appear = document.querySelector(".appear");
const cb = function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("inview");
    } else {
      entry.target.classList.remove("inview");
    }
  });
};
const io = new IntersectionObserver(cb);
io.observe(appear);
