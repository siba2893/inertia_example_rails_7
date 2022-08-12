import Config from '~/config'

const getTranslations = async (locale) => {
  const imports = await import(`./translations/${locale}.js`)
  console.log(imports.default.required)
  console.log(imports.default.type('email'))
  return imports.default
}

const translations = await getTranslations(Config.locale)

export const required = ({ trigger, message } = {}) => ({
  required: true,
  trigger: trigger || ["blur", "input"],
  message: message || translations.required
})

export const type = ({ type, trigger, message } = {}) => {
  return {
    type: type,
    trigger: trigger || ["blur", "input"],
    message: message || translations.type(type),
  }
}

export const sameAs = ({ valueToCompare, fieldName, trigger, message } = {}) => {
  return {
    validator: (rule, value) => {
      return value === valueToCompare;
    },
    trigger: trigger || ["blur", "input"],
    message: message || translations.sameAs(fieldName),
  }
}