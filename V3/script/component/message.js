var errorElement, errorName;

window.ERROR_ELEMENT = {
  REFERENCIA_MULTIPLE_ELIMINACION_CONJUNCION: {
    content: 'Para justificar una eliminación de la conjunción se ' + 'debe remitir a una única fórmula previa'
  },
  REFERENCIA_A_LINEA_POSTERIOR: {
    content: 'Toda fórmula que se agrega en la derivación debe estar justificada ' + 'por una o varias líneas previas'
  },
  INTRODUCCION_CONJUNCION_CONECTOR_INCORRECTO: {
    content: 'La introducción de la conjunción remite indefectiblemente a una ' + 'formula que tiene el símbolo Λ como conector dominante'
  },
  INTRODUCCION_DISYUNCION_CONECTOR_INCORRECTO: {
    content: 'La introducción de la disyunción remite indefectiblemente a una ' + 'formula que tiene el símbolo V como conector dominante'
  },
  INTRODUCCION_CONDICIONAL_CONECTOR_INCORRECTO: {
    content: 'La introducción de la condicional remite indefectiblemente a una ' + 'formula que tiene el símbolo → como conector dominante'
  },
  INTRODUCCION_CONDICIONAL_FALTA_ITERACION: {
    content: 'La aplicación correcta de la regla de introducción del ' + 'condicional remite a un contexto de suposición. El contenido del ' + 'supuesto inicial de la regla de introducción del condicional es ' + 'siempre el antecedente del condicional que se pretende justificar'
  },
  INTRODUCCION_NEGACION_FALTA_NAGACION: {
    content: 'La introducción de la negación remite indefectiblemente a una ' + 'formula que tiene el símbolo ¬ como conector dominante'
  },
  INTRODUCCION_NEGACION_FALTA_ITERACION: {
    content: 'La aplicación correcta de la regla de introducción de la ' + 'negación remite a un contexto de suposición. El contenido del ' + 'supuesto inicial de la regla de introducción de la negación es ' + 'siempre una fórmula contradictoria a la que se pretende arribar ' + 'con la regla. Si debo llegar a ¬A, el supuesto debe ser A'
  },
  DOBLE_NEGACION_REFERENCIAS_MULTIPLES: {
    content: 'Para justificar una doble negación se debe remitir a una ' + 'única fórmula previa'
  },
  REPETICION_REFERENCIAS_MULTIPLES: {
    content: 'Para justificar una repetición se debe remitir a una única ' + 'fórmula previa'
  },
  REPETICION_REFERENCIAS_INVALIDAS: {
    content: 'La repetición espera una referencia a un elemento equivalente'
  },
  EFSQ_REFERENCIAS_MULTIPLES: {
    content: 'Para justificar una EFSQ se debe remitir a una única fórmula ' + 'previa'
  },
  EFSQ_REFERENCIAS_INVALIDAS: {
    content: 'Para justificar la aplicación de la regla EFSQ se debe remitir ' + 'a una contradicción (⊥)'
  },
  CIERRE_ITERACION_SIN_SUPUESTO: {
    content: 'Para cancelar un supuesto en el validador con << se requiere ' + 'haber abierto previamente dicho supuesto. Es condición necesaria que ' + 'haya un supuesto para que el mismo pueda ser cancelado'
  },
  CIERRE_ITERACION_ELEMENTO_UNICO: {
    context: {
      suposed: 'El supuesto que conforma la unica formula de la iteracion'
    },
    content: 'Para cancelar un supuesto en el validador con << se requiere ' + 'haber arribado a una nueva formula dentro del contexto de suposición ' + '\n' + 'Para el caso particular en el que se pretende generar A → A es ' + 'necesario utilizar la regla de repetición' + '\n' + '1:${suposed} supuesto' + '\n' + '2:${suposed} R(1)' + '\n' + '<<' + '\n' + '3:${suposed} → ${suposed} I→(1,2)'
  },
  ELIMINACION_NEGACION_NO_CONTRADICCION: {
    content: 'La aplicación de la regla de eliminación de la negación tiene ' + 'como contenido una contradicción (⊥)'
  },
  ELIMINACION_NEGACION_REFERENCIAS_INVALIDAS: {
    content: '' + 'La eliminación de la negación se fundamenta en dos fórmulas ' + 'contradictorias. Por ejemplo: ' + '\n' + '1:(pVq)' + '\n' + '2:¬(pVq)' + '\n' + '3:⊥ E¬(1,2)' + '\n' + 'Debe asegurarse de indicar correctamente las fórmulas ' + 'contradictorias, como así también verificar si son efectivamente ' + 'contradictorias y responden al esquema A y ¬A'
  },
  ELIMINACION_CONDICIONAL_REFERENCIAS_INVALIDAS: {
    content: '' + 'La regla de eliminación del condicional se justifica a partir de ' + 'dos fórmulas previas, de las cuales, una tiene un condicional ' + 'como conectiva dominante (A→B) y la otra remmite al antecedente ' + 'del condicional formulado. Por ejemplo:' + '\n' + '1:(pVq)→p premisa' + '\n' + '2:(pVq) premisa' + '\n' + '3:p E→(1,2)' + '\n' + 'Asegúrese también de indicar las referencias correctamente y si ' + 'efectivamente responden al esquema señalado'
  },
  ELIMINACION_DISYUNCION_REFERENCIAS_INVALIDAS: {
    content: '' + 'La regla de eliminación de la disyunción requiere justificarse a ' + 'partir de tres fórmulas previas, de las cuales,una de ellas tiene ' + 'una disyunción como conectiva dominante, mientras que las otras dos, ' + 'son condicionales que tienen como antecedente los disyuntos contenidos ' + 'por la disyunción ofrecida y como consecuente la fórmula a la que se ' + 'pretende arribar. Por ejemplo:' + '\n' + '1:pVq premisa' + '\n' + '2:p→s premisa' + '\n' + '3:q→s premisa' + '\n' + '4:s EV(1,2,3)' + '\n' + 'Asegúrese también de indicar las referencias correctamente y verifique ' + 'si efectivamente se encuentran disponibles los elementos señalados'
  },
  DOBLE_NEGACION_TIPO_REFERENCIAS_INVALIDAS: {
    content: '' + 'La regla de la doble negación únicamente puede aplicarse sobre una ' + 'fórmula que se encuentra afectada por dos negaciones. Por ejemplo:' + '\n' + '1:¬¬(pVq) premisa' + '\n' + '2:(pVq) ¬¬(1)' + '\n' + 'Asegúrese también de indicar las referencias correctamente'
  },
  DOBLE_NEGACION_RESULTADO_INVALIDO: {
    context: {
      dobleNegacionReferida: 'formula a la que se hace referencia en la regla. Corresponde a una doble negación',
      referenciaDespejado: 'resultado de eliminar la doble negación de la fórmula a la que se hace referencia'
    },
    content: '' + 'Para aplicar correctamente la regla de doble negación debe ' + 'considerar que ' + '\n' + '${dobleNegacionReferida}' + '\n' + 'produce' + '\n' + '${referenciaDespejado}'
  },
  INTRODUCCION_NEGACION_ITERACION_INVALIDA: {
    context: {
      expresionNegada: 'formula que se debería suponer'
    },
    content: '' + 'Para aplicar correctamente la regla de introducción de la negación ' + 'se debe suponer' + '\n' + '${expresionNegada}' + '\n' + 'y arribar a una contradicción (⊥)'
  },
  INTRODUCCION_CONDICIONAL_ITERACION_INVALIDA: {
    context: {
      leftExpression: 'el antecedente del condicional que se debería suponer y arribar a aquella fórmula que será su consecuente',
      rightExpression: 'el concecuente del condicional al que se pretende arribar a travez del antecendente supuesto'
    },
    content: '' + 'Para aplicar correctamente la regla de introducción del condicional ' + 'se debe suponer' + '\n' + '${leftExpression}' + '\n' + 'y arribar a la fórmula' + '\n' + '${rightExpression}'
  },
  INTRODUCCION_DISYUNCION_REFERENCIA_INVALIDA: {
    context: {
      leftExpression: 'primer disyunto, está ubicado a la izquierda del conector V',
      rightExpression: 'segundo disyunto, está ubicado a la derecha del conector V'
    },
    content: '' + 'Para aplicar correctamente la regla de introducción de la disyunción ' + 'se debe remitir a al menos uno de los dos disyuntos que la conforman' + '\n' + '${leftExpression}' + '\n' + '${rightExpression}' + '\n' + 'Asegúrese también de indicar las referencias correctamente'
  },
  INTRODUCCION_DISYUNCION_REFERENCIA_EXTRA: {
    content: '' + 'Para aplicar correctamente la regla de introducción de la disyunción ' + 'se debe remitir a una única referencia'
  },
  INTRODUCCION_CONJUNCION_REFERENCIA_INVALIDA: {
    context: {
      leftExpression: 'la fórmula a la izquierda del conector Λ',
      rightExpression: 'la fórmula a la derecha del conector Λ'
    },
    content: '' + 'Para aplicar correctamente la regla de introducción la conjunción se ' + 'debe remitir a las dos formulas que la conforman' + '\n' + '${leftExpression}' + '\n' + '${rightExpression}' + '\n' + 'Asegúrese también de indicar las referencias correctamente'
  },
  INTRODUCCION_CONJUNTION_REFERENCIA_EXTRA: {
    content: '' + 'Para aplicar correctamente la regla de introducción la conjunción ' + 'se debe remitir a dos referencias distintas' + '\n' + 'Para el caso particular en el que se pretende demostrar: ' + '\n' + 'A → (A Λ A)' + '\n' + 'Deberá utilizarse la repetición' + '\n' + '1: A premisa' + '\n' + '2: A R(1)' + '\n' + '3: A Λ A IΛ(1,2)'
  },
  ITERACION_REFERENCIA_INVALIDA: {
    context: {
      firstReferenceIndex: 'el número de la línea donde se hizo inicialmente el supuesto (primera linea de la iteracion)',
      lastReferenceIndex: 'el número de la línea donde se arribó a la fórmula objetivo (ultima linea de la iteracion)'
    },
    content: '' + 'Las referencias ofrecidas no se corresponden con un contexto de ' + 'suposición adecuado.' + '\n' + 'Se esperaba (${firstReferenceIndex}-${lastReferenceIndex})'
  },
  ELIMINACION_CONJUNCION_REFERENCIA_INVALIDA: {
    context: {
      expression: 'fórmula cuya conectiva dominante sea una Λ (expresion que se pretende obtener)'
    },
    content: 'Para generar ' + '\n' + '${expression}' + '\n' + 'aplicando correctamente la regla de eliminación de la conjunción se ' + 'debe partir de una formula de la forma' + '\n' + '${expression} Λ X'
  },
  FORMULA_INVALIDA_LUEGO_DE_ITERACION: {
    content: 'Luego de cancelar un supuesto la fórmula obtenida debe ' + 'responder o al esquema de la regla de introducción de condicional o ' + 'al esquema de la regla de introducción de la negación'
  },
  FINALIZACION_EN_CIERRE_DE_ITERACION: {
    content: 'La reglas que admiten supuestos requieren como resultado una ' + 'fórmula particular. No pueden jamás finalizar en la cancelación del ' + 'supuesto.'
  },
  FINALIZACION_DENTRO_DE_ITERACION: {
    content: 'Los supuestos deben cancelarse:' + '\n' + 'Una vez que arribamos al resultado esperado, para denotar la cancelación ' + 'del supuesto debe debe indicarlo con los símbolos ' + '\n' + '<<'
  },
  CIERRES_DE_ITERACION_CONSECUTIVOS: {
    content: 'Hay que cancelar correctamente los supuestos en caso de haber ' + 'supuestos anidados. Teniendo primacía los últimos supuestos abiertos ' + 'en el orden de su cancelación'
  },
  NO_SE_PUEDE_PARSEAR_LA_LINEA: {
    context: {
      rawLine: 'Linea original ingresada',
      parseError: 'Error del componente de parseo'
    },
    content: '${rawLine} \n' + 'no responde a una fórmula bien formada.' + '\n' + 'Revise la sintaxis' + '\n' + '${parseError}'
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
