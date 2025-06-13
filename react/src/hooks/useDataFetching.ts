import { useState, useEffect } from 'react';
import axios from 'axios';
import type { MOOCsData, LoadingState } from '../types';
import { API_ENDPOINTS, LOADING_STAGES, ANIMATION_DURATIONS, DEMO_DATA } from '../utils';

interface UseDataFetchingResult {
  data: MOOCsData | null;
  loading: LoadingState;
}

export const useDataFetching = (prefersReducedMotion: boolean): UseDataFetchingResult => {
  const [data, setData] = useState<MOOCsData | null>(null);
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: true,
    progress: 0,
    stage: "Initializing..."
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(prev => ({ ...prev, isLoading: true }));

        // Enhanced loading stages with progress
        for (const { stage, progress } of LOADING_STAGES) {
          setLoading(prev => ({ ...prev, stage, progress }));
          await new Promise((resolve) =>
            setTimeout(
              resolve,
              prefersReducedMotion
                ? ANIMATION_DURATIONS.LOADING_STAGE_REDUCED
                : ANIMATION_DURATIONS.LOADING_STAGE
            )
          );
        }

        const response = await axios.get<MOOCsData>(API_ENDPOINTS.MOOCS_DATA);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching MOOCs data:", error);
        setLoading(prev => ({ ...prev, stage: "Loading sample data..." }));

        // Set demo data on error
        setData(DEMO_DATA);
      } finally {
        // Final loading stage
        await new Promise((resolve) =>
          setTimeout(
            resolve,
            prefersReducedMotion
              ? ANIMATION_DURATIONS.LOADING_STAGE_REDUCED
              : ANIMATION_DURATIONS.FINAL_LOADING
          )
        );
        setLoading(prev => ({ ...prev, isLoading: false }));
      }
    };

    fetchData();
  }, [prefersReducedMotion]);

  return { data, loading };
};
