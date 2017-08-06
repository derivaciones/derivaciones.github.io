var inputChange, inputMode, load, process, save, writeInput;

load = function() {
  return '';
};

save = function() {};

inputChange = function() {};

process = function() {};

writeInput = function() {};

inputMode = function() {};

window.onload = function() {
  var MODE, actions, ast, firstTime, handleKey, input, mousedownHandler, output, previousActiveElement, processHandler, storageKey, swapMode, visitKey;
  input = document.querySelector('#input');
  process = document.querySelector('#process');
  output = document.querySelector('#output');
  writeInput = function(text) {
    var endPos, sel, startPos;
    text = text || '';
    if (document.selection) {
      input.focus();
      sel = document.selection.createRange();
      sel.text = text;
    } else if (input.selectionStart || input.selectionStart === '0') {
      startPos = input.selectionStart;
      endPos = input.selectionEnd;
      input.value = input.value.substring(0, startPos) + text + input.value.substring(endPos, input.value.length);
      input.selectionEnd = endPos + text.length;
    } else {
      input.value += text;
    }
    inputChange();
    return input.focus();
  };
  MODE = {
    INPUT: 'input-mode',
    OUTPUT: 'output-mode'
  };
  MODE.CURRENT = MODE.INPUT;
  ast = null;
  swapMode = function(state) {
    document.body.classList.remove(MODE.CURRENT);
    MODE.CURRENT = state;
    return document.body.classList.add(MODE.CURRENT);
  };
  firstTime = function() {
    return window.location = 'first.html';
  };
  if (typeof window.localStorage !== 'undefined') {
    storageKey = 'derivation.code';
    save = function(code) {
      return localStorage.setItem(storageKey, code);
    };
    load = function(code) {
      return localStorage.getItem(storageKey);
    };
    inputChange = function() {
      return save(input.value);
    };
    visitKey = 'derivation.visit';
    if (!localStorage.getItem(visitKey)) {
      localStorage.setItem(visitKey, true);
      firstTime();
    }
  } else {
    firstTime();
  }
  input.value = load();
  previousActiveElement = null;
  mousedownHandler = function(evn) {
    return previousActiveElement = document.activeElement;
  };
  process.addEventListener('mousedown', mousedownHandler, false);
  processHandler = function(evn) {
    var parser;
    while (output.firstChild) {
      output.removeChild(output.firstChild);
    }
    parser = new derivaciones.Parser;
    ast = validator.validate(input.value, parser);
    if (ast) {
      viewer.process(ast);
      output.appendChild(ast.root.view);
    }
    previousActiveElement.focus();
    evn.preventDefault();
    return swapMode(MODE.OUTPUT);
  };
  process.addEventListener('click', processHandler, false);
  window.inputMode = function() {
    return swapMode(MODE.INPUT);
  };
  window.outputMode = function() {
    return swapMode(MODE.OUTPUT);
  };
  actions = [
    {
      keyCode: 69,
      char: '→'
    }, {
      keyCode: 82,
      char: '⊥'
    }, {
      keyCode: 68,
      char: 'V'
    }, {
      keyCode: 70,
      char: 'Λ'
    }
  ];
  handleKey = function(evnt) {
    var action, i, keyCode, len;
    if (!evnt.ctrlKey) {
      return true;
    }
    keyCode = evnt.keyCode;
    for (i = 0, len = actions.length; i < len; i++) {
      action = actions[i];
      if (action.keyCode === keyCode) {
        writeInput(action.char);
        evnt.preventDefault();
        evnt.stopPropagation();
        return true;
      }
    }
  };
  return input.addEventListener('keydown', handleKey, false);
};
