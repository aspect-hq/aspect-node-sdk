// Assets resource - handles all asset-related operations
import { AssetsApi } from '../../generated/src/apis/assets-api'
import { Configuration } from '../../generated/src/runtime'
import type {
  AssetGetResponse,
  AssetCreateResponse,
  AssetDownloadGetResponse,
  FeatureType,
  AssetUpdateRequest,
  AssetListResponse,
  AssetUpdateResponse
} from '../../generated/src/models'
import { ReadStream, readFileSync } from 'fs'

export interface AssetCreateRequest {
  indexId: string
  saveOriginal?: boolean
  id?: string
  features?: FeatureType[]
  assetFile?: File | ReadStream | Blob | string
  assetUrl?: string
  name: string
}

export class Assets {
  private api: AssetsApi

  constructor(config: Configuration) {
    this.api = new AssetsApi(config)
  }

  /**
   * Get all assets for an index
   */
  async getAll(indexId: string): Promise<AssetListResponse[]> {
    return await this.api.assetsAssets({ indexId })
  }

  /**
   * Get a specific asset by ID
   */
  async get(assetId: string): Promise<AssetGetResponse> {
    return await this.api.assetsAssetsAssetId({ assetId })
  }

  /**
   * Create an asset
   */
  async create(options: AssetCreateRequest): Promise<AssetCreateResponse> {
    let convertedFile = undefined
    if (options.assetFile) {
      convertedFile = await this.convertToBlob(options.assetFile)
    }

    return await this.api.assetsAssets_3({
      indexId: options.indexId,
      saveOriginal: options.saveOriginal ?? true,
      id: options.id || null,
      features: options.features,
      assetFile: convertedFile,
      assetUrl: options.assetUrl,
      name: options.name
    })
  }

  /**
   * Convert File, ReadStream, Blob, or file path string to Blob
   */
  private async convertToBlob(fileInput?: File | ReadStream | Blob | string): Promise<Blob | null> {
    if (!fileInput) {
      return null
    }

    // If it's a string path, read the file from filesystem
    if (typeof fileInput === 'string') {
      try {
        const fileBuffer = readFileSync(fileInput)
        return new Blob([fileBuffer])
      } catch (error) {
        throw new Error(`Failed to read file from path "${fileInput}": ${error}`)
      }
    }

    // If it's already a Blob, return as-is
    if (fileInput instanceof Blob) {
      return fileInput
    }

    // If it's a File (which extends Blob), return as-is
    if (typeof File !== 'undefined' && fileInput instanceof File) {
      return fileInput
    }

    // If it's a ReadStream (Node.js), convert to Blob
    if (fileInput && typeof fileInput === 'object' && 'pipe' in fileInput) {
      const chunks: Uint8Array[] = []
      
      return new Promise((resolve, reject) => {
        const readStream = fileInput as ReadStream
        
        readStream.on('data', (chunk: string | Buffer) => {
          if (typeof chunk === 'string') {
            chunks.push(new TextEncoder().encode(chunk))
          } else {
            chunks.push(new Uint8Array(chunk))
          }
        })
        
        readStream.on('end', () => {
          const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0)
          const mergedArray = new Uint8Array(totalLength)
          let offset = 0
          
          for (const chunk of chunks) {
            mergedArray.set(chunk, offset)
            offset += chunk.length
          }
          
          const blob = new Blob([mergedArray])
          resolve(blob)
        })
        
        readStream.on('error', (error) => {
          reject(error)
        })
      })
    }

    throw new Error('Unsupported file type. Expected File, Blob, ReadStream, or file path string.')
  }

  /**
   * Update an asset
   */
  async update(assetId: string, updateData: AssetUpdateRequest): Promise<AssetUpdateResponse> {
    return await this.api.assetsAssetsAssetId_1({
      assetId,
      assetUpdateRequest: updateData
    })
  }

  /**
   * Delete an asset
   */
  async delete(assetId: string): Promise<void> {
    await this.api.assetsAssetsAssetId_2({ assetId })
  }

  /**
   * Get download data for an asset
   */
  async getDownloadData(assetId: string): Promise<AssetDownloadGetResponse> {
    return await this.api.assetsAssetsAssetIdDownload({ assetId })
  }
}