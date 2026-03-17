const items = document.querySelectorAll(".nav-item");

items.forEach((item) => {
  if (item.href.includes(location.pathname)) {
    item.classList.add("active");
  }
});
