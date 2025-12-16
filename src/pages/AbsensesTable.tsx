import { useGetAbsenses } from "../dataLayer"
import { AbsensesRow } from "../components/AbsenseRow"
import { useState } from "react";
import { UpArrowIcon, DownArrowIcon } from "@brighthr/icons";

export type Absense = {
        id: number;
        startDate: string;
        days: number;
        absenceType: string;
        employee: {
            firstName: string,
            lastName: string,
            id: string
        },
        approved: boolean
}


export default function AbsensesTable() {
    
    
    const {data: unsortedAbsensesList, isLoading, isError} = useGetAbsenses() || [];    
    const [selectedEmployeeName, setSelectedEmployeeName] = useState<string | null>(null)
    const [absensesList, setAbsensesList] = useState<Absense[]>([])
    const [activeColumn, setActiveColumn] = useState<string | null>(null)
    const [order, setOrder] = useState(false)
    
    function handleNameSort(e: React.MouseEvent<HTMLTableCellElement>) {
        let newOrder
        const fieldSet = e.currentTarget.textContent
        if(activeColumn===fieldSet) {
            newOrder = !order
        }
        else {
            newOrder = false
        }

        setOrder(newOrder)
        setActiveColumn(fieldSet)
        const sorted = [...unsortedAbsensesList].sort((a:Absense, b:Absense)=> {
        const dateA = new Date(a.startDate).getTime()
        const dateB = new Date(b.startDate).getTime()

        const endDateA = new Date(a.startDate)
        endDateA.setDate(endDateA.getDate() + a.days)

        const endDateB = new Date(b.startDate)
        endDateB.setDate(endDateB.getDate() + b.days)

        if (fieldSet.startsWith('Employee Name') && newOrder === false) {
            return a.employee.firstName.localeCompare(b.employee.firstName)
        }
        else if (fieldSet.startsWith('Start Date') && newOrder === false) {
            return dateB - dateA
        }
        else if (fieldSet.startsWith('Absense Type') && newOrder === false) {
            return a.absenceType.localeCompare(b.absenceType)
        }
        else if (fieldSet.startsWith('End Date') && newOrder === false) {
            return endDateB.getTime() - endDateA.getTime()
        }
        else if (fieldSet.startsWith('Employee Name') && newOrder === true) {
            return b.employee.firstName.localeCompare(a.employee.firstName)
        }
        else if (fieldSet.startsWith('Absense Type') && newOrder === true) {
            return b.absenceType.localeCompare(a.absenceType)
        }
        else if (fieldSet.startsWith('End Date') && newOrder === true) {
            return endDateA.getTime() - endDateB.getTime()
        }
        else if (fieldSet.startsWith('Start Date') && newOrder === true) {
            return dateA - dateB
        }
        
        return 0
    })
        setAbsensesList(sorted)
    }

    if (isLoading) {
    return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error loading absenses.</div>
    }

    function handleEmployeeClick(name: string) {
        setSelectedEmployeeName(name);
    }

  return (
    <main className=" flex flex-col items-center justify-center">
        <table className="border">
                    <thead>
                        <tr className="border-b font-semibold">
                            <td className={`border p-2 text-center cursor-pointer ${activeColumn?.startsWith('Employee Name') ? 'border-b-2 border-b-green-500' : ''}`} onClick={handleNameSort}><span className="flex items-center gap-1">Employee Name <div><UpArrowIcon color={activeColumn?.startsWith('Employee Name') && order === true ? 'green' : undefined} height={16}/><DownArrowIcon color={activeColumn?.startsWith('Employee Name') && order=== false ? 'green' : undefined} height={16}/></div></span></td>
                            <td className={`border p-2 text-center cursor-pointer ${activeColumn?.startsWith('Start Date') ? 'border-b-2 border-b-green-500' : ''}`} onClick={handleNameSort}><span className="flex items-center gap-1">Start Date <div><UpArrowIcon color={activeColumn?.startsWith('Start Date') && order === true ? 'green' : undefined} height={16}/><DownArrowIcon color={activeColumn?.startsWith('Start Date') && order=== false ? 'green' : undefined} height={16}/></div></span></td>
                            <td className={`border p-2 text-center cursor-pointer ${activeColumn?.startsWith('End Date') ? 'border-b-2 border-b-green-500' : ''}`}onClick={handleNameSort}><span className="flex items-center gap-1">End Date <div><UpArrowIcon color={activeColumn?.startsWith('End Date') && order === true ? 'green' : undefined} height={16}/><DownArrowIcon color={activeColumn?.startsWith('End Date') && order=== false ? 'green' : undefined} height={16}/></div></span></td>
                            <td className={`border p-2 text-center cursor-pointer ${activeColumn?.startsWith('Absense Type') ? 'border-b-2 border-b-green-500' : ''}`} onClick={handleNameSort}><span className="flex items-center gap-1">Absense Type <div><UpArrowIcon color={activeColumn?.startsWith('Absense Type') && order === true ? 'green' : undefined} height={16}/><DownArrowIcon color={activeColumn?.startsWith('Absense Type') && order=== false ? 'green' : undefined} height={16}/></div></span></td>
                            <td className="border p-2 text-center">Approved/Pending Approval</td>
                        </tr>
                    </thead>
        <tbody>
            {(absensesList.length > 0 ? absensesList : unsortedAbsensesList || []).map( (absense: Absense) => (
                <AbsensesRow absense={absense} key={absense.id} onEmployeeClick={handleEmployeeClick} selectedEmployeeName={selectedEmployeeName} />
            ))}       
        </tbody>
        </table>
    </main>
  )
}