import type { TaskGetResponse, FeatureState, FeatureInfo } from '../../generated/src/models'

export interface WaitForDoneOptions {
  /**
   * Polling interval in milliseconds (default: 2000)
   */
  interval?: number
  
  /**
   * Callback function called on each poll with the current task state
   */
  callback?: (task: TaskGetResponse) => void
}

export interface TaskExtensions {
  /**
   * Polls a task until all features are either completed or failed
   * @param taskId The ID of the task to poll
   * @param options Polling options including interval and callback
   * @returns Promise that resolves with the final TaskSchema when all features are done
   */
  waitForDone(taskId: string, options?: WaitForDoneOptions): Promise<TaskGetResponse>
}

/**
 * Checks if all features in a task are in a final state (not queued or processing)
 */
export function areAllFeaturesDone(task: TaskGetResponse): boolean {
  const nonFinalStates: FeatureState[] = ['queued', 'processing']
  
  return !Object.values(task.features).some((featureInfo: FeatureInfo) => 
    nonFinalStates.includes(featureInfo.state)
  )
}

/**
 * Creates a promise that resolves after the specified number of milliseconds
 */
export function delay(milliseconds: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
