"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
// @ts-ignore
var kebab_case_1 = require("kebab-case");
;
function createBlock(blockSchema, elementsSchemas, createNode) {
    var BemBlock = createNode(blockSchema);
    if (elementsSchemas) {
        for (var elementSchema in elementsSchemas) {
            if (elementsSchemas.hasOwnProperty(elementSchema) && blockSchema.class) {
                BemBlock[elementSchema] = createNode(__assign({}, elementsSchemas[elementSchema], { class: blockSchema.class + "__" + kebab_case_1.default(elementSchema).slice(1) }));
            }
        }
    }
    return BemBlock;
}
exports.default = createBlock;
function createNode(_a, stylesApplyer) {
    var className = _a.class, component = _a.component, mods = _a.mods, default_props = __rest(_a, ["class", "component", "mods"]);
    var BemNode = function (_a) {
        var _b = _a.component, Component = _b === void 0 ? component : _b, propsClassname = _a.className, mixin = _a.mixin, children = _a.children, rest = __rest(_a, ["component", "className", "mixin", "children"]);
        var _c = separateModifiersFromProps(rest, mods), props = _c.props, applyedModifiers = _c.applyedModifiers;
        React.createElement(Component, __assign({}, default_props, props, stylesApplyer({
            className: className,
            applyedModifiers: applyedModifiers,
            mixin: mixin,
            propsClassname: propsClassname,
        })), children);
    };
    return BemNode;
}
exports.createNode = createNode;
function createClassName(_a) {
    var className = _a.className, applyedModifiers = _a.applyedModifiers, mixin = _a.mixin, propsClassname = _a.propsClassname;
    var modifiers = createModifiers(applyedModifiers);
    var result_mixin = createMixin(mixin, propsClassname);
    var result_classname = modifiers.reduce(function (sub_result_className, mod) { return sub_result_className + " " + className + "_" + mod; }, className);
    return result_mixin ? result_classname + " " + result_mixin : result_classname;
}
exports.createClassName = createClassName;
function createMixin(mixin, className) {
    if (mixin && className)
        return mixin + " " + className;
    return mixin || className || '';
}
exports.createMixin = createMixin;
function createModifiers(applyedModifiers) {
    var applyMod = function (modifiers, applyedMod) {
        var name = applyedMod.name, value = applyedMod.value;
        switch (typeof value) {
            case 'boolean':
                return value ? modifiers.concat(name) : modifiers;
            case 'string':
                return modifiers.concat(name + "_" + value);
            case 'undefined':
            default:
                return modifiers;
        }
    };
    return applyedModifiers.reduce(function (modifiers, mod) { return applyMod(modifiers, mod); }, []);
}
exports.createModifiers = createModifiers;
function separateModifiersFromProps(props, mods) {
    if (mods === void 0) { mods = []; }
    return mods.reduce(function (_a, mod) {
        var props = _a.props, applyedModifiers = _a.applyedModifiers;
        var _b;
        var applyedMod = parseMod(mod, props);
        return {
            applyedModifiers: applyedModifiers.concat(),
            props: __assign({}, props, (_b = {}, _b[applyedMod.name] = undefined, _b)),
        };
    }, { props: props, applyedModifiers: [] });
}
exports.separateModifiersFromProps = separateModifiersFromProps;
function parseMod(mod, props) {
    return Array.isArray(mod)
        ?
            { name: mod[0], value: props[mod[0]] || mod[1] }
        :
            { name: mod, value: props[mod] };
}
