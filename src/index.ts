// Main entry point for the Aspect SDK
export { AspectClient } from './client'
export type { AspectClientConfig } from './types'

// Re-export resource classes for advanced usage
export { Assets } from './resources/assets'
export { Indexes } from './resources/indexes'
export { Users } from './resources/users'
export { Search } from './resources/search'
export { Tasks } from './resources/tasks'
export { Analyze } from './resources/analyze'

// Re-export commonly used types from the generated SDK
export type {
  IndexCreateRequest,
  IndexCreateResponse,
  IndexGetResponse,
  IndexListResponse,
  IndexUpdateRequest,
  IndexUpdateResponse,
  AssetCreateResponse,
  AssetDownloadGetResponse,
  AssetGetResponse,
  AssetListResponse,
  AssetType,
  AssetUpdateRequest,
  AssetUpdateResponse,
  FeatureInfo,
  FeatureState,
  FeatureType,
  PreviewGetResponse,
  ProxyGetResponse,
  TaskCreateRequest,
  TaskCreateResponse,
  TaskGetResponse,
  UserGetResponse,
  AnalyzeAskRequest,
  AnalyzeAskResponse,
  AnalyzeBoxCoordinate,
  AnalyzeBoxRequest,
  AnalyzeBoxResponse,
  AnalyzePointCoordinate,
  AnalyzePointRequest,
  AnalyzePointResponse
} from '../generated/src/models'

// Re-export custom types
export type { WaitForDoneOptions, TaskExtensions } from './custom/task-extensions'

// Re-export generated APIs for advanced usage
export * from '../generated/src/apis'
export * from '../generated/src/models'
export { Configuration, ConfigurationParameters } from '../generated/src/runtime'
