// Detect current page
const page = document.body.getAttribute("data-page");

// Highlight active tab
document.querySelectorAll(".nav-item").forEach(item => {
  if (item.dataset.page === page) {
    item.classList.add("active");
  }
});
