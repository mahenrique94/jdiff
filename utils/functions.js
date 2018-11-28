const compose = (param, ...fns) => fns.reduce((currentValue, fn) => fn(currentValue), param)

module.exports = { compose }
