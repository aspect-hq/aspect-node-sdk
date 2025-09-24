// Indexes resource - handles all index-related operations  
import { IndexesApi } from '../../generated/src/apis/indexes-api'
import { Configuration } from '../../generated/src/runtime'
import type {
  IndexGetResponse,
  IndexListResponse,
  IndexCreateRequest,
  IndexCreateResponse,
  IndexUpdateRequest,
  IndexUpdateResponse
} from '../../generated/src/models'

export class Indexes {
  private api: IndexesApi

  constructor(config: Configuration) {
    this.api = new IndexesApi(config)
  }

  /**
   * Get all indexes
   */
  async getAll(): Promise<IndexListResponse[]> {
    return await this.api.indexesIndexes()
  }

  /**
   * Create a new index
   */
  async create(data: IndexCreateRequest): Promise<IndexCreateResponse> {
    return await this.api.indexesIndexes_3({ indexCreateRequest: data })
  }

  /**
   * Get an index by ID
   */
  async get(indexId: string): Promise<IndexGetResponse> {
    return await this.api.indexesIndexesIndexId({ indexId })
  }

  /**
   * Update an index
   */
  async update(indexId: string, data: IndexUpdateRequest): Promise<IndexUpdateResponse> {
    return await this.api.indexesIndexesIndexId_1({ indexId, indexUpdateRequest: data })
  }

  /**
   * Delete an index
   */
  async delete(indexId: string): Promise<void> {
    await this.api.indexesIndexesIndexId_2({ indexId })
  }
}