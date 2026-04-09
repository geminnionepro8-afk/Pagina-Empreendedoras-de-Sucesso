import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useSiteConfig = () => {
  return useQuery({
    queryKey: ["site_config"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_config")
        .select("id, value");
        
      if (error) {
        console.error("Erro ao carregar configuracoes globais:", error);
        return {} as Record<string, string>;
      }

      // Converte array num dicionario Record<string, string> para acesso rapido: configs.selo_footer
      return (data || []).reduce((acc, curr) => {
        acc[curr.id] = curr.value;
        return acc;
      }, {} as Record<string, string>);
    },
    staleTime: 1000 * 10, // Sincronização rápida (10 segundos) para que as mudanças no Admin apareçam logo
  });
};
