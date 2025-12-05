import { useQuery } from "@tanstack/react-query";

export const useGetAbsenses = () => {
  const data = useQuery({
    queryKey: ['absenses'],
    queryFn: () => //getCompanyCustomPayslipTemplates(companyId),
  });
  return data;
};