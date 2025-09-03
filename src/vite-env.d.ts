/// <reference types="vite/client" />

declare module '*.json' {
  const value: Record<string, unknown>;
  export default value;
}

declare module '../../package.json' {
  export const version: string;
  export const buildDate: string;
  const value: {
    version: string;
    buildDate: string;
    [key: string]: unknown;
  };
  export default value;
}

declare module '*.svg' {
    import * as React from 'react';
    const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    export { ReactComponent };
    export default React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  }
  
  declare module '*.svg?react' {
    import * as React from 'react';
    const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    export { ReactComponent };
    export default React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  }