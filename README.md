# Aspect Node.js SDK

This SDK delivers an intuitive interface for building applications with Aspect's video intelligence platform. Designed for JavaScript and TypeScript developers, it provides comprehensive methods for video analysis, search, and management while eliminating complex integration overhead and reducing development time. 

## Installation

```bash
npm install aspect-sdk
```

## Quick Start

```typescript
import { AspectClient } from 'aspect-sdk'

const client = new AspectClient({
    apiKey: 'your-api-key', // Required: Your API key 
})
```

## Usage Examples

### Create an Index

Indexes are organizational containers for your assets. Think of them like folders or collections.

```typescript
const index = await client.indexes.create({
    name: 'My Video Collection',
    description: 'Collection of marketing videos',
    features: ['embedding'] // Optional: specify which AI features to run by default on all assets when they're created in this index
})

console.log('Created index:', index.id)
```

### Create an Asset

Assets are videos or images that get AI-indexed by the system. You can upload from a file path, URL, or File/Blob object.

```typescript
// Upload from file path
const { assetId, taskId } = await client.assets.create({
    indexId: index.id,
    name: 'video.mp4',
    file: '/path/to/video.mp4',
    // url: 'https://example.com/video.mp4', can also optionally pass a url instead of file to assets.create
    saveOriginal: true, // Whether to store the original file
    features: ['transcription'] // Optional: specify which AI features to additionally run specifically for this asset (union with index default features)
})

console.log('Created asset from file:', assetId)

// wait on the asset to finish indexing its features
const task = await client.tasks.waitForDone(taskId, {
    interval: 5000,
    callback: (task) => {
        console.log(task.features)
    }
})

if (task.features.transcription.state === "failed") {
    throw new Error("Transcription failed")
}
```

### Search Assets

Search across your indexed video content using natural language queries.

```typescript
// Basic search
const searchResults = await client.search.query(
    indexId: index.id,
    queryText: "",
)
console.log("Search results", searchResults)

// Note: The search API is currently being developed and will support
// parameters like filters, sorting, and pagination
```

## API Structure

The SDK is organized into resource-based modules:

- **`client.indexes`** - Create and manage indexes (collections)
- **`client.assets`** - Upload and manage video assets
- **`client.search`** - Search across indexed content
- **`client.tasks`** - Monitor processing tasks
- **`client.users`** - User account management
- **`client.analyze`** - AI analysis operations

## Asset Processing

When you create an asset, Aspect automatically runs tasks for the playground:

- **Proxies** - Optimized versions for streaming
- **Previews** - Thumbnail images and preview clips

You can choose to run these AI jobs whenever you want (either through index's default features, assets.create, or tasks.create):

- **Transcription** - Speech-to-text extraction
- **Embedding** - Semantic vector embeddings for search

You can monitor processing status through the task polling system or via webhooks.

## TypeScript Support

This SDK is written in TypeScript and provides full type definitions for all API operations:

```typescript
import type { 
    IndexCreateRequest,
    AssetCreateResponse,
} from 'aspect-sdk'
```

## Error Handling

```typescript
try {
    const asset = await client.assets.create({
        indexId: 'invalid-id',
        name: 'video.mp4',
        file: '/path/to/video.mp4'
    })
} catch (error) {
    console.error('Failed to create asset:', error.message)
}
```

## License

MIT License
