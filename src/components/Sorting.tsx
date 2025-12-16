import { SortArrowsIcon } from '@brighthr/icons';

export default function Sorting({sortBy, setSortBy, order, setOrder} : {sortBy:string, setSortBy:(value:string)=>void, order:boolean, setOrder:(value:boolean)=>void}) {
    
    function handleChange(value: string) {
        setSortBy(value)
    }

    function handleOrderChange() {
        setOrder(!order)
    }
    
    return (
        <div className="flex gap-3">
            <label className="text-lg">
                <span>Sort by:</span>
                <select value={sortBy} className="border ml-2 bg-gray-200 hover:cursor-pointer" onChange={e => handleChange(e.currentTarget.value)}>
                    <option value="Start Date">Start Date</option>
                    <option value="End Date">End Date</option>
                    <option value="Absense Type">Absense Type</option>
                    <option value="Name">Name</option>
                </select>
            </label>
            <button className='w-6 border font-semibold hover:bg-gray-200 hover:cursor-pointer' onClick={handleOrderChange}><SortArrowsIcon /></button>
        </div>
    )
}