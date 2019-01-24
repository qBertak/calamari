import * as React from 'react';

// @ts-ignore
import KebabCase from 'kebab-case';

type ValidComponent = React.ComponentType<any>;

export interface NodeSchema {
    component?: ValidComponent,
    mods?: Mods,
    class?: string,
}

export interface NodeDescription {
    component: ValidComponent,
    mods?: Mods,
    class: string,
}

export interface Elements {
    [key: string]: NodeSchema
};

export type Mixin = string;

export type Mod = string | Array<string>;

export type Mods = Array<Mod>;

export type ApplyedMod = {
    name: string,
    value: string,
};

export type ApplyedMods = Array<ApplyedMod>;

export interface classNameData {
    className: string,
    applyedModifiers?: ApplyedMods,
    mixin?: string,
    propsClassname?: string,
}

export interface BemNodeProps {
    component?: ValidComponent,
    className?: string,
    mixin?: string,
    children?: Element,
}

export type createNodeFunc = (nodeSchema: NodeSchema) => any;

export type stylesApplyerFunc = (classNameData: classNameData) => object;

export default function createBlock(
    blockSchema: NodeSchema, elementsSchemas: Elements, createNode: createNodeFunc
): Node {
    const BemBlock = createNode(blockSchema);

    if (elementsSchemas) {
        for (let elementSchema in elementsSchemas) {
            if (elementsSchemas.hasOwnProperty(elementSchema) && blockSchema.class) {
                BemBlock[elementSchema] = createNode({
                    ...elementsSchemas[elementSchema],
                    class: `${blockSchema.class}__${KebabCase(elementSchema).slice(1)}`,
                });
            }
        }
    }

    return BemBlock;
}

export function createNode({
    class: className,
    component,
    mods,
    ...default_props
}: NodeDescription,
stylesApplyer: stylesApplyerFunc,
): any {
    const BemNode = ({
        component: Component = component,
        className: propsClassname,
        mixin,
        children,
        ...rest
    }: BemNodeProps): any => {
        const {props, applyedModifiers} = separateModifiersFromProps(rest, mods);

        React.createElement(Component, {
            ...default_props,
            ...props,
            ...stylesApplyer({
                className,
                applyedModifiers,
                mixin,
                propsClassname,
            })
        }, children);
    }

    return BemNode;
}

export function createClassName({
    className,
    applyedModifiers,
    mixin,
    propsClassname,
}: classNameData) {
    const modifiers = createModifiers(applyedModifiers);
    const result_mixin = createMixin(mixin, propsClassname);

    const result_classname = modifiers.reduce(
        (sub_result_className, mod) => `${sub_result_className} ${className}_${mod}`
        , className);

    return result_mixin ? `${result_classname} ${result_mixin}` : result_classname;
}

export function createMixin(mixin?: Mixin, className?: string): Mixin {
    if (mixin && className) return `${mixin} ${className}`;

    return mixin || className || '';
}

export function createModifiers(applyedModifiers: ApplyedMods) {
    const applyMod = (modifiers: string[], applyedMod: ApplyedMod) => {
        const {name, value} = applyedMod;

        switch (typeof value) {
        case 'boolean':
            return value ? modifiers.concat(name) : modifiers;
        case 'string':
            return modifiers.concat(`${name}_${value}`);
        case 'undefined':
        default:
            return modifiers;
        }
    };

    return applyedModifiers.reduce((modifiers, mod) => applyMod(modifiers, mod) , []);
}

export function separateModifiersFromProps(props: any, mods: Mods = []): {applyedModifiers: ApplyedMods, props: any} {
    return mods.reduce(({props, applyedModifiers}, mod) => {
        const applyedMod = parseMod(mod, props);

        return {
            applyedModifiers: applyedModifiers.concat(),
            props: {...props, [applyedMod.name]: undefined},
        };
    }, {props, applyedModifiers: []});
}

function parseMod(mod: Mod, props: any) {
    return Array.isArray(mod)
        ?
        {name: mod[0], value: props[mod[0]] || mod[1]}
        :
        {name: mod, value: props[mod]};
}
