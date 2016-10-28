var errorElement, errorName;

window.ERROR_ELEMENT = {
  REFERENCIA_MULTIPLE_ELIMINACION_CONJUNCION: {
    content: 'La eliminacion de la conjunción debe tener una única referencia'
  },
  REFERENCIA_A_LINEA_POSTERIOR: {
    content: 'Deben utilizarse referencias a lineas anteriores a la actual'
  },
  INTRODUCCION_CONJUNCION_CONECTOR_INCORRECTO: {
    content: 'La intruducción de la conjunción permite generar una formula con un conector Λ'
  },
  INTRODUCCION_DISYUNCION_CONECTOR_INCORRECTO: {
    content: 'La intruducción de la disyunción permite generar una formula con un conector V'
  },
  INTRODUCCION_CONDICIONAL_CONECTOR_INCORRECTO: {
    content: 'La intruducción del condicional permite generar una formula con un conector →'
  },
  INTRODUCCION_CONDICIONAL_FALTA_ITERACION: {
    content: 'La introducción de un condicional debe suceder a un contexto de suposición'
  },
  INTRODUCCION_NEGACION_FALTA_NAGACION: {
    content: 'La intruducción de la negación permite generar una formula con un simbolo ¬'
  },
  INTRODUCCION_NEGACION_FALTA_ITERACION: {
    content: 'La introducción de la negación debe suceder a un contexto de suposición'
  },
  DOBLE_NEGACION_REFERENCIAS_MULTIPLES: {
    content: 'La eliminacion de la negación doble debe tener una única referencia'
  },
  REPETICION_REFERENCIAS_MULTIPLES: {
    content: 'La repetición espera una única referencia'
  },
  REPETICION_REFERENCIAS_INVALIDAS: {
    content: 'La repetición espera una referencia a un elemento equivalente'
  },
  EFSQ_REFERENCIAS_MULTIPLES: {
    content: 'EFSQ espera una única referencia'
  },
  EFSQ_REFERENCIAS_INVALIDAS: {
    content: 'EFSQ espera una contradicción como referencia'
  },
  CIERRE_ITERACION_SIN_SUPUESTO: {
    content: 'Para cerrar una iteracion con << se debe partir de un supuesto'
  },
  ELIMINACION_NEGACION_NO_CONTRADICCION: {
    content: 'La eliminación de la negación genera una contradicción (⊥)'
  },
  ELIMINACION_NEGACION_REFERENCIAS_INVALIDAS: {
    content: '' + 'La eliminación de la negación espera dos elementos opuestos, Por ejemplo: ' + '\n' + '1:(pVq)' + '\n' + '2:¬(pVq)' + '\n' + '3:⊥ E¬(1,2)' + '\n' + 'Asegurece también de indicar las referencias correctamente'
  },
  ELIMINACION_CONDICIONAL_REFERENCIAS_INVALIDAS: {
    content: '' + 'La eliminación del condicional espera dos elementos, de los cuales, ' + '\n' + 'uno es una implicación y el otro el antecedente del primero. Por ejemplo:' + '\n' + '1:(pVq)→p premisa' + '\n' + '2:(pVq) premisa' + '\n' + '3:p E→(1,2)' + '\n' + 'Asegurece también de indicar las referencias correctamente'
  },
  ELIMINACION_DISYUNCION_REFERENCIAS_INVALIDAS: {
    content: '' + 'La eliminación de la disyunción espera tres elementos, de los cuales,' + 'uno es una disyunción y los otros dos, son condicionales que tienen como premisa las' + 'partes del primero. Y permite extraer el consecuente de los últimos. Por ejemplo:' + '\n' + '1:pVq premisa' + '\n' + '2:p→s premisa' + '\n' + '3:q→s premisa' + '\n' + '4:s EV(1,2,3)' + '\n' + 'Asegurece también de indicar las referencias correctamente'
  },
  DOBLE_NEGACION_TIPO_REFERENCIAS_INVALIDAS: {
    content: '' + 'La regla de la doble negación espera un elemento negado dos veces. Por ejemplo:' + '\n' + '1:¬¬(pVq) premisa' + '\n' + '2:(pVq) ¬¬(1)' + '\n' + 'Asegurece también de indicar las referencias correctamente'
  },
  DOBLE_NEGACION_RESULTADO_INVALIDO: {
    context: {
      dobleNegacionReferida: 'Formula a la que se hace referencia en la regla. Corresponde a una doble negación',
      referenciaDespejado: 'Resultado de eliminar la doble negación de la linea a la que se hace referencia'
    },
    content: '' + 'Eliminar la doble negación en' + '\n' + '${dobleNegacionReferida}' + '\n' + 'produce' + '\n' + '${referenciaDespejado}'
  },
  INTRODUCCION_NEGACION_ITERACION_INVALIDA: {
    context: {
      expresionNegada: 'Formula que se debería suponer'
    },
    content: '' + 'Para introducir esta negación se debería suponer' + '\n' + '${expresionNegada}' + '\n' + 'y obtener como resultado una contradicción (⊥)'
  },
  INTRODUCCION_CONDICIONAL_ITERACION_INVALIDA: {
    context: {
      leftExpression: 'Antecedente del condicional generado',
      rightExpression: 'Concecuente del condicional generado'
    },
    content: '' + 'Para introducir este condicional se debería suponer' + '\n' + '${leftExpression}' + '\n' + 'y obtener como resultado' + '\n' + '${rightExpression}'
  },
  INTRODUCCION_DISYUNCION_REFERENCIA_INVALIDA: {
    context: {
      leftExpression: 'Formula a la izquierda del conector V',
      rightExpression: 'Formula a la derecha del conector V'
    },
    content: '' + 'Para introducir una disyunción debe estar afirmada al menos una de sus dos partes' + '\n' + '${leftExpression}' + '\n' + '${rightExpression}' + '\n' + 'Asegurece también de indicar las referencias correctamente'
  },
  INTRODUCCION_CONJUNCION_REFERENCIA_INVALIDA: {
    context: {
      leftExpression: 'Formula a la izquierda del conector Λ',
      rightExpression: 'Formula a la derecha del conector Λ'
    },
    content: '' + 'Para introducir una conjunción deben estar afirmadas sus dos partes' + '\n' + '${leftExpression}' + '\n' + '${rightExpression}' + '\n' + 'Asegurece también de indicar las referencias correctamente'
  },
  ITERACION_REFERENCIA_INVALIDA: {
    context: {
      firstReferenceIndex: 'Numero de la primera linea de la iteracion',
      lastReferenceIndex: 'Numero de la ultima linea de la iteracion'
    },
    content: '' + 'La referencias no se corresponden con el contexto de suposición.' + '\n' + 'Se esperaba (${firstReferenceIndex}-${lastReferenceIndex})'
  },
  ELIMINACION_CONJUNCION_REFERENCIA_INVALIDA: {
    context: {
      expression: 'Expresion que se pretende obtener'
    },
    content: 'Para generar ' + '\n' + '${expression}' + '\n' + 'mediante la eliminación de la conjunciónse debe partir de otra fórmula de la forma' + '\n' + '${expression} Λ X'
  },
  FORMULA_INVALIDA_LUEGO_DE_ITERACION: {
    content: 'Luego de una iteración se espera una introducción de condicional o una intruducción de negación'
  },
  FINALIZACION_EN_CIERRE_DE_ITERACION: {
    content: 'La derivación no puede finalizar con el cierre de un contexto de suposición'
  },
  FINALIZACION_DENTRO_DE_ITERACION: {
    content: 'La derivación no puede finalizar dentro de un contexto de suposición'
  },
  CIERRES_DE_ITERACION_CONSECUTIVOS: {
    content: 'No se pueden realizar dos cierres de contextos de suposición consecutivos'
  },
  NO_SE_PUEDE_PARSEAR_LA_LINEA: {
    context: {
      rawLine: 'Linea original ingresada',
      parseError: 'Error del componente de parseo'
    },
    content: '${rawLine} \n' + 'Error en la estructura de la linea' + '\n' + 'Revise la sintaxis' + '\n' + '${parseError}'
  },
  LINEA_NO_ESPERADA: {
    context: {
      rawLine: 'Linea original ingresada',
      expectedLineIndex: 'La linea que se esperaba a continuacion'
    },
    content: '${rawLine} \n' + 'Se esperaba el numero de linea ${expectedLineIndex}'
  }
};

for (errorName in window.ERROR_ELEMENT) {
  errorElement = window.ERROR_ELEMENT[errorName];
  errorElement.name = errorName;
  errorElement.type = 'ERROR';
}
