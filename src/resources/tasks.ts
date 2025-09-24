// Tasks resource - handles all task-related operations
import { TasksApi } from '../../generated/src/apis/tasks-api'
import { Configuration } from '../../generated/src/runtime'
import type { TaskCreateRequest, TaskCreateResponse, TaskGetResponse } from '../../generated/src/models'
import type { WaitForDoneOptions, TaskExtensions } from '../custom/task-extensions'
import { areAllFeaturesDone, delay } from '../custom/task-extensions'

export class Tasks implements TaskExtensions {
  private api: TasksApi

  constructor(config: Configuration) {
    this.api = new TasksApi(config)
  }

  /**
   * Create a new task
   */
  async create(taskData: TaskCreateRequest): Promise<TaskCreateResponse> {
    return await this.api.tasksTasks({ taskCreateRequest: taskData })
  }

  /**
   * Get a task
   */
  async get(taskId: string): Promise<TaskGetResponse> {
    return await this.api.tasksTasksTaskId({ taskId })
  }

  /**
   * Polls a task until all features are either completed or failed
   * @param taskId The ID of the task to poll
   * @param options Polling options including interval and callback
   * @returns Promise that resolves with the final TaskSchema when all features are done
   */
  async waitForDone(taskId: string, options: WaitForDoneOptions = {}): Promise<TaskGetResponse> {
    const { interval = 5000, callback } = options

    while (true) {
      console.log('Polling task...')
      const currentTask = await this.get(taskId)
      console.log('task', currentTask)
      
      // Call the callback if provided
      if (callback) {
        callback(currentTask)
      }

      // Check if all features are in a final state
      console.log('areAllFeaturesDone', areAllFeaturesDone(currentTask))
      if (areAllFeaturesDone(currentTask)) {
        return currentTask
      }

      console.log('waiting for interval...')

      // Wait for the specified interval before polling again
      await delay(interval)
    }
  }
}