declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}

declare module '*.svg' {
    import type { HTMLProps, FC } from 'react';

    export const ReactComponent = FC<HTMLProps<SVGElement>>;
}

declare module '*.png' {
    const path: string;
    export default path;
}
