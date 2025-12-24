function scrollToTop() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}

window.onscroll = function() {
  var backToTopBtn = document.getElementById('backToTop');
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
};