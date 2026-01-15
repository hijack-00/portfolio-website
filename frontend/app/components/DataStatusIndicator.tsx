'use client';

import { useEffect, useState } from 'react';

interface DataStatusIndicatorProps {
    isLoading: boolean;
    fromCache: boolean[];
    onRefresh?: () => void;
}

export default function DataStatusIndicator({
    isLoading,
    fromCache,
    onRefresh
}: DataStatusIndicatorProps) {
    const [showIndicator, setShowIndicator] = useState(true);
    const [progress, setProgress] = useState(0);

    const allFromCache = fromCache.every(cached => cached);
    const someFromCache = fromCache.some(cached => cached);
    const noneFromCache = fromCache.every(cached => !cached);

    useEffect(() => {
        if (isLoading) {
            setProgress(0);
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 90) return prev;
                    return prev + 10;
                });
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setProgress(100);
            // Hide indicator after data loads successfully
            setTimeout(() => setShowIndicator(false), 5000);
        }
    }, [isLoading]);

    // Don't show if data is loaded and indicator timeout has passed
    if (!showIndicator && !isLoading) {
        return null;
    }

    return (
        <div className="fixed top-20 right-4 z-40 max-w-sm">
            <div className="bg-black/95 border border-green-400/60 p-4 rounded-none backdrop-blur-md shadow-lg">
                <div className="flex items-start gap-3">
                    {/* Status Icon */}
                    <div className="flex-shrink-0">
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
                        ) : noneFromCache ? (
                            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        )}
                    </div>

                    {/* Status Message */}
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-green-300">
                            {isLoading ? (
                                <span className="animate-pulse">Initializing server...</span>
                            ) : allFromCache ? (
                                'Using cached data'
                            ) : noneFromCache ? (
                                'Live data loaded'
                            ) : (
                                'Partially loaded'
                            )}
                        </div>
                        <div className="text-xs text-green-400 mt-1">
                            {isLoading ? (
                                <>Waking up Render server (this may take up to 40s)</>
                            ) : allFromCache ? (
                                <>Showing saved data from previous visit</>
                            ) : noneFromCache ? (
                                <>All data synced from server</>
                            ) : (
                                <>Some data from cache, updating in background</>
                            )}
                        </div>

                        {/* Progress Bar */}
                        {isLoading && (
                            <div className="w-full bg-green-900/30 h-1.5 rounded-none mt-2">
                                <div
                                    className="bg-gradient-to-r from-green-500 to-green-300 h-1.5 rounded-none transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex-shrink-0 flex gap-2">
                        {!isLoading && onRefresh && (
                            <button
                                onClick={onRefresh}
                                className="text-green-400 hover:text-green-300 transition-colors"
                                title="Refresh data"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </button>
                        )}
                        <button
                            onClick={() => setShowIndicator(false)}
                            className="text-green-400/60 hover:text-green-400 transition-colors"
                            title="Close"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
