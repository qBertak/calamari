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
}

export type Mixin = string;

export type Mod = string | Array<string>;

export type Mods = Array<Mod>;

export type ApplyedMod = {
    name: string,
    value: string,
};

export type ApplyedMods = Array<ApplyedMod>;

export interface ClassNameData {
    className: string,
    applyedModifiers: ApplyedMods,
    mixin?: string,
    propsClassname?: string,
    style?: any,
}

export interface BemNodeProps {
    component?: ValidComponent,
    className?: string,
    mixin?: string,
    children?: Element,
    style?: any,
}

export type CreateNodeFunc = (nodeSchema: NodeSchema) => any;

export type StylesApplyerFunc = (classNameData: ClassNameData) => object;
