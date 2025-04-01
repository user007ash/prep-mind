
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const useTestResults = (user) => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestResults = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('test_results')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setTestResults(data || []);
      } catch (error) {
        console.error("Error fetching test results:", error);
        toast.error("Failed to load your test results");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchTestResults();
    }

    // Set up real-time subscription to test_results table
    if (user) {
      const channel = supabase
        .channel('public:test_results')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'test_results',
            filter: `user_id=eq.${user.id}`
          },
          (payload) => {
            // When a new test result is inserted, update the state
            setTestResults(prevResults => [payload.new, ...prevResults]);
            toast.success("New test results available!");
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  return { testResults, loading };
};

export default useTestResults;
