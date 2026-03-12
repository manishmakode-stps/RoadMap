import { useMemo, useState } from 'react'

export function useForm({ initialValues, validators = {}, onSubmit, validateOnChange = true }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateField = (name, value, nextValues) => {
    const validator = validators[name]
    if (!validator) return ''
    return validator(value, nextValues)
  }

  const validateAll = (nextValues) => {
    const nextErrors = {}
    Object.keys(validators).forEach((name) => {
      const message = validateField(name, nextValues[name], nextValues)
      if (message) nextErrors[name] = message
    })
    return nextErrors
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    const nextValues = { ...values, [name]: value }
    setValues(nextValues)

    if (validateOnChange && touched[name]) {
      const fieldError = validateField(name, value, nextValues)
      setErrors((prev) => ({ ...prev, [name]: fieldError }))
    }
  }

  const handleBlur = (event) => {
    const { name } = event.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const fieldError = validateField(name, values[name], values)
    setErrors((prev) => ({ ...prev, [name]: fieldError }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitted(true)
    setTouched(
      Object.keys(initialValues).reduce((acc, key) => {
        acc[key] = true
        return acc
      }, {}),
    )

    const nextErrors = validateAll(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0 && onSubmit) {
      onSubmit(values)
    }
  }

  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitted(false)
  }

  const isValid = useMemo(
    () => Object.values(errors).every((message) => !message),
    [errors],
  )

  return {
    values,
    errors,
    touched,
    isSubmitted,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  }
}
