/**
 * Portfolio Cache Debug Utilities
 * 
 * Paste this into your browser console for easy cache debugging
 * Works with the stale-while-revalidate implementation
 */

window.portfolioDebug = {

    /**
     * View all cached portfolio data
     */
    viewCache() {
        console.group('📦 Portfolio Cache Contents');
        const cacheKeys = Object.keys(localStorage).filter(k => k.startsWith('portfolio_'));

        if (cacheKeys.length === 0) {
            console.log('❌ No cache found');
            console.groupEnd();
            return;
        }

        cacheKeys.forEach(key => {
            if (key.includes('_timestamp')) {
                const timestamp = parseInt(localStorage.getItem(key), 10);
                const date = new Date(timestamp);
                const age = Math.round((Date.now() - timestamp) / 1000 / 60);
                console.log(`⏱️  ${key}: ${date.toLocaleString()} (${age} min ago)`);
            } else {
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    console.log(`📄 ${key}:`, data);
                } catch (e) {
                    console.log(`❌ ${key}: (parse error)`);
                }
            }
        });

        console.groupEnd();
    },

    /**
     * Get cache statistics
     */
    stats() {
        const cacheKeys = Object.keys(localStorage).filter(k => k.startsWith('portfolio_') && !k.includes('_timestamp'));
        const timestamps = Object.keys(localStorage).filter(k => k.startsWith('portfolio_') && k.includes('_timestamp'));

        console.group('📊 Cache Statistics');
        console.log(`Total cached endpoints: ${cacheKeys.length}`);
        console.log(`Total storage keys: ${cacheKeys.length + timestamps.length}`);

        let totalSize = 0;
        cacheKeys.forEach(key => {
            const value = localStorage.getItem(key);
            totalSize += value ? value.length : 0;
        });

        console.log(`Approximate size: ${(totalSize / 1024).toFixed(2)} KB`);

        // Check cache age
        if (timestamps.length > 0) {
            const ages = timestamps.map(key => {
                const timestamp = parseInt(localStorage.getItem(key), 10);
                return Math.round((Date.now() - timestamp) / 1000 / 60);
            });
            const avgAge = ages.reduce((a, b) => a + b, 0) / ages.length;
            const oldestAge = Math.max(...ages);

            console.log(`Average cache age: ${avgAge.toFixed(1)} minutes`);
            console.log(`Oldest cache: ${oldestAge} minutes`);
        }

        console.groupEnd();
    },

    /**
     * Clear all portfolio caches
     */
    clearCache() {
        const keys = Object.keys(localStorage).filter(k => k.startsWith('portfolio_'));
        keys.forEach(key => localStorage.removeItem(key));
        console.log(`✅ Cleared ${keys.length} cache entries`);
    },

    /**
     * Clear specific endpoint cache
     */
    clearEndpoint(endpoint) {
        const keys = Object.keys(localStorage).filter(k => k.includes(endpoint));
        keys.forEach(key => localStorage.removeItem(key));
        console.log(`✅ Cleared cache for: ${endpoint} (${keys.length} keys)`);
    },

    /**
     * Test cache validity
     */
    checkValidity() {
        console.group('✅ Cache Validity Check');
        const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
        const timestamps = Object.keys(localStorage).filter(k => k.startsWith('portfolio_') && k.includes('_timestamp'));

        timestamps.forEach(key => {
            const timestamp = parseInt(localStorage.getItem(key), 10);
            const age = Date.now() - timestamp;
            const endpoint = key.replace('portfolio_v1_', '').replace('_timestamp', '');
            const isValid = age < CACHE_DURATION;

            console.log(
                `${isValid ? '✅' : '❌'} ${endpoint}: ${isValid ? 'VALID' : 'EXPIRED'} (${Math.round(age / 1000 / 60)}min old)`
            );
        });

        console.groupEnd();
    },

    /**
     * View specific endpoint data
     */
    viewEndpoint(endpoint) {
        const key = `portfolio_v1_${endpoint}`;
        const timestampKey = `${key}_timestamp`;

        console.group(`📄 ${endpoint.toUpperCase()} Data`);

        const data = localStorage.getItem(key);
        const timestamp = localStorage.getItem(timestampKey);

        if (!data) {
            console.log('❌ No data cached for this endpoint');
            console.groupEnd();
            return;
        }

        try {
            console.log('Data:', JSON.parse(data));
            if (timestamp) {
                const date = new Date(parseInt(timestamp, 10));
                const age = Math.round((Date.now() - parseInt(timestamp, 10)) / 1000 / 60);
                console.log(`Cached: ${date.toLocaleString()} (${age} minutes ago)`);
            }
        } catch (e) {
            console.error('Parse error:', e);
        }

        console.groupEnd();
    },

    /**
     * Simulate cold start by clearing cache and reloading
     */
    simulateColdStart() {
        console.log('🔄 Simulating cold start...');
        this.clearCache();
        console.log('♻️  Reloading page in 2 seconds...');
        setTimeout(() => window.location.reload(), 2000);
    },

    /**
     * Export cache data
     */
    exportCache() {
        const cache = {};
        const keys = Object.keys(localStorage).filter(k => k.startsWith('portfolio_'));

        keys.forEach(key => {
            try {
                cache[key] = JSON.parse(localStorage.getItem(key));
            } catch {
                cache[key] = localStorage.getItem(key);
            }
        });

        console.log('📤 Cache export:');
        console.log(JSON.stringify(cache, null, 2));
        return cache;
    },

    /**
     * Import cache data
     */
    importCache(cacheData) {
        Object.keys(cacheData).forEach(key => {
            const value = typeof cacheData[key] === 'string'
                ? cacheData[key]
                : JSON.stringify(cacheData[key]);
            localStorage.setItem(key, value);
        });
        console.log(`✅ Imported ${Object.keys(cacheData).length} cache entries`);
    },

    /**
     * Show help
     */
    help() {
        console.log(`
%c📚 Portfolio Cache Debug Utilities

%cAvailable Commands:
  portfolioDebug.viewCache()         - View all cached data
  portfolioDebug.stats()              - Show cache statistics
  portfolioDebug.clearCache()         - Clear all caches
  portfolioDebug.clearEndpoint(name)  - Clear specific endpoint
  portfolioDebug.checkValidity()      - Check if caches are valid
  portfolioDebug.viewEndpoint(name)   - View specific endpoint data
  portfolioDebug.simulateColdStart()  - Clear cache and reload
  portfolioDebug.exportCache()        - Export cache as JSON
  portfolioDebug.importCache(data)    - Import cache from JSON
  portfolioDebug.help()               - Show this help

%cExamples:
  portfolioDebug.viewEndpoint('projects')
  portfolioDebug.clearEndpoint('skills')
  portfolioDebug.stats()

%cTip: All functions log results to console
    `,
            'color: #00ff00; font-size: 16px; font-weight: bold;',
            'color: #00ff00;',
            'color: #00cc00;',
            'color: #888;'
        );
    }
};

// Auto-show help on load
console.log('%c💡 Portfolio Debug Utilities Loaded!', 'color: #00ff00; font-size: 14px; font-weight: bold;');
console.log('%cType portfolioDebug.help() for available commands', 'color: #00cc00;');

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.portfolioDebug;
}
