import { useGetAbsenseConflicts } from "../dataLayer";
import type { FC } from 'react';
import type { Absense } from "../pages/AbsensesTable";

export const AbsensesRow: FC<{absense: Absense}> = ({absense}) => {

    const {data: {conflicts}, isPending} = useGetAbsenseConflicts(absense.id);

    if (isPending) {
        return <tr><td colSpan={5} className="border p-2 text-center">Loading...</td></tr>
    }
    
    const startDate = new Date(absense.startDate)
    const endDate = new Date(absense.startDate)
    endDate.setDate(endDate.getDate() + absense.days)
    
    return (        
    <tr className={`${conflicts ? "bg-red-200" : ""} border-r`} key={absense.id}>
        <td className="border p-2 text-center">{`${absense.employee.firstName} ${absense.employee.lastName}`}</td>
        <td className="border p-2 text-center">{startDate.toLocaleDateString()}</td>
        <td className="border p-2 text-center">{endDate.toLocaleDateString()}</td>
        <td className="border p-2 text-center">{absense.absenceType}</td>
        <td className="border p-2 text-center">{absense.approved ? "Approved" : "Pending Approval"}</td>
    </tr>
           
    )
}