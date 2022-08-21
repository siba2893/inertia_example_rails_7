const isObject = (obj) => {
  return obj instanceof Object && obj.constructor === Object
}

const isEmpty = (item) => {
  if (item === undefined || item === null) return true
  if (typeof item === "string" && item === "") return true
  if (typeof item === "object" && Object.keys(item).length === 0) return true
  if (Array.isArray(item) && item.length === 0) return true
}

const getDataRules = (el) => {
  const data = {};
  [].forEach.call(el.attributes, function (attr) {
    if (/^data-celery-rule-/.test(attr.name)) {
      const camelCaseName = attr.name.substr(5).replace(/-(.)/g, function ($0, $1) {
        return $1.toUpperCase();
      });
      data[camelCaseName] = attr.value;
    }
  });

  return data
}

const validations = () => {
  const inputValidations = {
    max: limit => value => {
      if (!limit || !value) return true
      return +value.length <= +limit
    },
    min: limit => value => {
      if (!limit || !value) return true
      return +value.length >= +limit
    },
    maxNumber: limit => value => {
      if (!limit || !value) return true
      return +value <= +limit
    },
    minNumber: limit => value => {
      if ((limit !== 0 && !limit) || (value !== 0 && !value)) return true
      return +value >= +limit
    },
    required: value => {
      if (Array.isArray(value)) return value.length > 0
      if (isObject(value)) return Object.keys(value).length > 0
      return value === 0 || !!value
    },
    number: value => {
      const result = parseFloat(value)
      return !isNaN(+result) && isFinite(result)
    },
    positiveNum: value => +value >= 0,
    email: value => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value)
    },
    url: (value, regex) => {
      const pattern = regex
        ? regex
        : /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/
      return pattern.test(value)
    },
    sameAs: sameAsValue => value => {
      return sameAsValue === value
    },
    phone: (value, regex) => {
      const pattern = regex ? regex : /^[+]*506[/0-9]{8}$/
      return pattern.test(value)
    }
  }

  return {
    noParams: {
      celeryRuleEmail: (value) => {
        if (value) {
          let result = inputValidations.email(value)
          return result || "El formato del correo es inválido."
        } else {
          return true
        }
      },
      celeryRuleRequired: (value) => {
        let result = inputValidations.required(value)
        return result || "El campo es requerido."
      },
      celeryRuleNumber: (value) => {
        if (isEmpty(value)) return true

        let result = inputValidations.number(value)
        return result || "Este campo debe ser un número."
      },
      celeryRulePositiveNum: (value) => {
        if (isEmpty(value)) return true

        let result = inputValidations.positiveNum(value)
        return result || "El numero debe ser positivo."
      },
      celeryRulePhone: (value) => {
        if (value) {
          let result = inputValidations.phone(value, null)
          return (
            result ||
            "Ingresa un número de telefono válido. Utiliza el formato +506XXXXXXX"
          )
        } else {
          return true
        }
      },
    },
    extraParam: {
      celeryRuleMax: (args = []) => (value) => {
        let result = inputValidations.max(args[0])(value)
        return (
          result ||
          "El campo no debe superar los " + args[0] + " caracteres de largo."
        )
      },
      celeryRuleMin: (args = []) => (value) => {
        let result = inputValidations.min(args[0])(value)
        return (
          result ||
          "El campo debe tener al menos " + args[0] + " caracteres de largo."
        )
      },
      celeryRuleMaxNumber: (args = []) => (value) => {
        let result = inputValidations.maxNumber(args[0])(value)
        return result || "El maximo numero permitido es " + args[0]
      },
      celeryRuleMinNumber: (args = []) => (value) => {
        let result = inputValidations.minNumber(args[0])(value)
        return result || "El minimo numero permito es " + args[0]
      },
      celeryRuleSameAs: (args = []) => (value) => {
        const field = document.querySelector(`#${ args[0] }`)
        if (!field) return true
        const result = inputValidations.sameAs(field.value)(value)
        return result || "El campo debe ser igual a " + args[1]
      },
      celeryRuleUrl: (args = []) => (value) => {
        if (value) {
          let result = inputValidations.url(value, args[0])
          return result || "Dirección web inválida."
        } else {
          return true
        }
      },
    },
  }
}

const debounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export default class CeleryValidator {
  constructor (
    {
      form,
      options = {},
      addStylesFunc
    }
  ) {
    const defaultOptions = {
      addStyles: true,
      disableSubmitBtn: true,
      validateOnSubmit: true
    }
    this.options = { ...defaultOptions, ...options }

    if (form) {
      this.findForm(form)
    } else {
      this.findForms()
    }

    if (addStylesFunc) {
      this.addStyles = addStylesFunc
    }

    if (this.options.addStyles) this.addStyles()

    this.setup()
  }

  addStyles () {
    document.head.innerHTML += `
      <style>
        input.invalid-field, select.invalid-field, textarea.invalid-field {
          border-color: #e24c4c; 
        }   
        div.invalid-field {
          color: #e24c4c;
          height: 100% !important;
        }
        div.invalid-field label {
          transform: translateY(0) !important;
        }
        label.invalid-field-label:after {
          content: ' *';
          color: #e24c4c;
        }
        .disabled-input {
          pointer-events: none;
          background-color: gray;
        }
      </style>`
  }

  findForms () {
    this.forms = document.querySelectorAll('form[data-celery-validator]')
  }

  findForm (form) {
    this.forms = [form]
  }

  setup () {
    if (!this.forms.length) return

    this.forms.forEach(form => {
      const customValidate = new Event('custom-validate');
      const fieldsToValidate = Array.from(form.elements).filter(field => {
        return Object.keys(field.dataset).some(item => item.includes('celery'))
      })
      const preventFormSubmit = (event) => {
        if (event.target.isInvalid()) {
          event.preventDefault()
        }
      }

      form.isInvalid = () => Object.keys(form.dataset).includes('withErrors')
      form.isValid = () => !form.isInvalid()
      form.validateForm = () => {
        fieldsToValidate.forEach(field => field.dispatchEvent(customValidate))
        return form.isValid()
      }

      fieldsToValidate.forEach(field => {
        let rules = getDataRules(field)

        const eventListenerValidation = (_event) => {
          this.applyValidation(rules, field, form)
          const submitBtn = form.querySelector('input[type="submit"]')

          if (form.isInvalid()) {
            if (this.options.disableSubmitBtn && submitBtn) {
              submitBtn.classList.add('disabled-input')
              submitBtn.disabled = true
            }
          } else if (submitBtn) {
            submitBtn.classList.remove('disabled-input')
            submitBtn.disabled = false
          }
        }

        const addErrorLabel = () => {
          const errorBox = document.createElement('div')
          const errorLabel = document.createElement('label')
          errorBox.classList.add('celery-error-label')
          errorBox.style.height = '0px'
          errorBox.style.overflow = 'hidden'
          errorLabel.style.transition = "transform .2s ease-in-out";
          errorLabel.style.display = "block"
          errorLabel.style.transform = "translateY(-100%)"
          errorBox.append(errorLabel)
          field.parentElement.append(errorBox)
        }

        if (rules && Object.keys(rules).length) {
          addErrorLabel();

          // field.removeEventListener('blur', eventListenerValidation)
          // field.addEventListener('blur', eventListenerValidation)

          field.removeEventListener('change', eventListenerValidation)
          field.addEventListener('change', eventListenerValidation)

          field.removeEventListener('input', eventListenerValidation)
          field.addEventListener('input', eventListenerValidation)

          field.removeEventListener('custom-validate', eventListenerValidation)
          field.addEventListener('custom-validate', eventListenerValidation)

          if (this.options.validateOnSubmit) {
            form.removeEventListener('submit', eventListenerValidation)
            form.addEventListener('submit', eventListenerValidation)
          }
        }
      })

      if (this.options.validateOnSubmit) {
        form.removeEventListener('submit', preventFormSubmit)
        form.addEventListener('submit', preventFormSubmit)
      }
    })
  }

  applyValidation (rules, field, form) {
    const vals = validations()
    const addErrorLabels = (validationResult) => {
      const errorBox = field.parentElement.querySelector('div.celery-error-label')
      const errorLabel = errorBox.querySelector('label')
      const titleLabel = document.querySelector(`label[for=${ field.getAttribute('id') }]`)

      if (typeof validationResult === 'string') {
        titleLabel.classList.add('invalid-field-label')
        errorBox.classList.add('invalid-field')
        errorLabel.innerHTML = validationResult
        field.classList.add('invalid-field')
        form.dataset.withErrors = ''
        return true
      } else {
        field.classList.remove('invalid-field')
        if (titleLabel) titleLabel.classList.remove('invalid-field-label')
        if (errorBox) {
          errorBox.classList.remove('invalid-field')
          errorLabel.style.transform = "translateY(-100%)"
          errorBox.style.height = '0px'
        }

        return false
      }
    }

    Object.keys(rules).every(rule => {
      let validationResult = null
      const args = JSON.parse(rules[rule] || null)

      if (vals.noParams[rule]) {
        validationResult = vals.noParams[rule](field.value)
      } else if (vals.extraParam[rule] && args) {
        validationResult = vals.extraParam[rule](args)(field.value)
      }

      if (addErrorLabels(validationResult)) return false

      delete form.dataset.withErrors
      return true
    })
  }
}