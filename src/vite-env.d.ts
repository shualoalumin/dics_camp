/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CAMP_FEE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
