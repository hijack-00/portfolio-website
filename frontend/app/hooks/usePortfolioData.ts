'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchAllPortfolioData, getCachedData, clearAllCaches } from '../utils/apiService';
import { DEFAULT_DATA } from '../utils/defaultData';

export interface PortfolioData {
    profile: any;
    about: any;
    skills: any[];
    tools: any[];
    projects: any[];
    certifications: any[];
    blogs: any[];
}

export interface UsePortfolioDataReturn {
    data: PortfolioData;
    isLoading: boolean;
    fromCache: boolean[];
    error: string | null;
    refresh: () => Promise<void>;
    clearCache: () => void;
}

/**
 * Custom hook to fetch portfolio data with stale-while-revalidate pattern
 * 
 * Features:
 * - Shows cached data immediately if available
 * - Shows default data if no cache exists
 * - Fetches fresh data in background
 * - Updates UI when fresh data arrives
 * - Retries on failure (handles Render cold starts)
 */
export function usePortfolioData(): UsePortfolioDataReturn {
    // IMPORTANT: Always initialize with DEFAULT_DATA to prevent hydration errors
    // Don't access localStorage here - it only exists on client, not during SSR
    const [data, setData] = useState<PortfolioData>({
        profile: DEFAULT_DATA.profile,
        about: DEFAULT_DATA.about,
        skills: DEFAULT_DATA.skills,
        tools: DEFAULT_DATA.tools,
        projects: DEFAULT_DATA.projects,
        certifications: DEFAULT_DATA.certifications,
        blogs: DEFAULT_DATA.blogs,
    });

    const [isLoading, setIsLoading] = useState(true);
    const [fromCache, setFromCache] = useState<boolean[]>([false, false, false, false, false, false, false]);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async (forceRefresh = false) => {
        try {
            setIsLoading(true);
            setError(null);

            const result = await fetchAllPortfolioData({ forceRefresh });

            // Update state with fresh data
            setData({
                profile: result.profile || DEFAULT_DATA.profile,
                about: result.about || DEFAULT_DATA.about,
                skills: result.skills || DEFAULT_DATA.skills,
                tools: result.tools || DEFAULT_DATA.tools,
                projects: result.projects || DEFAULT_DATA.projects,
                certifications: result.certifications || DEFAULT_DATA.certifications,
                blogs: result.blogs || DEFAULT_DATA.blogs,
            });

            setFromCache(result.fromCache);
            setIsLoading(false);

            console.log('✅ Portfolio data loaded successfully');
        } catch (err) {
            console.error('❌ Failed to fetch portfolio data:', err);
            setError(err instanceof Error ? err.message : 'Failed to load data');
            setIsLoading(false);

            // Keep displaying cached/default data even on error
        }
    }, []);

    // Fetch data on mount - ALWAYS force fresh on page load/reload
    // This runs only on client (after hydration), preventing hydration mismatch
    useEffect(() => {
        fetchData(true); // Force refresh to always get latest data on page load
    }, [fetchData]);

    // Refresh function for manual updates
    const refresh = useCallback(async () => {
        await fetchData(true);
    }, [fetchData]);

    // Clear cache function
    const clearCache = useCallback(() => {
        clearAllCaches();
        setData({
            profile: DEFAULT_DATA.profile,
            about: DEFAULT_DATA.about,
            skills: DEFAULT_DATA.skills,
            tools: DEFAULT_DATA.tools,
            projects: DEFAULT_DATA.projects,
            certifications: DEFAULT_DATA.certifications,
            blogs: DEFAULT_DATA.blogs,
        });
        console.log('🗑️ Cache cleared');
    }, []);

    return {
        data,
        isLoading,
        fromCache,
        error,
        refresh,
        clearCache,
    };
}
