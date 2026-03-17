import { useState, useCallback, type ChangeEvent, type FormEvent } from 'react'

type Validator<T> = (values: T) => Partial<Record<keyof T, string>>
type SubmitHandler<T> = (values: T) => Promise<void>

interface UseFormReturn<T> {
  values: T
  errors: Partial<Record<keyof T, string>>
  touched: Partial<Record<keyof T, boolean>>
  isSubmitting: boolean
  isSuccess: boolean
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleBlur: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit: (e: FormEvent) => void
  reset: () => void
}

export function useForm<T extends Record<string, string>>(
  initialValues: T,
  validate: Validator<T>,
  onSubmit: SubmitHandler<T>
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setValues(prev => ({ ...prev, [name]: value }))
      setErrors(prev => ({ ...prev, [name]: undefined }))
    },
    []
  )

  const handleBlur = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name } = e.target
      setTouched(prev => ({ ...prev, [name]: true }))
      setErrors(prev => ({
        ...prev,
        ...validate({ ...values }),
      }))
    },
    [values, validate]
  )

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()

      const allTouched = Object.keys(values).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {} as Partial<Record<keyof T, boolean>>
      )
      setTouched(allTouched)

      const validationErrors = validate(values)
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        return
      }

      setIsSubmitting(true)
      try {
        await onSubmit(values)
        setIsSuccess(true)
        setValues(initialValues)
        setTouched({})
        setErrors({})
      } catch {
        setErrors({ submit: 'Something went wrong. Please try again.' } as Partial<
          Record<keyof T, string>
        >)
      } finally {
        setIsSubmitting(false)
      }
    },
    [values, validate, onSubmit, initialValues]
  )

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSuccess(false)
  }, [initialValues])

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isSuccess,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  }
}
