// Search resource - handles all search-related operations
import { SearchApi } from '../../generated/src/apis/search-api'
import { Configuration } from '../../generated/src/runtime'
import type { SearchRequest, SearchResponse } from '../../generated/src/models'

export class Search {
  private api: SearchApi

  constructor(config: Configuration) {
    this.api = new SearchApi(config)
  }

  /**
   * Search across indexed content
   */
  async run(request: SearchRequest): Promise<SearchResponse> {
    return await this.api.searchSearchRun({ searchRequest: request })
  }
}