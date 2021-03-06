var errors, errors_all;

window.onload = function() {
  var ast, codeElem, container, error, errorsInput, i, index, len, parser, rawContent, results;
  errorsInput = document.querySelector('#errorsPreety');
  parser = new derivaciones.Parser;
  results = [];
  for (index = i = 0, len = errors.length; i < len; index = ++i) {
    error = errors[index];
    ast = validator.validate(error, parser);
    if (ast) {
      viewer.process(ast);
      ast.root.view.title = error;
      container = document.createElement('div');
      container.classList.add('error-container');
      codeElem = document.createElement('pre');
      container.appendChild(codeElem);
      container.appendChild(ast.root.view);
      rawContent = document.createTextNode(error);
      codeElem.appendChild(rawContent);
      results.push(errorsInput.appendChild(container));
    } else {
      results.push(errorsInput.appendChild(document.createTextNode('error al procesar')));
    }
  }
  return results;
};

errors = [" 1:q → s premisa  \n" + " 2:q V q premisa  \n" + " 3:s EV(1,2)   ", " 1:q premisa      \n" + " 2:q ∧ q I∧(1,1)   ", " 1:q premisa      \n" + " 2:q ∧ q I∧(1)    ", " 1:q premisa      \n" + " 2:q V r IV(1)    \n" + " 3:q V (q V r) IV(1,2)", " 1:q supuesto      \n" + " <<                \n" + " 2:q→q I→(1)     ", " 1:¬q premisa      \n" + " 2:q→r premisa     \n" + " 3:q supuesto      ", " 1:¬q premisa      \n" + " 2:q→r premisa     \n" + " 3:q supuesto      \n" + " <<                ", " 1:¬q premisa      \n" + " 2:q→r premisa     \n" + " 3:q supuesto      \n" + " 4:¬r R(1)         \n" + " 5:r E→(1,2)       \n" + " 6:⊥ E¬(5,6)       \n" + " <<                \n" + " 7:(q→r)→q I→(2-3)   ", " 1:¬r premisa      \n" + " 2:q→r premisa     \n" + " 3:q supuesto      \n" + " 4:r E→(2,3)       \n" + " 5:⊥ E¬(1,4)       \n" + " <<                \n" + " 6:¬q I¬(3-6)   ", " 1:¬q premisa      \n" + " 2:q→r premisa     \n" + " 3:q supuesto      \n" + " 4:¬r R(1,2)       \n" + " 5:r E→(1,2)       \n" + " 6:⊥ E¬(5,6)       \n" + " <<                \n" + " 7:(q→r)→q I→(2-3)   ", " 1:r premisa       \n" + " 2:q→r supuesto    \n" + " 3:q→r R(2)        \n" + " <<                \n" + " 4:q supuesto      \n" + " 5:(q→r)→q I→(2-4)   ", " 1:¬(qΛr) premisa  \n" + " 2:(qΛr) premisa   \n" + " 3:⊥ E¬(1,2)       \n" + " 4:m EFSQ(1,2)   ", " 1:¬(qΛr) premisa  \n" + " 2:(qΛs) premisa   \n" + " 3:m EFSQ(1)   ", " 1:¬¬(qΛr) premisa  \n" + " 2:(qΛs) ¬¬(1)      ", " 1:¬(qΛr) premisa  \n" + " 2:(qΛr) ¬¬(1)      ", " 1:qΛq premisa     \n" + " 2:q→r premisa     \n" + " 3:r EV(1,2)         ", " 1:qVr premisa     \n" + " 2:r→s premisa     \n" + " 3:q→s premisa     \n" + " 4:r EV(1,2,3)         ", " 1:qVq premisa     \n" + " 2:q→r premisa     \n" + " 3:r EV(1)         ", " 1:qVr premisa     \n" + " 2:r→s premisa     \n" + " 3:q→s premisa     \n" + " 4:s EV(1,2)         ", " 1:r premisa       \n" + " 2:q→r supuesto    \n" + " 3:q E→(1,2)       \n" + " <<                \n" + " 4:(q→r)→q I→(2-3)   ", " 1:r premisa      \n" + " 2:¬q supuesto    \n" + " 3:⊥ E¬(1,2)      \n" + " <<               \n" + " 4:¬r → ⊥ I→(2-3)    ", " 1:r premisa      \n" + " 2:¬r supuesto    \n" + " 3:⊥ E¬(2)      \n" + " <<               \n" + " 4:¬r → ⊥ I→(2-3)    ", " 1:r premisa      \n" + " 2:¬r supuesto    \n" + " 3:p E¬(1,2)      \n" + " <<               \n" + " 4:r → p I→(2-3)    ", " 1:r premisa      \n" + " 2:¬r  I¬(2-3)      ", " 1:r premisa      \n" + " 2:¬r supuesto    \n" + " 3:⊥ E¬(1,2)      \n" + " <<               \n" + " 4:r I¬(2-3)        ", " 1:r premisa      \n" + " 2:¬r supuesto    \n" + " 3:⊥ E¬(1,2)      \n" + " <<               \n" + " 4:r → ⊥  I→(2-3)   ", " 1:r premisa      \n" + " 2:¬r → ⊥  I→(2-3)  ", " 1:r premisa      \n" + " 2:¬r supuesto    \n" + " 3:⊥ E¬(1,2)      \n" + " <<               \n" + " 4:¬r Λ ⊥  I→(2-3)  ", " 1:q Λ r premisa  \n" + " 2:s Λ r premisa  \n" + " 3:s V q IV(1,2)", " 1:q premisa      \n" + " 2:q IV(1)          ", " 1:q premisa      \n" + " 2:s Λ r premisa  \n" + " 3:q Λ (s Λ r) IΛ(2)", " 1:q premisa      \n" + " 2:s Λ r premisa  \n" + " 3:r Λ (s Λ r) IΛ(2)", " 1:q → ¬s premisa \n" + " 2:s Λ r premisa  \n" + " 3:q IΛ(2)          ", " 1:q → ¬s premisa \n" + " 2:s Λ r premisa  \n" + " 3:q EΛ(2)          ", " 1:q → ¬s premisa \n" + " 2:s Λ r premisa  \n" + " 3:s EΛ(1,2)        ", " 1:q → ¬s premisa \n" + " 2:s Λ r premisa  \n" + " 3:s supuesto     \n" + " 4:r supuesto     \n" + " <<               \n" + " <<                 ", " 1:q → ¬s premisa \n" + " 2:s Λ r premisa  \n" + " <<               \n" + " 3:¬q I¬(3-5)       ", " 1:q → ¬s premisa \n" + " 2:s Λ r premisa  \n" + " 3:s EΛ(2)        \n" + " 4:q supuesto     \n" + " 5:s E→(1,2)      \n" + " 6:⊥ E¬(2,3)      \n" + " <<               \n" + " 7:¬q I¬(3-5)       ", " 1:q → ¬s premisa \n" + " 2:s Λ r premisa  \n" + " 3:s EΛ(2)        \n" + " 4:q supuesto     \n" + " 5:s E→(1,2)      \n" + " 6:⊥ E¬(2,3)      \n" + " <<               \n" + " 7:¬q I¬(3,4)       ", " 1:q → ¬s premisa \n" + " 2:s Λ r premisa  \n" + " 3:s EΛ(4)          ", " 1:q → ¬s premisa \n" + " 2:s Λ r premisa  \n" + " 3:s EΛ(3)          "];

errors_all = [];
