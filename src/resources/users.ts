// Users resource - handles all user-related operations
import { UsersApi } from '../../generated/src/apis/users-api'
import { Configuration } from '../../generated/src/runtime'
import type { UserGetResponse } from '../../generated/src/models'

export class Users {
  private api: UsersApi

  constructor(config: Configuration) {
    this.api = new UsersApi(config)
  }

  /**
   * Get current user information
   */
  async getCurrentUser(): Promise<UserGetResponse> {
    return await this.api.usersUsersMe()
  }

  /**
   * Alias for getCurrentUser
   */
  async me(): Promise<UserGetResponse> {
    return this.getCurrentUser()
  }
}