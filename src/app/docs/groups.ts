// app/docs/groups.ts
export interface DocGroup {
  title: string;
  items: { name: string; file: string }[];
}

export const docGroups: DocGroup[] = [
  {
    title: 'Routing',
    items: [
      { name: 'Catch All Segment', file: 'catch-all-segment.md' },
      { name: 'Intercepting Routes', file: 'Intercepting-Routes.md' },
      { name: 'Layouts', file: 'Layouts.md' },
      { name: 'Link', file: 'Link.md' },
      { name: 'Middleware', file: 'Middleware.md' },
      { name: 'Multiple Root Layout', file: 'Multiple-Root-Layout.md' },
      { name: 'Not Found', file: 'not-found.md' },
      { name: 'Parallel Intercepting Route', file: 'Parallel-Intercepting-Route.md' },
      { name: 'Parallel Routing', file: 'Parallel-Routing.md' },
      { name: 'Params and Search Params', file: 'Params-And-Search-Params.md' },
      { name: 'Redirects', file: 'Redirects.md' },
      { name: 'Route Group', file: 'Route-Group.md' },
      { name: 'Route Handlers', file: 'Route-Handlers.md' },
      { name: 'Templates', file: 'templates.md' },
    ],
  },
  {
    title: 'Rendering',
    items: [
      { name: 'Client Component Placement', file: 'Client-Component-Placement.md' },
      { name: 'Client Components Rendering', file: 'Client-Components-Rendering.md' },
      { name: 'Client Only', file: 'Client-Only.md' },
      { name: 'Dynamic Rendering', file: 'Dynamic-Rendering.md' },
      { name: 'Edge Rendering', file: 'Edge-Rendering.md' },
      { name: 'React Server Components', file: 'React-Server-Components.md' },
      { name: 'Rendering', file: 'Rendering.md' },
      { name: 'Server Only', file: 'Server-Only.md' },
      { name: 'Server Side Rendering', file: 'Server-Side-Rendering.md' },
      { name: 'Static Rendering', file: 'Static-Rendering.md' },
      { name: 'Streaming Rendering', file: 'Streaming-Rendering.md' },
    ],
  },
  {
    title: 'Data Fetching',
    items: [
      { name: 'Data Fetching', file: 'Data-Fetching.md' },
      { name: 'Data Fetching in Client Side', file: 'Data-Fetching-In-Client-Side.md' },
      { name: 'Data Fetching in Server Side', file: 'Data-Fetching-In-Server-Side.md' },
      { name: 'Parallel Data Fetching', file: 'Parallel-Data-Fetching.md' },
      { name: 'Sequential Data Fetching', file: 'Sequential-Data-Fetching.md' },
    ],
  },
  {
    title: 'Caching and Optimization',
    items: [
      { name: 'Caching', file: 'Caching.md' },
      { name: 'Generate Static Params', file: 'Genrate-Static-Params.md' }, // Note: Fix typo if it's "Generate"
      { name: 'Incremental Static Regeneration', file: 'Incremental-Static-Regeneration.md' },
      { name: 'Partial Prerendering', file: 'Partial-Prerendering.md' },
    ],
  },
  {
    title: 'Error Handling and Loading',
    items: [
      { name: 'Error Handling', file: 'Error-Handling.md' },
      { name: 'Loading', file: 'Loading.md' },
    ],
  },
  {
    title: 'API and Headers',
    items: [
      { name: 'API Route Example', file: 'Api-Route-Example.md' },
      { name: 'Cookies in Route Handlers', file: 'Cookies-in-Route-Handlers.md' },
      { name: 'Headers', file: 'Headers.md' },
    ],
  },
  {
    title: 'Miscellaneous',
    items: [
      { name: 'Context Providers', file: 'Context-Providers.md' },
      { name: 'File Colocation', file: 'File-Colocation.md' },
      { name: 'Private Folder', file: 'Private-Folder.md' },
      { name: 'Routing Metadata', file: 'Routing-Metadata.md' },
    ],
  },
];