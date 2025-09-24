// Unified client for the Aspect SDK
import { Configuration, ConfigurationParameters } from '../generated/src/runtime'
import type { AspectClientConfig } from './types'

// Import resource classes
import { Assets } from './resources/assets'
import { Indexes } from './resources/indexes'
import { Users } from './resources/users'
import { Search } from './resources/search'
import { Tasks } from './resources/tasks'
import { Analyze } from './resources/analyze'

export class AspectClient {
  private config: Configuration

  // Resource instances
  public readonly assets: Assets
  public readonly indexes: Indexes
  public readonly users: Users
  public readonly search: Search
  public readonly tasks: Tasks
  public readonly analyze: Analyze

  constructor(config: AspectClientConfig) {
    const configParams: ConfigurationParameters = {
      basePath: config.baseUrl || 'https://api.aspect.inc',
      accessToken: config.apiKey,
      headers: {
        'User-Agent': 'aspect-media-engine-sdk/1.0.0'
      }
    }
    
    this.config = new Configuration(configParams)

    // Initialize resource instances
    this.assets = new Assets(this.config)
    this.indexes = new Indexes(this.config)
    this.users = new Users(this.config)
    this.search = new Search(this.config)
    this.tasks = new Tasks(this.config)
    this.analyze = new Analyze(this.config)
  }
}