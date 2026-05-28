import '@testing-library/jest-dom'
import { configure } from '@testing-library/react'

const originalWarn = console.warn
const originalError = console.error

const UNWANTED_WARNINGS = [
  'ReactDOMTestUtils.act',
]

console.warn = (...args) => {
  if (args.length > 0 && typeof args[0] === 'string' && UNWANTED_WARNINGS.some(warning => args[0].includes(warning))) {
    return
  }
  originalWarn.call(console, ...args)
}

console.error = (...args) => {
  if (args.length > 0 && typeof args[0] === 'string' && UNWANTED_WARNINGS.some(warning => args[0].includes(warning))) {
    return
  }
  // Some frameworks log errors as an Error object
  if (args.length > 0 && args[0] instanceof Error && UNWANTED_WARNINGS.some(warning => args[0].message.includes(warning))) {
    return
  }
  // React 18 uses error boundary string formats sometimes, intercept all
  if (args.some(arg => typeof arg === 'string' && UNWANTED_WARNINGS.some(warning => arg.includes(warning)))) {
    return
  }
  originalError.call(console, ...args)
}
configure({ 
  testIdAttribute: 'data-testid',
})

// Make React's act available globally for testing-library
global.IS_REACT_ACT_ENVIRONMENT = true
