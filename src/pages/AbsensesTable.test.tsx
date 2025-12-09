import {screen, render} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AbsensesTable from './AbsensesTable';
import '@testing-library/jest-dom/jest-globals'



jest.mock('../dataLayer', () => ({
    useGetAbsenses: () => ({
        data: [
            {
                id: 1,
                startDate: '2023-01-01',
                days: 5,
                absenceType: 'Vacation',
                employee: {
                    firstName: 'John', 
                    lastName: 'Doe',
                    id: 'emp1'
                },
            },
            {
                id: 1,
                startDate: '2023-01-01',
                days: 5,
                absenceType: 'Vacation',
                employee: {
                    firstName: 'Bart', 
                    lastName: 'Simpson',
                    id: 'emp1'
                },
            }
        ],
        isLoading: false,
        isError: false
    }),
    useGetAbsenseConflicts: (id: number) => ({
        data: {conflicts: false}
    })  
}));

describe('AbsensesTable', () => {
    it('displays absense data', () => {
        const queryClient = new QueryClient();
        
        render(
            <QueryClientProvider client={queryClient}>
                <AbsensesTable />
            </QueryClientProvider>
        );
        screen.debug()
        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
});