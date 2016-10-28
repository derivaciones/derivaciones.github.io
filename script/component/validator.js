var validator;

validator = {};

(function() {
  var ASSERTION, BINARY, CLOSE_ITERATION_ERROR, CONDITIONAL, CONJUNCTION, CONTRADICTION, DISJUNCTION, ITERATION, NEGATION, REF, assertion, clean, compare, elimination, equals, error, exist, exp_string, extract, get_node, get_refs, interpolates, introduction, match_references, print, processors;
  interpolates = function(errorElement, context) {
    var content, prop, regExp;
    content = errorElement.content;
    for (prop in context) {
      regExp = new RegExp('\\$(\s)*\\{' + prop + '\\}', 'g');
      content = content.replace(regExp, context[prop]);
    }
    return {
      type: errorElement.type,
      content: content
    };
  };
  CLOSE_ITERATION_ERROR = {
    type: 'CLOSE_ITERATION_ERROR'
  };
  error = {
    reference_later: function(ast) {
      ast.error = true;
      return ast.current.children.push(ERROR_ELEMENT.REFERENCIA_A_LINEA_POSTERIOR);
    },
    conjunction_unique_reference: function(ast) {
      ast.error = true;
      return ast.current.children.push(ERROR_ELEMENT.REFERENCIA_MULTIPLE_ELIMINACION_CONJUNCION);
    },
    conjunction_elimination: function(ast, expression) {
      var context, error_node;
      ast.error = true;
      context = {
        expression: print(expression)
      };
      error_node = interpolates(ERROR_ELEMENT.ELIMINACION_CONJUNCION_REFERENCIA_INVALIDA, context);
      return ast.current.children.push(error_node);
    },
    conjunction_connector: function(ast) {
      ast.error = true;
      return ast.current.children.push(ERROR_ELEMENT.INTRODUCCION_CONJUNCION_CONECTOR_INCORRECTO);
    },
    invalid_iteration_reference: function(ast, first, last) {
      var context, error_node;
      ast.error = true;
      context = {
        firstReferenceIndex: first,
        lastReferenceIndex: last
      };
      error_node = interpolates(ERROR_ELEMENT.ITERACION_REFERENCIA_INVALIDA, context);
      return ast.current.children.push(error_node);
    },
    conjunction_introduction_references: function(ast, left, right) {
      var context, error_node;
      ast.error = true;
      context = {
        leftExpression: print(left),
        rightExpression: print(right)
      };
      error_node = interpolates(ERROR_ELEMENT.INTRODUCCION_CONJUNCION_REFERENCIA_INVALIDA, context);
      return ast.current.children.push(error_node);
    },
    disjunction_connector: function(ast) {
      ast.error = true;
      return ast.current.children.push(ERROR_ELEMENT.INTRODUCCION_DISYUNCION_CONECTOR_INCORRECTO);
    },
    disjunction_introduction: function(ast, left, right) {
      var context, error_node;
      ast.error = true;
      context = {
        leftExpression: print(left),
        rightExpression: print(right)
      };
      error_node = interpolates(ERROR_ELEMENT.INTRODUCCION_DISYUNCION_REFERENCIA_INVALIDA, context);
      return ast.current.children.push(error_node);
    },
    conditional_connector: function(ast) {
      ast.error = true;
      return ast.current.children.push(ERROR_ELEMENT.INTRODUCCION_CONDICIONAL_CONECTOR_INCORRECTO);
    },
    conditional_iteration_lack: function(ast) {
      ast.error = true;
      return ast.current.children.push(ERROR_ELEMENT.INTRODUCCION_CONDICIONAL_FALTA_ITERACION);
    },
    conditional_introduction: function(ast, left, right) {
      var context, error_node;
      ast.error = true;
      context = {
        leftExpression: print(left),
        rightExpression: print(right)
      };
      error_node = interpolates(ERROR_ELEMENT.INTRODUCCION_CONDICIONAL_ITERACION_INVALIDA, context);
      return ast.current.children.push(error_node);
    },
    negation_type: function(ast) {
      ast.error = true;
      return ast.current.children.push(ERROR_ELEMENT.INTRODUCCION_NEGACION_FALTA_NAGACION);
    },
    negation_iteration_lack: function(ast) {
      ast.error = true;
      return ast.current.children.push(ERROR_ELEMENT.INTRODUCCION_NEGACION_FALTA_ITERACION);
    },
    negation_introduction: function(ast, expression) {
      var context, error_node;
      ast.error = true;
      context = {
        expresionNegada: print(expression)
      };
      error_node = interpolates(ERROR_ELEMENT.INTRODUCCION_NEGACION_ITERACION_INVALIDA, context);
      return ast.current.children.push(error_node);
    },
    negation_isnt_contradiction: function(ast) {
      ast.error = true;
      return ast.current.children.push(ERROR_ELEMENT.ELIMINACION_NEGACION_NO_CONTRADICCION);
    },
    negation_elimination_references: function(ast) {
      ast.error = true;
      return ast.current.children.push(ERROR_ELEMENT.ELIMINACION_NEGACION_REFERENCIAS_INVALIDAS);
    },
    conditional_elimination_references: function(ast) {
      ast.error = true;
      return ast.current.children.push(ERROR_ELEMENT.ELIMINACION_CONDICIONAL_REFERENCIAS_INVALIDAS);
    },
    disjunction_elimination_references: function(ast) {
      ast.error = true;
      return ast.current.children.push(ERROR_ELEMENT.ELIMINACION_DISYUNCION_REFERENCIAS_INVALIDAS);
    },
    double_negation_unique_reference: function(ast) {
      ast.error = true;
      return ast.current.children.push(ERROR_ELEMENT.DOBLE_NEGACION_REFERENCIAS_MULTIPLES);
    },
    double_negation_references_type: function(ast) {
      ast.error = true;
      return ast.current.children.push(ERROR_ELEMENT.DOBLE_NEGACION_TIPO_REFERENCIAS_INVALIDAS);
    },
    double_negation_equal: function(ast, first_ref, second_nested) {
      var context, error_node;
      ast.error = true;
      context = {
        dobleNegacionReferida: print(first_ref),
        referenciaDespejado: print(second_nested)
      };
      error_node = interpolates(ERROR_ELEMENT.DOBLE_NEGACION_RESULTADO_INVALIDO, context);
      return ast.current.children.push(error_node);
    },
    repeat_unique_reference: function(ast) {
      ast.error = true;
      return ast.current.children.push(ERROR_ELEMENT.REPETICION_REFERENCIAS_MULTIPLES);
    },
    repeat_reference: function(ast) {
      ast.error = true;
      return ast.current.children.push(ERROR_ELEMENT.REPETICION_REFERENCIAS_INVALIDAS);
    },
    efsq_unique_reference: function(ast) {
      ast.error = true;
      return ast.current.children.push(ERROR_ELEMENT.EFSQ_REFERENCIAS_MULTIPLES);
    },
    efsq_reference: function(ast) {
      ast.error = true;
      return ast.current.children.push(ERROR_ELEMENT.EFSQ_REFERENCIAS_INVALIDAS);
    },
    unexpected_close_iteration: function(ast) {
      ast.error = true;
      ast.current.children.push(CLOSE_ITERATION_ERROR);
      return ast.current.children.push(ERROR_ELEMENT.CIERRE_ITERACION_SIN_SUPUESTO);
    },
    unexpected_after_iteration: function(ast, parsed) {
      ast.error = true;
      ast.current.children.push(parsed);
      return ast.current.children.push(ERROR_ELEMENT.FORMULA_INVALIDA_LUEGO_DE_ITERACION);
    }
  };
  BINARY = 'BINARY';
  ASSERTION = 'ASSERTION';
  ITERATION = 'ITERATION';
  DISJUNCTION = 'DISJUNCTION';
  CONJUNCTION = 'CONJUNCTION';
  CONDITIONAL = 'CONDITIONAL';
  NEGATION = 'NEGATION';
  CONTRADICTION = 'CONTRADICTION';
  REF = {
    RANGE: 'RANGE',
    ARRAY: 'ARRAY'
  };
  get_node = function(parent, index) {
    var candidate, node, _i, _len, _ref;
    _ref = parent.children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      if (node.type === ITERATION) {
        candidate = get_node(node, index);
        if (candidate) {
          return candidate;
        }
      } else if (node.index === index) {
        return node;
      }
    }
  };
  exist = function(elem, previous) {
    var parsed, _i, _len;
    for (_i = 0, _len = previous.length; _i < _len; _i++) {
      parsed = previous[_i];
      if (equals(elem, parsed.expression)) {
        return true;
      }
    }
    return false;
  };
  get_refs = {
    RANGE: function(ast, references, max) {
      var index, result, _i, _ref, _ref1;
      if (max <= references.first || max <= references.last) {
        return error.reference_later(ast);
      }
      result = [];
      for (index = _i = _ref = references.first, _ref1 = references.last; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; index = _ref <= _ref1 ? ++_i : --_i) {
        result.push(get_node(ast.root, index));
      }
      return result;
    },
    ARRAY: function(ast, references, max) {
      var index, result, _i, _len, _ref;
      result = [];
      _ref = references.indices;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        index = _ref[_i];
        if (max <= index) {
          return error.reference_later(ast);
        }
        result.push(get_node(ast.root, index));
      }
      return result;
    }
  };
  match_references = function(first, last, ref) {
    var expected, _i;
    if (ref.type === REF.RANGE) {
      return first === ref.first && last === ref.last || first === ref.last && last === ref.first;
    } else {
      if (ref.indices.length !== (last - first + 1)) {
        return false;
      }
      for (expected = _i = first; first <= last ? _i <= last : _i >= last; expected = first <= last ? ++_i : --_i) {
        if (ref.indices.indexOf(expected) === -1) {
          return false;
        }
      }
      return true;
    }
  };
  exp_string = {
    BINARY: function(expression) {
      return print(expression.left) + ' ' + expression.connector.content + ' ' + print(expression.right);
    },
    ELEMENT: function(expression) {
      return expression.identifier;
    },
    NEGATION: function(expression) {
      return expression.content + print(expression.expression);
    },
    CLOSE_EXP: function(expression) {
      return '(' + print(expression.expression) + ')';
    },
    CONTRADICTION: function(expression) {
      return expression.content;
    }
  };
  print = function(expression) {
    return exp_string[expression.type](expression);
  };
  extract = function(expression) {
    if (expression.type === 'CLOSE_EXP') {
      return extract(expression.expression);
    } else {
      return expression;
    }
  };
  equals = function(first, second) {
    var clean_first, clean_second;
    clean_first = extract(first);
    clean_second = extract(second);
    return clean_first.type === clean_second.type && compare[clean_first.type](clean_first, clean_second);
  };
  compare = {
    BINARY: function(first, second) {
      return first.connector.type === second.connector.type && compare[first.connector.type](first, second);
    },
    CONJUNCTION: function(first, second) {
      return equals(first.left, second.left) && equals(first.right, second.right) || equals(first.right, second.left) && equals(first.left, second.right);
    },
    DISJUNCTION: function(first, second) {
      return equals(first.left, second.left) && equals(first.right, second.right) || equals(first.right, second.left) && equals(first.left, second.right);
    },
    CONDITIONAL: function(first, second) {
      return equals(first.left, second.left) && equals(first.right, second.right);
    },
    BICONDITIONAL: function(first, second) {
      return equals(first.left, second.left) && equals(first.right, second.right);
    },
    NEGATION: function(first, second) {
      return equals(first.expression, second.expression);
    },
    ELEMENT: function(first, second) {
      return first.identifier === second.identifier;
    },
    CONTRADICTION: function(first, second) {
      return true;
    }
  };
  elimination = {
    CONJUNCTION: function(ast, parsed) {
      var expression, previous, references, unique_exp, unique_ref;
      expression = extract(parsed.expression);
      references = parsed.rule.references;
      previous = get_refs[references.type](ast, references, parsed.index);
      if (ast.error) {
        return;
      }
      if (previous.length !== 1) {
        return error.conjunction_unique_reference(ast);
      }
      unique_ref = previous[0];
      unique_exp = unique_ref.expression;
      if (!unique_exp.connector || unique_exp.connector.type !== CONJUNCTION || !(equals(expression, unique_exp.left) || equals(expression, unique_exp.right))) {
        return error.conjunction_elimination(ast, expression);
      }
      return parsed.ok = true;
    },
    DISJUNCTION: function(ast, parsed) {
      var classified, classify, conditionals, dynamic_match_antedecent, expression, first_cond, match_antedecent, previous, references, second_cond, v_left, v_right;
      classify = function(elements, ast) {
        var classified, element, expression, _i, _len;
        classified = {
          conditionals: []
        };
        for (_i = 0, _len = elements.length; _i < _len; _i++) {
          element = elements[_i];
          expression = extract(element.expression);
          if (expression.type === BINARY) {
            if (expression.connector.type === DISJUNCTION) {
              if (!classified.disjunction) {
                classified.disjunction = expression;
                continue;
              }
            }
            if (expression.connector.type === CONDITIONAL) {
              classified.conditionals.push(expression);
              continue;
            }
          }
          return error.disjunction_elimination_references(ast);
        }
        return classified;
      };
      expression = extract(parsed.expression);
      references = parsed.rule.references;
      previous = get_refs[references.type](ast, references, parsed.index);
      if (ast.error) {
        return;
      }
      classified = classify(previous, ast);
      if (ast.error) {
        return;
      }
      if (!classified.disjunction) {
        return error.disjunction_elimination_references(ast);
      }
      conditionals = classified.conditionals;
      if (conditionals.length < 1 || conditionals.length > 2) {
        return error.disjunction_elimination_references(ast);
      }
      first_cond = conditionals[0];
      v_left = classified.disjunction.left;
      v_right = classified.disjunction.right;
      match_antedecent = function(left, right, first, second) {
        return equals(left, first.left) && equals(right, second.left);
      };
      if (conditionals.length === 1) {
        if (match_antedecent(v_left, v_right, first_cond, first_cond) && equals(expression, first_cond.right)) {
          return parsed.ok = true;
        } else {
          return error.disjunction_elimination_references(ast);
        }
      } else {
        second_cond = conditionals[1];
        dynamic_match_antedecent = function(left, right, first, second) {
          return match_antedecent(left, right, first, second) || match_antedecent(left, right, second, first);
        };
        if (dynamic_match_antedecent(v_left, v_right, first_cond, second_cond) && equals(first_cond.right, expression) && equals(second_cond.right, expression)) {
          return parsed.ok = true;
        } else {
          return error.disjunction_elimination_references(ast);
        }
      }
    },
    CONDITIONAL: function(ast, parsed) {
      var expression, first, previous, references, second;
      expression = extract(parsed.expression);
      references = parsed.rule.references;
      previous = get_refs[references.type](ast, references, parsed.index);
      if (ast.error) {
        return;
      }
      if (previous.length !== 2) {
        return error.conditional_elimination_references(ast);
      }
      first = previous[0].expression;
      second = previous[1].expression;
      if ((first.type === BINARY && first.connector.type === CONDITIONAL && equals(first.left, second) && equals(first.right, expression)) || (second.type === BINARY && second.connector.type === CONDITIONAL && equals(second.left, first) && equals(second.right, expression))) {
        return parsed.ok = true;
      } else {
        return error.conditional_elimination_references(ast);
      }
    },
    NEGATION: function(ast, parsed) {
      var expression, first, previous, references, second;
      expression = extract(parsed.expression);
      if (expression.type !== CONTRADICTION) {
        return error.negation_isnt_contradiction(ast);
      }
      references = parsed.rule.references;
      previous = get_refs[references.type](ast, references, parsed.index);
      if (ast.error) {
        return;
      }
      if (previous.length !== 2) {
        return error.negation_elimination_references(ast);
      }
      first = previous[0].expression;
      second = previous[1].expression;
      if ((first.type === NEGATION && equals(first.expression, second)) || (second.type === NEGATION && equals(second.expression, first))) {
        return parsed.ok = true;
      } else {
        return error.negation_elimination_references(ast);
      }
    }
  };
  introduction = {
    CONJUNCTION: function(ast, parsed) {
      var expression, previous, references;
      expression = extract(parsed.expression);
      if (!expression.connector || expression.connector.type !== CONJUNCTION) {
        return error.conjunction_connector(ast);
      }
      references = parsed.rule.references;
      previous = get_refs[references.type](ast, references, parsed.index);
      if (ast.error) {
        return;
      }
      if (exist(expression.left, previous) && exist(expression.right, previous)) {
        return parsed.ok = true;
      } else {
        return error.conjunction_introduction_references(ast, expression.left, expression.right);
      }
    },
    DISJUNCTION: function(ast, parsed) {
      var expression, previous, references;
      expression = extract(parsed.expression);
      if (!expression.connector || expression.connector.type !== DISJUNCTION) {
        return error.disjunction_connector(ast);
      }
      references = parsed.rule.references;
      previous = get_refs[references.type](ast, references, parsed.index);
      if (ast.error) {
        return;
      }
      if (exist(expression.left, previous) || exist(expression.right, previous)) {
        return parsed.ok = true;
      } else {
        return error.disjunction_introduction(ast, expression.left, expression.right);
      }
    },
    CONDITIONAL: function(ast, parsed) {
      var expression, first, first_exp, last, last_exp, previous;
      expression = extract(parsed.expression);
      if (!expression.connector || expression.connector.type !== CONDITIONAL) {
        return error.conditional_connector(ast);
      }
      if (!parsed.iteration) {
        return error.conditional_iteration_lack(ast);
      }
      previous = parsed.iteration.children;
      first = previous[0];
      last = previous[previous.length - 1];
      if (!match_references(first.index, last.index, parsed.rule.references)) {
        return error.invalid_iteration_reference(ast, first.index, last.index);
      }
      first_exp = first.expression;
      last_exp = last.expression;
      if (!equals(first_exp, expression.left) || !equals(last_exp, expression.right)) {
        return error.conditional_introduction(ast, expression.left, expression.right);
      }
      return parsed.ok = true;
    },
    NEGATION: function(ast, parsed) {
      var expression, first, first_exp, last, last_exp, previous;
      expression = extract(parsed.expression);
      if (expression.type !== NEGATION) {
        return error.negation_type(ast);
      }
      if (!parsed.iteration) {
        return error.negation_iteration_lack(ast);
      }
      previous = parsed.iteration.children;
      first = previous[0];
      last = previous[previous.length - 1];
      if (!match_references(first.index, last.index, parsed.rule.references)) {
        return error.invalid_iteration_reference(ast, first.index, last.index);
      }
      first_exp = first.expression;
      last_exp = last.expression;
      if (!equals(first_exp, expression.expression) || last_exp.type !== CONTRADICTION) {
        return error.negation_introduction(ast, expression.expression);
      }
      return parsed.ok = true;
    }
  };
  assertion = {
    DOUBLE_NOT: function(ast, parsed) {
      var expression, first_nested, previous, references, second_nested, unique_ref;
      expression = extract(parsed.expression);
      references = parsed.rule.references;
      previous = get_refs[references.type](ast, references, parsed.index);
      if (ast.error) {
        return;
      }
      if (previous.length !== 1) {
        return error.double_negation_unique_reference(ast);
      }
      unique_ref = extract(previous[0].expression);
      if (unique_ref.type !== NEGATION) {
        return error.double_negation_references_type(ast);
      }
      first_nested = extract(unique_ref.expression);
      if (first_nested.type !== NEGATION) {
        return error.double_negation_references_type(ast);
      }
      second_nested = extract(first_nested.expression);
      if (!equals(second_nested, expression)) {
        return error.double_negation_equal(ast, unique_ref, second_nested);
      }
      return parsed.ok = true;
    },
    EFSQ: function(ast, parsed) {
      var expression, previous, references, unique_ref;
      expression = extract(parsed.expression);
      references = parsed.rule.references;
      previous = get_refs[references.type](ast, references, parsed.index);
      if (ast.error) {
        return;
      }
      if (previous.length !== 1) {
        return error.efsq_unique_reference(ast);
      }
      unique_ref = extract(previous[0].expression);
      if (unique_ref.type !== CONTRADICTION) {
        return error.efsq_reference(ast);
      }
      return parsed.ok = true;
    },
    REPEAT: function(ast, parsed) {
      var expression, previous, references, unique_ref;
      expression = extract(parsed.expression);
      references = parsed.rule.references;
      previous = get_refs[references.type](ast, references, parsed.index);
      if (ast.error) {
        return;
      }
      if (previous.length !== 1) {
        return error.repeat_unique_reference(ast);
      }
      unique_ref = extract(previous[0].expression);
      if (!equals(unique_ref, expression)) {
        return error.repeat_reference(ast);
      }
      return parsed.ok = true;
    },
    E: function(ast, parsed) {
      return elimination[parsed.rule.connector.type](ast, parsed);
    },
    I: function(ast, parsed) {
      return introduction[parsed.rule.connector.type](ast, parsed);
    }
  };
  processors = {
    PREMISE: {
      process: function(ast, parsed) {
        ast.current.children.push(parsed);
        parsed.ok = true;
        return ast.indices.push({
          index: parsed.index,
          klass: 'premise'
        });
      }
    },
    ASSERTION: {
      process: function(ast, parsed) {
        ast.current.children.push(parsed);
        assertion[parsed.rule.action](ast, parsed);
        return ast.indices.push({
          index: parsed.index,
          klass: parsed.iteration ? 'supposed-end' : 'assertion'
        });
      }
    },
    SUPPOSED: {
      process: function(ast, parsed) {
        var node;
        node = {
          type: ITERATION,
          children: [],
          parent: ast.current
        };
        ast.current.children.push(node);
        ast.current = node;
        parsed.ok = true;
        node.children.push(parsed);
        return ast.indices.push({
          index: parsed.index,
          klass: 'supposed'
        });
      }
    },
    SUPPOSED_END: {
      process: function(ast, parsed) {
        if (ast.current.type !== ITERATION) {
          return error.unexpected_close_iteration(ast);
        }
        parsed.iteration = ast.current;
        ast.current = ast.current.parent;
        ast.supposed_end = false;
        if (parsed.type !== ASSERTION) {
          return error.unexpected_after_iteration(ast, parsed);
        }
        return processors.ASSERTION.process(ast, parsed);
      }
    }
  };
  clean = function(ast) {
    if (!(ast.current === ast.root || ast.error)) {
      ast.error = true;
      ast.current.children.push(ERROR_ELEMENT.FINALIZACION_DENTRO_DE_ITERACION);
    }
    ast.length = ast.index - 1;
    delete ast.current;
    delete ast.supposed_end;
    delete ast.index;
    return ast;
  };
  return validator.validate = function(raw, parser) {
    var ast, context, err, error_node, line, lines, parent, parsed, _i, _len;
    lines = raw.split('\n');
    ast = {
      root: {
        type: 'ROOT',
        children: []
      },
      index: 1,
      indices: []
    };
    ast.current = ast.root;
    for (_i = 0, _len = lines.length; _i < _len; _i++) {
      line = lines[_i];
      if (/^(\s)*$/.test(line)) {
        continue;
      }
      if (/^(\s)*\*\*/.test(line)) {
        continue;
      }
      if (/^((\s)*\|)*((\s)*\-)*((\s)*\|)*(\s)*$/.test(line)) {
        continue;
      }
      try {
        parsed = parser.parse(line);
      } catch (_error) {
        err = _error;
        ast.error = true;
        context = {
          rawLine: line.trim(),
          parseError: err.message
        };
        error_node = interpolates(ERROR_ELEMENT.NO_SE_PUEDE_PARSEAR_LA_LINEA, context);
        ast.current.children.push(error_node);
        return clean(ast);
      }
      if (parsed.type === 'SUPPOSED_END') {
        if (ast.supposed_end) {
          ast.error = true;
          parent = ast.current.parent || ast.current;
          parent.children.push(CLOSE_ITERATION_ERROR);
          parent.children.push(ERROR_ELEMENT.CIERRES_DE_ITERACION_CONSECUTIVOS);
          return clean(ast);
        } else {
          ast.supposed_end = true;
        }
      } else {
        if (ast.index !== parsed.index) {
          ast.error = true;
          context = {
            rawLine: line.trim(),
            expectedLineIndex: ast.index
          };
          error_node = interpolates(ERROR_ELEMENT.LINEA_NO_ESPERADA, context);
          ast.current.children.push(error_node);
          return clean(ast);
        }
        if (ast.supposed_end) {
          processors.SUPPOSED_END.process(ast, parsed);
        } else {
          processors[parsed.type].process(ast, parsed);
        }
        ast.index += 1;
        if (ast.error) {
          return clean(ast);
        }
      }
    }
    if (ast.supposed_end) {
      ast.error = true;
      ast.root.children.push(CLOSE_ITERATION_ERROR);
      ast.root.children.push(ERROR_ELEMENT.FINALIZACION_EN_CIERRE_DE_ITERACION);
    }
    return clean(ast);
  };
})();
