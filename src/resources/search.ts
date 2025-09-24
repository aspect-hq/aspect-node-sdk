// Search resource - handles all search-related operations
import { SearchApi } from '../../generated/src/apis/search-api'
import { Configuration } from '../../generated/src/runtime'

export class Search {
  private api: SearchApi

  constructor(config: Configuration) {
    this.api = new SearchApi(config)
  }

  /**
   * Search across indexed content
   */
  async query(): Promise<any> {
    return await this.api.searchSearch()
  }
}