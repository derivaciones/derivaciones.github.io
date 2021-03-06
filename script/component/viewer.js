var viewer;

viewer = {};

(function() {
  var add_classes, contains, experimental, experimental_message, mk, mk_div, mk_expression, mk_img, mk_ndex, mk_paragraph, mk_pre, mk_ref, mk_rule, mk_single, mk_span, process_children, process_errors, process_expression;
  add_classes = function(element, classes) {
    var i, klass, len;
    if (classes == null) {
      classes = [];
    }
    for (i = 0, len = classes.length; i < len; i++) {
      klass = classes[i];
      element.classList.add(klass);
    }
    return element;
  };
  mk_span = function(text, classes) {
    var view;
    view = document.createElement('span');
    text = document.createTextNode(text);
    view.appendChild(text);
    return add_classes(view, classes);
  };
  mk_paragraph = function(text, classes) {
    var view;
    view = document.createElement('p');
    text = document.createTextNode(text);
    view.appendChild(text);
    return add_classes(view, classes);
  };
  mk_div = function(classes) {
    return add_classes(document.createElement('div'), classes);
  };
  mk_img = function(classes, src) {
    var image;
    image = add_classes(document.createElement('IMG'), classes);
    image.src = src;
    return image;
  };
  mk_pre = function(classes) {
    return add_classes(document.createElement('pre'), classes);
  };
  mk_single = function(text, level, classes) {
    var single;
    single = mk_div(classes);
    single.appendChild(mk_span(mkindent(level) + text));
    return single;
  };
  process_errors = function(node, error) {
    if (!node.ok) {
      if (error) {
        return node.view.appendChild(mk_img(['state-error'], 'asset/error.png'));
      } else {
        return node.view.appendChild(mk_img(['state-not-ok'], 'asset/warning.png'));
      }
    }
  };
  mk_expression = {
    BINARY: function(expression) {
      var root;
      root = mk_div(['binary']);
      root.appendChild(process_expression(expression.left));
      root.appendChild(mk_span(expression.connector.content, ['connector']));
      root.appendChild(process_expression(expression.right));
      return root;
    },
    APPLICATION: function(expression) {
      var element, i, len, ref, root;
      root = mk_div(['application']);
      root.appendChild(mk_span(expression.identifier, ['identifier']));
      ref = expression.elements;
      for (i = 0, len = ref.length; i < len; i++) {
        element = ref[i];
        root.appendChild(mk_span(element.identifier, ['element']));
      }
      return root;
    },
    FORALL: function(expression) {
      var root;
      root = mk_div(['forall']);
      root.appendChild(mk_span('∀', ['identifier']));
      root.appendChild(mk_span(expression.element.identifier, ['element']));
      root.appendChild(process_expression(expression.expression));
      return root;
    },
    EXIST: function(expression) {
      var root;
      root = mk_div(['exist']);
      root.appendChild(mk_span('∃', ['identifier']));
      root.appendChild(mk_span(expression.element.identifier, ['element']));
      root.appendChild(process_expression(expression.expression));
      return root;
    },
    ELEMENT: function(expression) {
      return mk_span(expression.identifier, ['element']);
    },
    NEGATION: function(expression) {
      var root;
      root = mk_div(['negation']);
      root.appendChild(mk_span(expression.content, ['negation-content']));
      root.appendChild(process_expression(expression.expression));
      return root;
    },
    CLOSE_EXP: function(expression) {
      var root;
      root = mk_div(['close-exp']);
      root.appendChild(mk_span('(', ['parenthesis', 'start']));
      root.appendChild(process_expression(expression.expression));
      root.appendChild(mk_span(')', ['parenthesis', 'end']));
      return root;
    },
    CONTRADICTION: function(expression) {
      return mk_span(expression.content, ['contradiction']);
    }
  };
  mk_ndex = function(node, level) {
    var container, fixer, i, index, ref;
    container = mk_div(['index-left']);
    container.appendChild(mk_span(node.index, ['index-left-text']));
    for (index = i = 0, ref = level; 0 <= ref ? i <= ref : i >= ref; index = 0 <= ref ? ++i : --i) {
      fixer = mk_div(['index-left-level']);
      fixer.appendChild(container);
      container = fixer;
    }
    return node.view.appendChild(container);
  };
  experimental_message = 'Esta caracteristica es experimental' + ' y aún no se pueden realizar validaciones sobre la misma';
  contains = function(item, list) {
    return list.indexOf(item) !== -1;
  };
  experimental = function(node) {
    var container, icon;
    if (contains(node.expression.type, ['FORALL', 'EXIST', 'APPLICATION'])) {
      container = mk_span('', ['experimental']);
      icon = mk_span('', ['experimental-icon']);
      icon.appendChild(mk_span('', ['fa', 'fa-exclamation-triangle']));
      container.appendChild(icon);
      container.appendChild(mk_span(experimental_message, []));
      return node.view.appendChild(container);
    }
  };
  mk = {
    COMMENT: function(node, error, level) {
      node.view = mk_div(['comment']);
      node.view.appendChild(mk_span(node.content, ['comment-text']));
      return node;
    },
    CLOSE_ITERATION_ERROR: function(node, error, level) {
      node.view = mk_div(['iteration-close']);
      node.view.appendChild(mk_span('<<', ['iteration-close-text']));
      return process_errors(node, true);
    },
    PREMISE: function(node, error, level) {
      node.view = mk_div(['premise']);
      node.view.appendChild(process_expression(node.expression));
      node.view.appendChild(mk_span('premisa', ['premise-text']));
      experimental(node);
      mk_ndex(node, level);
      return process_errors(node, error);
    },
    SUPPOSED: function(node, error, level) {
      node.view = mk_div(['supposed']);
      node.view.appendChild(process_expression(node.expression));
      node.view.appendChild(mk_span('supuesto', ['supposed-text']));
      mk_ndex(node, level);
      experimental(node);
      return process_errors(node, error);
    },
    ASSERTION: function(node, error, level) {
      node.view = mk_div(['assertion']);
      node.view.appendChild(process_expression(node.expression));
      mk_rule(node.rule);
      node.view.appendChild(node.rule.view);
      mk_ndex(node, level);
      experimental(node);
      return process_errors(node, error);
    },
    ITERATION: function(node, error, level) {
      node.view = mk_div(['iteration']);
      return process_children(node, error, level + 1);
    },
    ERROR: function(node, error, level) {
      var container, error_view, i, len, ref, results;
      if (node.name === 'FINALIZACION_DENTRO_DE_ITERACION') {
        node.view = mk_div(['error-wrapper']);
        node.view.appendChild(mk_img(['state-error-left'], 'asset/error.png'));
        container = mk_div(['errors']);
        node.view.appendChild(container);
      } else {
        node.view = mk_div(['errors']);
        container = node.view;
      }
      ref = node.content.split('\n');
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        error = ref[i];
        error_view = mk_div(['error']);
        container.appendChild(error_view);
        results.push(error_view.appendChild(mk_paragraph(error, ['error-text'])));
      }
      return results;
    }
  };
  mk_rule = function(rule) {
    rule.view = mk_div(['rule']);
    if (rule.action === 'DOUBLE_NOT') {
      rule.view.appendChild(mk_span('¬¬', ['rule-type']));
    } else if (rule.action === 'EFSQ') {
      rule.view.appendChild(mk_span('EFSQ', ['rule-type']));
    } else if (rule.action === 'REPEAT') {
      rule.view.appendChild(mk_span('R', ['rule-type']));
    } else {
      rule.view.appendChild(mk_span(rule.action, ['rule-type']));
      rule.view.appendChild(mk_span(rule.connector.content, ['rule-connector']));
    }
    return mk_ref(rule);
  };
  mk_ref = function(rule) {
    var i, index, indices, ref;
    rule.view.appendChild(mk_span('(', ['parenthesis', 'ref']));
    if (rule.references.type === 'ARRAY') {
      indices = rule.references.indices;
      for (index = i = 0, ref = indices.length - 1; 0 <= ref ? i < ref : i > ref; index = 0 <= ref ? ++i : --i) {
        rule.view.appendChild(mk_span(indices[index], ['reference-index']));
        rule.view.appendChild(mk_span(',', ['reference-reparator']));
      }
      rule.view.appendChild(mk_span(indices[indices.length - 1], ['reference-index']));
    } else {
      rule.view.appendChild(mk_span(rule.references.first, ['reference-index']));
      rule.view.appendChild(mk_span('-', ['reference-reparator']));
      rule.view.appendChild(mk_span(rule.references.last, ['reference-index']));
    }
    return rule.view.appendChild(mk_span(')', ['parenthesis', 'ref']));
  };
  process_expression = function(expression) {
    return mk_expression[expression.type](expression);
  };
  process_children = function(parent, error, level) {
    var i, len, node, ref, results;
    ref = parent.children;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      node = ref[i];
      mk[node.type](node, error, level);
      results.push(parent.view.appendChild(node.view));
    }
    return results;
  };
  return viewer.process = function(ast) {
    var i, len, lines, node, ref;
    ast.root.view = mk_div(['root']);
    lines = mk_div(['lines']);
    ref = ast.root.children;
    for (i = 0, len = ref.length; i < len; i++) {
      node = ref[i];
      mk[node.type](node, ast.error, 0);
      lines.appendChild(node.view);
      add_classes(node.view, ['first-level']);
    }
    return ast.root.view.appendChild(lines);
  };
})();
