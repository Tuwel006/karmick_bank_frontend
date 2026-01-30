'use client';
import * as React from 'react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';

// This implementation is taken from the Material UI Next.js Pro example
// https://github.com/mui/material-ui/tree/master/examples/material-ui-nextjs-ts

export default function NextAppDirEmotionCacheProvider(props: { options: any; CacheProvider?: (props: { value: any; children: React.ReactNode }) => React.JSX.Element | null; children: React.ReactNode }) {
    const { options, CacheProvider: Component = CacheProvider, children } = props;

    const [{ cache, flush }] = React.useState(() => {
        const cache = createCache(options);
        cache.compat = true;
        const prevInsert = cache.insert;
        let inserted: string[] = [];
        cache.insert = (...args) => {
            const serialized = args[1];
            if (cache.inserted[serialized.name] === undefined) {
                inserted.push(serialized.name);
            }
            return prevInsert(...args);
        };
        const flush = () => {
            const prevInserted = inserted;
            inserted = [];
            return prevInserted;
        };
        return { cache, flush };
    });

    useServerInsertedHTML(() => {
        const names = flush();
        if (names.length === 0) {
            return null;
        }
        let styles = '';
        for (const name of names) {
            styles += cache.inserted[name];
        }
        return (
            <style
                key={cache.key}
                data-emotion={`${cache.key} ${names.join(' ')}`}
                dangerouslySetInnerHTML={{
                    __html: styles,
                }}
            />
        );
    });

    return <Component value={cache}>{children}</Component>;
}
