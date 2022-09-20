import { isObject } from './utils'
import { email } from '@helpers/input-validators'

export default {
  max: limit => value => {
    if (!limit || !value) return true;
    return +value.length <= +limit;
  },
  min: limit => value => {
    if (!limit || !value) return true;
    return +value.length >= +limit;
  },
  maxNumber: limit => value => {
    if (!limit || !value) return true;
    return +value <= +limit;
  },
  minNumber: limit => value => {
    if ((limit !== 0 && !limit) || (value !== 0 && !value)) return true;
    return +value >= +limit;
  },
  required: value => {
    if (Array.isArray(value)) return value.length > 0;
    if (isObject(value)) return Object.keys(value).length > 0;
    return value === 0 || !!value;
  },
  number: value => {
    const result = parseFloat(value);
    return !isNaN(+result) && isFinite(result);
  },
  trueNumber: value => !isNaN(+value) && isFinite(value),
  positiveNum: value => +value >= 0,
  arrayNotEmpty: array => !!array.length,
  email: value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value);
  },
  validWebsite: (value, regex) => {
    const pattern = regex
      ? regex
      : /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;
    return pattern.test(value);
  },
  sameAs: sameAsValue => value => {
    return sameAsValue === value;
  },
  rangeCommaSeparatedNumbers: (min, max) => value => {
    if (!min || !max || !value) return true;
    let values = value.toString().split(/[ ,]+/);
    return values.every(
      item => item === "@" || (+item >= +min && +item <= +max)
    );
  },
  validPhone: (value, regex) => {
    const pattern = regex ? regex : /^[+]*506[/0-9]{8}$/;
    return pattern.test(value);
  }
};