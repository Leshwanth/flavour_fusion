import { useState } from "react"
import api from "../api/axios"
import RecipeCard from "../components/RecipeCard"

const Search = () => {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const [searched, setSearched] = useState(false)

    const handleSearch = async (e) => {
        e.preventDefault()
        const res = await api.get(`/recipe?q=${encodeURIComponent(query)}`)
        setResults(res.data.recipes)
        setSearched(true)
    }

    return (
        <div className="px-8 py-6">
            <form onSubmit={handleSearch} className="flex gap-2 mb-6 max-w-lg">
                <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search recipes..."
                    className="border rounded-lg px-3 py-2 flex-1"
                />
                <button className="bg-primary text-white px-4 py-2 rounded-lg">Search</button>
            </form>

            {searched && <p className="text-sm text-gray-500 mb-4">Found {results.length} results for "{query}"</p>}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {results.map(r => <RecipeCard key={r._id} recipe={r} />)}
            </div>
        </div>
    )
}

export default Search
