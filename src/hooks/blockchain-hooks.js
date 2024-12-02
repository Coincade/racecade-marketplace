'use client'

import { useQuery } from "@tanstack/react-query"
import { getMarketId } from "@/actions/blockchain"

export function useMarketId(tokenId) {
    return useQuery({
      // Unique query key with tokenId
      queryKey: ['marketId', tokenId],
      
      // Query function to fetch market ID
      queryFn: async() => await getMarketId(tokenId),
      
      // Only run query if tokenId is provided
      enabled: !!tokenId,
      
      // Caching strategy
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      
      // Optional: Retry logic
      retry: 1,
      
      // Transform error for better handling
      onError: (error) => {
        console.error('Failed to fetch market ID:', error)
      }
    })
  }