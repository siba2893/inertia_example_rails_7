export default {
  required: 'Este campo es requerido',
  sameAs: (fieldName) => `El campo debe ser igual a ${ fieldName }`,
  type: (_type) => {
    let result = ''
    switch (_type) {
      case 'email':
        result = 'El correo no tiene un formato válido'
        break
      default:
        result = 'El formato no es válido'
    }
    return result
  }
}