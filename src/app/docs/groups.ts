export interface DocGroup {
  title: string;
  items: { name: string; file: string }[];
}

export const docGroups: DocGroup[] = [
  {
    title: 'Introduction',
    items: [
      { name: 'Introduction', file: 'Introduction.md' },
      { name: 'Project Setup in Next.js 15', file: 'Project-Setup-in-Next.js-15.md' },
      { name: 'Folder Convention', file: 'Folder-Convention.md' },
    ],
  },
  {
    title: 'Routing',
    items: [
      { name: 'App Router', file: 'App-Router.md' },
      { name: 'Dynamic Routes', file: 'Dynamic-Routes.md' },
      { name: 'Catch All Segment', file: 'catch-all-segment.md' },
      { name: 'Intercepting Routes', file: 'Intercepting-Routes.md' },
      { name: 'Parallel Intercepting Route', file: 'Parallel-Intercepting-Route.md' },
      { name: 'Parallel Routing', file: 'Parallel-Routing.md' },
      { name: 'Route Group', file: 'Route-Group.md' },
      { name: 'Params and Search Params', file: 'Params-And-Search-Params.md' },
      { name: 'Redirects', file: 'Redirects.md' },
      { name: 'Not Found', file: 'not-found.md' },
    ],
  },
  {
    title: 'Layouts and Templates',
    items: [
      { name: 'Layouts', file: 'Layouts.md' },
      { name: 'Multiple Root Layout', file: 'Multiple-Root-Layout.md' },
      { name: 'Templates', file: 'templates.md' },
    ],
  },
  {
    title: 'Rendering',
    items: [
      { name: 'Rendering', file: 'Rendering.md' },
      { name: 'Server Side Rendering', file: 'Server-Side-Rendering.md' },
      { name: 'Static Rendering', file: 'Static-Rendering.md' },
      { name: 'Partial Prerendering', file: 'Partial-Prerendering.md' },
      { name: 'Incremental Static Regeneration', file: 'Incremental-Static-Regeneration.md' },
      { name: 'Streaming Rendering', file: 'Streaming-Rendering.md' },
      { name: 'Edge Rendering', file: 'Edge-Rendering.md' },
      { name: 'Dynamic Rendering', file: 'Dynamic-Rendering.md' },
    ],
  },
  {
    title: 'Data Fetching',
    items: [
      { name: 'Data Fetching', file: 'Data-Fetching.md' },
      { name: 'Data Fetching in Client Side', file: 'Data-Fetching-In-Client-Side.md' },
      { name: 'Data Fetching in Server Side', file: 'Data-Fetching-In-Server-Side.md' },
      { name: 'Sequential Data Fetching', file: 'Sequential-Data-Fetching.md' },
      { name: 'Parallel Data Fetching', file: 'Parallel-Data-Fetching.md' },
      { name: 'Generate Static Params', file: 'Genrate-Static-Params.md' },
    ],
  },
  {
    title: 'Components',
    items: [
      { name: 'Client Components Rendering', file: 'Client-Components-Rendering.md' },
      { name: 'Client Component Placement', file: 'Client-Component-Placement.md' },
      { name: 'Client Only', file: 'Client-Only.md' },
      { name: 'Server Only', file: 'Server-Only.md' },
      { name: 'Context Providers', file: 'Context-Providers.md' },
      { name: 'React Server Components', file: 'React-Server-Components.md' },
    ],
  },
  {
    title: 'API and Cookies',
    items: [
      { name: 'CRUD API Example', file: 'CRUD-API-Example.md' },
      { name: 'Route Handlers', file: 'Route-Handlers.md' },
      { name: 'Cookies in Route Handlers', file: 'Cookies-in-Route-Handlers.md' },
    ],
  },
  {
    title: 'Middleware and Headers',
    items: [
      { name: 'Middleware', file: 'Middleware.md' },
      { name: 'Headers', file: 'Headers.md' },
      { name: 'Private Folder', file: 'Private-Folder.md' },
    ],
  },
  {
    title: 'UI and Navigation',
    items: [
      { name: 'Link', file: 'Link.md' },
      { name: 'Loading', file: 'Loading.md' },
    ],
  },
  {
    title: 'Performance and Caching',
    items: [
      { name: 'Caching', file: 'Caching.md' },
    ],
  },
  {
    title: 'Error and Edge Cases',
    items: [
      { name: 'Error Handling', file: 'Error-Handling.md' },
    ],
  },
  {
    title: 'Miscellaneous',
    items: [
      { name: 'File Colocation', file: 'File-Colocation.md' },
      { name: 'Routing Metadata', file: 'Routing-Metadata.md' },
    ],
  },
];