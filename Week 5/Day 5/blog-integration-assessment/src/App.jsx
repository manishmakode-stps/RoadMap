import { useState } from 'react'
import './App.css'

const users = [
  {
    id: 1,
    name: 'Aarav Sharma',
    role: 'Frontend Developer',
    bio: 'Builds reusable UI components and focuses on UX quality.',
  },
  {
    id: 2,
    name: 'Maya Patel',
    role: 'Content Writer',
    bio: 'Writes product stories and keeps blog content engaging.',
  },
  {
    id: 3,
    name: 'Rohan Mehta',
    role: 'QA Engineer',
    bio: 'Tests features, tracks edge cases, and improves reliability.',
  },
]

const initialPosts = [
  {
    id: 101,
    authorId: 1,
    title: 'React State Patterns',
    body: 'Use local state where possible and lift state only when multiple components need shared data.',
    likes: 2,
    comments: [
      { id: 1, name: 'Maya', text: 'Great summary, especially the shared state point.' },
    ],
  },
  {
    id: 102,
    authorId: 2,
    title: 'Writing Better Component Docs',
    body: 'Document component props with examples so other developers can integrate faster.',
    likes: 4,
    comments: [],
  },
]

function App() {
  const [selectedUserId, setSelectedUserId] = useState(users[0].id)
  const [posts, setPosts] = useState(initialPosts)
  const [postForm, setPostForm] = useState({
    authorId: users[0].id,
    title: '',
    body: '',
  })
  const [postErrors, setPostErrors] = useState({})
  const [commentForms, setCommentForms] = useState({})
  const [commentErrors, setCommentErrors] = useState({})

  const selectedUser = users.find((user) => user.id === Number(selectedUserId))

  function handlePostChange(event) {
    const { name, value } = event.target
    setPostForm((prev) => ({ ...prev, [name]: value }))
  }

  function validatePostForm(data) {
    const errors = {}

    if (!data.title.trim()) {
      errors.title = 'Title is required.'
    } else if (data.title.trim().length < 5) {
      errors.title = 'Title must be at least 5 characters.'
    }

    if (!data.body.trim()) {
      errors.body = 'Content is required.'
    } else if (data.body.trim().length < 15) {
      errors.body = 'Content must be at least 15 characters.'
    }

    return errors
  }

  function handlePostSubmit(event) {
    event.preventDefault()
    const errors = validatePostForm(postForm)
    setPostErrors(errors)

    if (Object.keys(errors).length > 0) {
      return
    }

    const newPost = {
      id: Date.now(),
      authorId: Number(postForm.authorId),
      title: postForm.title.trim(),
      body: postForm.body.trim(),
      likes: 0,
      comments: [],
    }

    setPosts((prev) => [newPost, ...prev])
    setPostForm({ authorId: selectedUserId, title: '', body: '' })
  }

  function handleLike(postId) {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post,
      ),
    )
  }

  function handleCommentInputChange(postId, field, value) {
    setCommentForms((prev) => ({
      ...prev,
      [postId]: {
        ...(prev[postId] || { name: '', text: '' }),
        [field]: value,
      },
    }))
  }

  function validateCommentForm(data) {
    const errors = {}

    if (!data.name || !data.name.trim()) {
      errors.name = 'Name is required.'
    }
    if (!data.text || !data.text.trim()) {
      errors.text = 'Comment is required.'
    } else if (data.text.trim().length < 4) {
      errors.text = 'Comment should be at least 4 characters.'
    }

    return errors
  }

  function handleCommentSubmit(event, postId) {
    event.preventDefault()
    const currentForm = commentForms[postId] || { name: '', text: '' }
    const errors = validateCommentForm(currentForm)

    setCommentErrors((prev) => ({ ...prev, [postId]: errors }))

    if (Object.keys(errors).length > 0) {
      return
    }

    const newComment = {
      id: Date.now(),
      name: currentForm.name.trim(),
      text: currentForm.text.trim(),
    }

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post,
      ),
    )

    setCommentForms((prev) => ({
      ...prev,
      [postId]: { name: '', text: '' },
    }))
    setCommentErrors((prev) => ({ ...prev, [postId]: {} }))
  }

  return (
    <main className="page">
      <header>
        <h1>Mini Blog</h1>
        <p>A small demo — posts, comments, and profiles.</p>
      </header>

      <section className="user-panel panel">
        <h2>User Profile</h2>
        <label htmlFor="profile-select">Select User</label>
        <select
          id="profile-select"
          value={selectedUserId}
          onChange={(event) => {
            const id = Number(event.target.value)
            setSelectedUserId(id)
            setPostForm((prev) => ({ ...prev, authorId: id }))
          }}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <div className="profile-card">
          <h3>{selectedUser.name}</h3>
          <p className="role">{selectedUser.role}</p>
          <p>{selectedUser.bio}</p>
        </div>
      </section>

      <section className="panel">
        <h2>Create Post</h2>
        <form onSubmit={handlePostSubmit} className="form-grid" noValidate>
          <label htmlFor="post-title">Title</label>
          <input
            id="post-title"
            name="title"
            value={postForm.title}
            onChange={handlePostChange}
            placeholder="Post title"
          />
          {postErrors.title && <p className="error">{postErrors.title}</p>}

          <label htmlFor="post-body">Content</label>
          <textarea
            id="post-body"
            name="body"
            value={postForm.body}
            onChange={handlePostChange}
            rows={4}
            placeholder="Write your post content..."
          />
          {postErrors.body && <p className="error">{postErrors.body}</p>}

          <button type="submit">Publish Post</button>
        </form>
      </section>

      <section className="panel">
        <h2>Posts & Comments</h2>
        <div className="post-list">
          {posts.map((post) => {
            const author = users.find((user) => user.id === post.authorId)
            const currentForm = commentForms[post.id] || { name: '', text: '' }
            const currentErrors = commentErrors[post.id] || {}

            return (
              <article key={post.id} className="post-card">
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <p className="meta">
                  By {author?.name} | Likes: {post.likes}
                </p>
                <button type="button" onClick={() => handleLike(post.id)}>
                  Like
                </button>

                <div className="comments">
                  <h4>Comments</h4>
                  {post.comments.length === 0 ? (
                    <p className="muted">No comments yet.</p>
                  ) : (
                    post.comments.map((comment) => (
                      <p key={comment.id} className="comment">
                        <strong>{comment.name}:</strong> {comment.text}
                      </p>
                    ))
                  )}

                  <form
                    className="comment-form"
                    onSubmit={(event) => handleCommentSubmit(event, post.id)}
                    noValidate
                  >
                    <input
                      type="text"
                      placeholder="Your name"
                      value={currentForm.name}
                      onChange={(event) =>
                        handleCommentInputChange(post.id, 'name', event.target.value)
                      }
                    />
                    {currentErrors.name && <p className="error">{currentErrors.name}</p>}
                    <input
                      type="text"
                      placeholder="Write a comment"
                      value={currentForm.text}
                      onChange={(event) =>
                        handleCommentInputChange(post.id, 'text', event.target.value)
                      }
                    />
                    {currentErrors.text && <p className="error">{currentErrors.text}</p>}
                    <button type="submit">Add Comment</button>
                  </form>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}

export default App
