// API Configuration
const API_CONFIG = {
    BASE_URL: 'https://portfolio-website-i30p.onrender.com/api',
    CACHE_VERSION: 'v1', // Increment this to invalidate all caches
    CACHE_DURATION: 5 * 60 * 1000, // 5 minutes in milliseconds
    MAX_RETRIES: 5,
    RETRY_DELAY: 4000, // 4 seconds
    REQUEST_TIMEOUT: 30000, // 30 seconds
};

// Cache key helper
const getCacheKey = (endpoint: string) => {
    return `portfolio_${API_CONFIG.CACHE_VERSION}_${endpoint}`;
};

// Cache timestamp key
const getCacheTimestampKey = (endpoint: string) => {
    return `${getCacheKey(endpoint)}_timestamp`;
};

// Check if cache is still valid
const isCacheValid = (endpoint: string): boolean => {
    try {
        const timestamp = localStorage.getItem(getCacheTimestampKey(endpoint));
        if (!timestamp) return false;

        const age = Date.now() - parseInt(timestamp, 10);
        return age < API_CONFIG.CACHE_DURATION;
    } catch {
        return false;
    }
};

// Get cached data
export const getCachedData = (endpoint: string): any | null => {
    try {
        const cached = localStorage.getItem(getCacheKey(endpoint));
        if (!cached) return null;

        return JSON.parse(cached);
    } catch (error) {
        console.warn(`Failed to read cache for ${endpoint}:`, error);
        return null;
    }
};

// Set cached data
const setCachedData = (endpoint: string, data: any): void => {
    try {
        localStorage.setItem(getCacheKey(endpoint), JSON.stringify(data));
        localStorage.setItem(getCacheTimestampKey(endpoint), Date.now().toString());
    } catch (error) {
        console.warn(`Failed to cache data for ${endpoint}:`, error);
        // Clear old caches if storage is full
        clearOldCaches();
    }
};

// Clear old caches
const clearOldCaches = (): void => {
    try {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith('portfolio_') && !key.includes(API_CONFIG.CACHE_VERSION)) {
                localStorage.removeItem(key);
            }
        });
    } catch (error) {
        console.warn('Failed to clear old caches:', error);
    }
};

// Clear all portfolio caches
export const clearAllCaches = (): void => {
    try {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith('portfolio_')) {
                localStorage.removeItem(key);
            }
        });
    } catch (error) {
        console.warn('Failed to clear caches:', error);
    }
};

// Fetch with timeout
const fetchWithTimeout = (url: string, timeout: number = API_CONFIG.REQUEST_TIMEOUT): Promise<Response> => {
    return Promise.race([
        fetch(url),
        new Promise<Response>((_, reject) =>
            setTimeout(() => reject(new Error('Request timeout')), timeout)
        )
    ]);
};

// Fetch with retry logic
const fetchWithRetry = async (
    url: string,
    retries: number = API_CONFIG.MAX_RETRIES
): Promise<any> => {
    try {
        const response = await fetchWithTimeout(url);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.warn(`Fetch attempt failed for ${url}:`, error);

        if (retries > 0) {
            console.log(`Retrying... (${retries} attempts remaining)`);
            await new Promise(resolve => setTimeout(resolve, API_CONFIG.RETRY_DELAY));
            return fetchWithRetry(url, retries - 1);
        }

        throw error;
    }
};

// Main API fetch function with caching
export const fetchFromAPI = async (
    endpoint: string,
    options: {
        useCache?: boolean;
        forceRefresh?: boolean;
    } = {}
): Promise<{
    data: any;
    fromCache: boolean;
    timestamp: number;
}> => {
    const { useCache = true, forceRefresh = false } = options;
    const url = `${API_CONFIG.BASE_URL}/${endpoint}`;

    // If force refresh is not requested and cache is valid, return cached data
    if (!forceRefresh && useCache && isCacheValid(endpoint)) {
        const cachedData = getCachedData(endpoint);
        if (cachedData !== null) {
            console.log(`✅ Using cached data for ${endpoint}`);
            return {
                data: cachedData,
                fromCache: true,
                timestamp: Date.now()
            };
        }
    }

    try {
        console.log(`🔄 Fetching fresh data for ${endpoint}...`);
        const freshData = await fetchWithRetry(url);

        // Cache the fresh data
        if (useCache) {
            setCachedData(endpoint, freshData);
        }

        console.log(`✅ Fresh data received for ${endpoint}`);
        return {
            data: freshData,
            fromCache: false,
            timestamp: Date.now()
        };
    } catch (error) {
        console.error(`❌ Failed to fetch ${endpoint}:`, error);

        // If fetch fails, try to return stale cache
        const staleCache = getCachedData(endpoint);
        if (staleCache !== null) {
            console.warn(`⚠️ Using stale cache for ${endpoint}`);
            return {
                data: staleCache,
                fromCache: true,
                timestamp: Date.now()
            };
        }

        throw error;
    }
};

// Fetch all portfolio data
export const fetchAllPortfolioData = async (): Promise<{
    profile: any;
    about: any;
    skills: any[];
    tools: any[];
    projects: any[];
    certifications: any[];
    blogs: any[];
    fromCache: boolean[];
}> => {
    const endpoints = ['profile', 'about', 'skills', 'tools', 'projects', 'certifications', 'blog'];

    const results = await Promise.all(
        endpoints.map(endpoint =>
            fetchFromAPI(endpoint).catch(error => {
                console.error(`Error fetching ${endpoint}:`, error);
                return { data: null, fromCache: false, timestamp: Date.now() };
            })
        )
    );

    return {
        profile: results[0].data,
        about: results[1].data,
        skills: results[2].data || [],
        tools: results[3].data || [],
        projects: results[4].data || [],
        certifications: results[5].data || [],
        blogs: results[6].data || [],
        fromCache: results.map(r => r.fromCache)
    };
};
