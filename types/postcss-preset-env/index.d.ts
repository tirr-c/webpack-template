declare module 'postcss-preset-env' {
    import * as postcss from 'postcss';

    function postcssPresetEnv(options?: postcssPresetEnv.PluginOptions): unknown;

    namespace postcssPresetEnv {
        export interface Features {
            [feature: string]: boolean | object;
        }

        export interface InsertPlugins {
            [feature: string]: postcss.AcceptedPlugin | postcss.AcceptedPlugin[];
        }

        export interface PluginOptions {
            stage?: 0 | 1 | 2 | 3 | 4 | false;
            features?: Features;
            browsers?: string | string[];
            insertBefore?: InsertPlugins;
            insertAfter?: InsertPlugins;
            preserve?: boolean;
        }

        export function process(
            css: postcss.ParserInput | postcss.Result | postcss.LazyResult | postcss.Root,
            processOptions?: postcss.ProcessOptions,
            pluginOptions?: PluginOptions,
        ): postcss.LazyResult;
    }

    export = postcssPresetEnv;
}
