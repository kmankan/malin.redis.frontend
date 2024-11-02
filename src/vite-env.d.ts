/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RAILWAY_PRIVATE_DOMAIN: string
  readonly VITE_RAILWAY_PUBLIC_DOMAIN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
