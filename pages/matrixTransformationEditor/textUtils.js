function  formulaString(mat) {
  return `
      \\begin{equation*}
      \\begin{bmatrix}
      x' \\\\
      y' \\\\
      1
      \\end{bmatrix}
      = 
      \\begin{bmatrix}
      ${mat}
      \\end{bmatrix}
      * 
      \\begin{bmatrix}
      x \\\\
      y \\\\
      1
      \\end{bmatrix}
      \\end{equation*}`
}

function getTranslationString(x,y){
    return formulaString(`
    1 & 0 & ${x}  \\\\
    0 & 1 & ${y} \\\\
    0 & 0 & 1`)
}

function getRotationString(angle){
  return formulaString(`
      cos(${angle}) & -sin(${angle}) & 0  \\\\
      sin(${angle}) & cos(${angle}) & 0 \\\\
      0 & 0 & 1`)
}

function getScaleString(x,y){
  return formulaString(`
  ${x} & 0 & 0  \\\\
    0 & ${y} & 0 \\\\
    0 & 0 & 1`)
}

function renderTex(inputText, outputElement) {
    outputElement.innerHTML = '';
    MathJax.texReset();
    var options = MathJax.getMetricsFor(outputElement);
    options.display = true;
    MathJax.tex2svgPromise(inputText, options).then(function (node) {
      outputElement.appendChild(node);
      MathJax.startup.document.clear();
      MathJax.startup.document.updateDocument();
    }).catch(function (err) {
      outputElement.appendChild(document.createElement('pre')).appendChild(document.createTextNode(err.message));
    })
  }