var validate;

window.addLoadListener(function() {
  var ast, codeElem, container, example, i, index, len, parser, rawContent, results, validateElem;
  validateElem = document.querySelector('#validate');
  parser = new derivaciones.Parser;
  results = [];
  for (index = i = 0, len = validate.length; i < len; index = ++i) {
    example = validate[index];
    ast = validator.validate(example, parser);
    if (ast) {
      viewer.process(ast);
      ast.root.view.title = example;
      container = document.createElement('div');
      container.classList.add('validate-container');
      codeElem = document.createElement('pre');
      container.appendChild(codeElem);
      container.appendChild(ast.root.view);
      rawContent = document.createTextNode(example);
      codeElem.appendChild(rawContent);
      results.push(validateElem.appendChild(container));
    } else {
      results.push(validateElem.appendChild(document.createTextNode('error al procesar')));
    }
  }
  return results;
});

validate = [" 1:¬r premisa      \n" + " 2:q premisa       \n" + " 3:q→r supuesto    \n" + " 4:¬r R(1)         \n" + " 5:r E→(2,3)       \n" + " 6:⊥ E¬(4,5)       \n" + " <<                \n" + " 7:¬(q→r) I¬(3-6)   ", " 1. (p v t) → ¬¬r premisa      \n" + " 2. ¬(p → r) premisa           \n" + "    -------------------        \n" + " 3.| (q → p) supuesto  |       \n" + "   | ----------------  |       \n" + " 4.|| p supuesto     | |       \n" + " 5.|| (p v t) Iv(4)  | |       \n" + " 6.|| ¬¬r E→(1,5)    | |       \n" + " 7.|| r ¬¬(6)        | |       \n" + "   | ----------------  |       \n" + " <<                            \n" + " 8.| (p → r) I→(4-7)   |       \n" + " 9.| ⊥ E¬(2,8)         |       \n" + "    -------------------        \n" + " <<                            \n" + "10. ¬(q → p) I¬(3-9)             ", " 1. p → q premisa        \n" + " 2. p ∨ r premisa        \n" + " --------------          \n" + " 3.| p supuesto   |      \n" + " 4.| q E →(1,3)   |      \n" + " 5.| q v r Iv(4)  |      \n" + "    --------------       \n" + "   <<                    \n" + " 6. p → (q v r) I→(3-5)  \n" + "    --------------       \n" + " 7.| r supuesto   |      \n" + " 8.| q v r Iv(7)  |      \n" + "    --------------       \n" + "   <<                    \n" + " 9. r → (q v r) I→(7-8)  \n" + "10. q v r Ev(2, 6, 9)    ", " 1. (p ∧ q ) → r premisa     \n" + "    -------------------      \n" + " 2.| p supuesto        |     \n" + "   | ----------------  |     \n" + " 3.|| q supuesto     | |     \n" + " 4.|| p ∧ q I∧(2,3)  | |     \n" + " 5.|| r E→(1,4)      | |     \n" + "   | ----------------  |     \n" + "   | <<                |     \n" + " 6.| (q → r) I→(3-5)   |     \n" + "    <<                       \n" + "    -------------------      \n" + " 7. p → (q → r) I → (2-6)    ", " 1. q → r premisa        \n" + " 2. (t V u) → q premisa  \n" + " 3. ¬s → ¬¬q premisa     \n" + " 4. (¬s V t) supuesto    \n" + " 5. ¬s supuesto          \n" + " 6. ¬¬q E→(3,5)          \n" + " 7. q ¬¬(6)              \n" + "<<                       \n" + " 8. ¬s → q I→(5-7)       \n" + " 9. t supuesto           \n" + "10. (t V u) IV(9)        \n" + "11. q E→(2,10)           \n" + "<<                       \n" + "12. t → q I→(9-11)       \n" + "13. q EV(4,8,12)         \n" + "14. r E→(1,13)           \n" + "<<                       \n" + "15. (t V ¬s) → r I→(4-14)  ", " 1. ¬q → r premisa \n" + " 2: ¬r  premisa    \n" + " 3. ¬q supuesto    \n" + " 4. r E→(1,3)      \n" + " 5. ⊥ E¬(2,4)         \n" + " <<                \n" + " 6. ¬¬q I¬(3-5)      ", " 1:rVq premisa     \n" + " 2:r→s premisa     \n" + " 3:q→s premisa     \n" + " 4:s EV(1,2,3)         ", " 1:r premisa       \n" + " 2:r→q supuesto    \n" + " 3:q E→(1,2)       \n" + " <<                \n" + " 4:(r→q)→q I→(2-3)   ", " 1:r premisa      \n" + " 2:¬r supuesto    \n" + " 3:⊥ E¬(1,2)      \n" + " <<               \n" + " 4:¬r → ⊥ I→(2-3)   ", " 1:q premisa      \n" + " 2:r premisa      \n" + " 3:q Λ r IΛ(1,2)", " 1:q premisa      \n" + " 2:q V q IV(1)", " 1:q premisa      \n" + " 2:q V r IV(1)", " 1:q premisa      \n" + " 2:r V q IV(1)"];
