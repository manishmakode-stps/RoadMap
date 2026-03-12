import { useState } from 'react'
import { useForm } from './hooks/useForm'

function LoginForm() {
  const [message, setMessage] = useState('')
  const form = useForm({
    initialValues: { email: '', password: '' },
    validators: {
      email: (value) => {
        if (!value.trim()) return 'Email is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Use a valid email address'
        return ''
      },
      password: (value) => {
        if (!value) return 'Password is required'
        if (value.length < 8) return 'Must be at least 8 characters'
        return ''
      },
    },
    onSubmit: (values) => setMessage(`Login payload ready for ${values.email}`),
  })

  return (
    <section className="panel">
      <h2>Login Form</h2>
      <form onSubmit={form.handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={form.values.email}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            placeholder="dev@example.com"
          />
          <span className="error-text">{form.touched.email ? form.errors.email : ''}</span>
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.values.password}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            placeholder="At least 8 characters"
          />
          <span className="error-text">{form.touched.password ? form.errors.password : ''}</span>
        </div>
        <div className="actions">
          <button className="btn-primary" type="submit">Submit</button>
          <button className="btn-secondary" type="button" onClick={form.resetForm}>Reset</button>
        </div>
      </form>
      {form.isSubmitted && form.isValid && message && <p className="success">{message}</p>}
    </section>
  )
}

function FeedbackForm() {
  const [message, setMessage] = useState('')
  const form = useForm({
    initialValues: { fullName: '', comments: '' },
    validators: {
      fullName: (value) => (!value.trim() ? 'Full name is required' : ''),
      comments: (value) => {
        if (!value.trim()) return 'Comments are required'
        if (value.trim().length < 15) return 'Write at least 15 characters'
        return ''
      },
    },
    onSubmit: (values) => setMessage(`Thanks, ${values.fullName}. Feedback captured.`),
  })

  return (
    <section className="panel">
      <h2>Feedback Form</h2>
      <form onSubmit={form.handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            value={form.values.fullName}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            placeholder="Your name"
          />
          <span className="error-text">{form.touched.fullName ? form.errors.fullName : ''}</span>
        </div>
        <div className="field">
          <label htmlFor="comments">Comments</label>
          <textarea
            id="comments"
            name="comments"
            value={form.values.comments}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            rows={4}
            placeholder="Tell us what worked and what did not."
          />
          <span className="error-text">{form.touched.comments ? form.errors.comments : ''}</span>
        </div>
        <div className="actions">
          <button className="btn-primary" type="submit">Submit</button>
          <button className="btn-secondary" type="button" onClick={form.resetForm}>Reset</button>
        </div>
      </form>
      {form.isSubmitted && form.isValid && message && <p className="success">{message}</p>}
    </section>
  )
}

export default function App() {
  return (
    <main className="page">
      <h1 className="title">Reusable Form Hook Demo</h1>
      <p className="subtitle">
        Both forms below use one custom hook for value state, touched state, validation, submit, and reset.
      </p>
      <div className="forms-grid">
        <LoginForm />
        <FeedbackForm />
      </div>
    </main>
  )
}
