import { useState } from 'react'
import './App.css'

const initialForm = {
  name: '',
  email: '',
  topic: 'general',
  preferredContact: 'email',
  message: '',
}

function App() {
  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function validate(data) {
    const nextErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!data.name.trim()) {
      nextErrors.name = 'Name is required.'
    } else if (data.name.trim().length < 3) {
      nextErrors.name = 'Name must be at least 3 characters.'
    }

    if (!data.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!emailRegex.test(data.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!data.message.trim()) {
      nextErrors.message = 'Message is required.'
    } else if (data.message.trim().length < 10) {
      nextErrors.message = 'Message must be at least 10 characters.'
    }

    return nextErrors
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validate(formData)
    setErrors(nextErrors)
    setSubmitted(false)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setSubmitted(true)
    setFormData(initialForm)
  }

  return (
    <main className="page">
      <section className="card">
        <h1>Contact Form</h1>
        <p className="subtext">Contact us — we're here to help.</p>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            className={errors.name ? 'has-error' : ''}
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={errors.email ? 'has-error' : ''}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <label htmlFor="topic">Topic</label>
          <select id="topic" name="topic" value={formData.topic} onChange={handleChange}>
            <option value="general">General Query</option>
            <option value="support">Support</option>
            <option value="feedback">Feedback</option>
            <option value="business">Business</option>
          </select>

          <fieldset>
            <legend>Preferred Contact Method</legend>
            <label className="radio">
              <input
                type="radio"
                name="preferredContact"
                value="email"
                checked={formData.preferredContact === 'email'}
                onChange={handleChange}
              />
              Email
            </label>
            <label className="radio">
              <input
                type="radio"
                name="preferredContact"
                value="phone"
                checked={formData.preferredContact === 'phone'}
                onChange={handleChange}
              />
              Phone
            </label>
          </fieldset>

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder="Write your message..."
            className={errors.message ? 'has-error' : ''}
            aria-invalid={errors.message ? 'true' : 'false'}
          />
          {errors.message && <p className="error">{errors.message}</p>}

          <button type="submit">Submit</button>
        </form>

        {submitted && <p className="success">Thanks — we'll get back to you soon.</p>}
      </section>
    </main>
  )
}

export default App
