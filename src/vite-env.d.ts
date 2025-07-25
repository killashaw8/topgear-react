interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_IMAGE_CDN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}