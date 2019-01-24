const path = require('path');

const {
    createBlock,
    createNode,
    createClassName,
    createMixin,
    createModifiers,
    separateModifiersFromProps,
    parseMod,
} = require('../dist');

describe('createClassName', () => {
    test('className and modifiers passed', () => {
        expect(createClassName({className: 'button', applyedModifiers: [{name: 'theme', value: 'white'}]}))
            .toBe('button button_theme_white');
    });

    test('className, modifiers and mixin passed', () => {
        expect(createClassName({className: 'button', mixin: 'some-block__button', applyedModifiers: []}))
            .toBe('button some-block__button');
    });

    test('className, modifiers and props className passed', () => {
        expect(createClassName({className: 'button', propsClassname: 'some-block__button', applyedModifiers: []}))
            .toBe('button some-block__button');
    });

    test('className, modifiers, mixin and props className passed', () => {
        expect(createClassName({className: 'button', mixin: 'other-block__button', propsClassname: 'some-block__button', applyedModifiers: []}))
            .toBe('button other-block__button some-block__button');
    });
});

describe('createMixin', () => {
	test('only mixin exist', () => {
		expect(createMixin('block__mixin')).toBe('block__mixin');
	});

	test('only className exist', () => {
		expect(createMixin('some-class-name')).toBe('some-class-name');
	});

	test('no args pass', () => {
		expect(createMixin()).toBe('');
	});

	test('mixin and className pass', () => {
		expect(createMixin('block__mixin', 'some-class-name')).toBe('block__mixin some-class-name');
	});
});

describe('createModifiers', () => {
	test('String modifier', () => {
		expect(createModifiers([{name: 'theme', value: 'white'}])).toContain('theme_white');
	});

	test('Boolean modifier', () => {
		expect(createModifiers([{name: 'rounded', value: true}])).toContain('rounded');
	});

	test('Modifier not passed', () => {
		expect(createModifiers(['rounded'], {})).toEqual([]);
	});

	test('Modifier not declared', () => {
		expect(createModifiers([], {theme: 'white'})).toEqual([]);
	});
});

describe('separateModifiersFromProps', () => {
    test('no mods declared', () => {
        const props = {theme: 'black'};
        expect(separateModifiersFromProps(props)).toEqual({props, applyedModifiers: []});
    });

    test('declare mod but clean props', () => {
        expect(separateModifiersFromProps({}, ['theme'])).toEqual({props: {}, applyedModifiers: []});
    });

    test('declare mod and there are value in props', () => {
        expect(separateModifiersFromProps({theme: 'white'}, ['theme']))
            .toEqual({props: {}, applyedModifiers: [{name: 'theme', value: 'white'}]});
    });
});

describe('parseMod', () => {
    test('only declared mod with value in props', () => {
        expect(parseMod('theme', {theme: 'white'})).toEqual({name: 'theme', value: 'white'});
    });

    test('only declared mod without value in props', () => {
        expect(parseMod('theme', {})).toEqual({name: 'theme', value: undefined});
    });

    test('declared mod with default value', () => {
        expect(parseMod(['theme', 'white'], {})).toEqual({name: 'theme', value: 'white'});
    });

    test('declared mod with default value and value in props', () => {
        expect(parseMod(['theme', 'white'], {theme: 'black'})).toEqual({name: 'theme', value: 'black'});
    });
});
