import Validators from "./validators"
import { isEmpty } from "./utils"

export const max = ({ value, limit }) => {
  if (isEmpty(value)) return true

  if (limit) {
    let result = Validators.max(limit)(value)
    return (result || "El campo no debe superar los " + limit + " caracteres de largo.")
  } else {
    console.warn('Limit is not defined')
    return true
  }
}

export const min = ({ value, limit }) => {
  if (limit) {
    if (isEmpty(value)) return "El campo debe tener al menos " + limit + " caracteres de largo."

    let result = Validators.min(limit)(value)
    return (result || "El campo debe tener al menos " + limit + " caracteres de largo.")
  } else {
    console.warn('Limit is not defined')
    return true
  }
}

export const maxNumber = ({ value, limit }) => {
  if (isEmpty(value)) return true

  if (limit) {
    let result = Validators.maxNumber(limit)(value)
    return result || "El máximo número permitido es " + limit
  } else {
    console.warn('Limit is not defined')
    return true
  }
}

export const minNumber = ({ value, limit }) => {
  if (isEmpty(value)) return true

  if (limit) {
    let result = Validators.minNumber(limit)(value)
    return result || "El mínimo número permito es " + limit
  } else {
    console.warn('Limit is not defined')
    return true
  }
}

export const required = ({ value }) => {
  let result = Validators.required(value)
  return result || "El campo es requerido."
}

export const number = ({ value }) => {
  if (isEmpty(value)) return true

  let result = Validators.number(value)
  return result || "Este campo debe ser un número."
}

export const trueNumber = ({ value }) => {
  if (isEmpty(value)) return true

  let result = Validators.trueNumber(value)
  return result || "Este campo debe ser un numero."
}

export const positiveNum = ({ value }) => {
  if (isEmpty(value)) return true

  let result = Validators.positiveNum(value)
  return result || "El numero debe ser positivo."
}

export const arrayNotEmpty = ({value, array, message }) => {
  let result = Validators.arrayNotEmpty(array)(value, message)
  return (result || message || "La lista no debe estar vacia. Por favor agrega algo.")
}

export const email = ({ value }) => {
  if (value) {
    let result = Validators.email(value)
    return result || "Correo invalido."
  } else {
    return true
  }
}

export const sameAs = ({ value, valueToCompare, field }) => {
  if (field) {
    let result = Validators.sameAs(valueToCompare)(value)
    return result || "El campo debe ser igual a " + field
  } else {
    console.warn('Field is not defined')
    return true
  }
}

export const rangeCommaSeparatedNumbers = ({ value, min, max }) => {
  let result = Validators.rangeCommaSeparatedNumbers(min, max)(value)
  return (
    result || "Los numeros listados deben estar entre" + min + " y " + max
  )
}

export const validWebsite = ({ value, regex }) => {
  if (value) {
    let result = Validators.validWebsite(value, regex)
    return result || "Dirección web inválida."
  } else {
    return true
  }
}

export const validPhone = ({ value }) => {
  if (value) {
    let result = Validators.validPhone(value, null)
    return (
      result ||
      "Ingresa un número de telefono válido. Utiliza el formato +506XXXXXXX"
    )
  } else {
    return true
  }
}

export const validate = (validations = [], args = {}) => {
  let text = null

  for (let validation of validations) {
    if (text) break
    const result = validation(args)
    text = typeof result === 'string' ? result : null
  }

  return text
}