
export default function Sorting() {
    return (
        <label className="text-lg">
            <span>Sort by:</span>
            <select className="border ml-2 bg-gray-200">
                <option value="Date">Date</option>
                <option value="Absense Type">Absense Type</option>
                <option value="Name">Name</option>
            </select>
        </label>
    )
}