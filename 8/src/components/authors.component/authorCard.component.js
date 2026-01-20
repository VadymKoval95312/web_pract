import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getPostsByAuthorId } from "../../services/blogService"
import styles from "./authors.module.css"

export const AuthorCard = ({ author }) => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const toggle = async () => {
    setError("")
    const next = !open
    setOpen(next)

    if (next && posts.length === 0) {
      try {
        setLoading(true)
        const data = await getPostsByAuthorId(author.id)
        setPosts(Array.isArray(data) ? data : [])
      } catch (e) {
        setError("Failed to load posts")
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <div>
          <div className={styles.name}>{author.name}</div>
          <div className={styles.meta}>{author.email}</div>
        </div>

        <button className={styles.btn} onClick={toggle}>
          {open ? "Hide" : "Show"} posts
        </button>
      </div>

      {open && (
        <div className={styles.postsBlock}>
          {loading && <div className={styles.smallState}>Loading…</div>}
          {!loading && error && <div className={styles.smallState}>{error}</div>}

          {!loading && !error && posts.length === 0 && (
            <div className={styles.smallState}>No posts</div>
          )}

          {!loading && !error && posts.length > 0 && (
            <ul className={styles.postsList}>
              {posts.map((p) => (
                <li key={p.id} className={styles.postRow}>
                  <span className={styles.postTitle}>{p.title}</span>
                  <button
                    className={styles.btnOutline}
                    onClick={() => navigate(`/posts/${p.id}`)}
                  >
                    open
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
