import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

function SearchBox() {
    const navigate = useNavigate()
    const { keyword: urlKeyword } = useParams()
    const [keyword, setKeyword] = useState(urlKeyword || '')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    }

  return (
    <form className="itemSearch" onSubmit={submitHandler}>
        <input type="text" name="q" onChange={(e) => setKeyword(e.target.value)} className="form-control" 
        value={keyword} placeholder="Search Products..." />
        <button type="submit" className="button">Search</button>
    </form>
  )
}

export default SearchBox