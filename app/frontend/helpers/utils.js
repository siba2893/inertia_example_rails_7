import { Inertia } from '@inertiajs/inertia'

export const iVisitPrevent = (url, event) => {
  if (event) event.preventDefault()
  Inertia.visit(url)
}

export const genUUID = () => {
  return (
    Math.random()
      .toString(36)
      .substring(2) + new Date().getTime().toString(36)
  );
};

export const isEmpty = item => {
  if (item === undefined || item === null) return true;
  if (typeof item === "string" && item === "") return true;
  if (typeof item === "object" && Object.keys(item).length === 0) return true;
  if (Array.isArray(item) && item.length === 0) return true;
}

export const isObject = (obj) => {
  return obj instanceof Object && obj.constructor === Object;
}