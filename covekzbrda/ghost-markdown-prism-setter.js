var pre = document.querySelectorAll("pre");
Array.prototype.forEach.call(pre, function (element, index) {
  if (element.querySelector(".set-line-numbers")) {
    element.className += " line-numbers";
  }
});
