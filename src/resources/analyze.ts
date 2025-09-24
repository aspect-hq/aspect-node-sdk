// Analyze resource - handles all analyze-related operations
import { AnalyzeApi } from '../../generated/src/apis/analyze-api'
import { Configuration } from '../../generated/src/runtime'
import type {
  AnalyzeAskRequest,
  AnalyzeAskResponse,
  AnalyzeBoxRequest,
  AnalyzeBoxResponse,
  AnalyzePointRequest,
  AnalyzePointResponse
} from '../../generated/src/models'

export class Analyze {
  private api: AnalyzeApi

  constructor(config: Configuration) {
    this.api = new AnalyzeApi(config)
  }

  /**
   * Ask questions about video content
   */
  async ask(data: AnalyzeAskRequest): Promise<AnalyzeAskResponse> {
    return await this.api.analyzeAnalyzeAsk({ analyzeAskRequest: data })
  }

  /**
   * Analyze a box region in video
   */
  async box(data: AnalyzeBoxRequest): Promise<AnalyzeBoxResponse> {
    return await this.api.analyzeAnalyzeBox({ analyzeBoxRequest: data })
  }

  /**
   * Analyze a point in video
   */
  async point(data: AnalyzePointRequest): Promise<AnalyzePointResponse> {
    return await this.api.analyzeAnalyzePoint({ analyzePointRequest: data })
  }
}