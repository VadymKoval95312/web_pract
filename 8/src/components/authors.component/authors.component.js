import { useEffect, useState } from "react"
import { getAuthors } from "../../services/blogService"
import { AuthorCard } from "./authorCard.component"
import styles from "./authors.module.css"

export const AuthorsComponent = () => {
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    getAuthors().then((data) => setAuthors(data))
  }, [])

  return (
    <div className={styles.page}>
      <h1>Authors page</h1>
      <div className={styles.list}>
        {authors.map((a) => (
          <AuthorCard key={a.id} author={a} />
        ))}
      </div>
    </div>
  )
}
