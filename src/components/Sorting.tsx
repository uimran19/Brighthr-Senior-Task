export default function Sorting({sortBy, setSortBy}) {
    
    function handleChange(value: string) {
        setSortBy(value)
    }
    
    return (
        <label className="text-lg">
            <span>Sort by:</span>
            <select value={sortBy} className="border ml-2 bg-gray-200" onChange={e => handleChange(e.currentTarget.value)}>
                <option value="Start Date">Start Date</option>
                <option value="End Date">End Date</option>
                <option value="Absense Type">Absense Type</option>
                <option value="Name">Name</option>
            </select>
        </label>
    )
}