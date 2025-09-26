// Types for the user-facing SDK

export interface AspectConfig {
  /**
   * Base URL for the Aspect API
   * @default "https://api.aspect.inc"
   */
  baseUrl?: string
  
  /**
   * API key for authentication
   */
  apiKey: string
  
  /**
   * Request timeout in milliseconds
   * @default 30000
   */
  timeout?: number
}
