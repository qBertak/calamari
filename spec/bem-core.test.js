const path = require('path');

const {createMixin, createNode, createBlock, createModifiers, createClassName} = require('../dist');

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
		expect(createModifiers(['theme'], {theme: 'white'})).toContain('theme_white');
	});

	test('Boolean modifier', () => {
		expect(createModifiers(['rounded'], {rounded: true})).toContain('rounded');
	});

	test('Modifier with default value', () => {
		expect(createModifiers([['theme', 'white']], {})).toContain('theme_white');
	});

	test('Modifier with default value and passed value', () => {
		expect(createModifiers([['theme', 'white']], {theme: 'black'})).toContain('theme_black');
	});

	test('Modifier not passed', () => {
		expect(createModifiers(['rounded'], {})).toEqual([]);
	});

	test('Modifier not declared', () => {
		expect(createModifiers([], {theme: 'white'})).toEqual([]);
	});

	test('Modifiers not applyed', () => {
		expect(createModifiers(undefined, {theme: 'white'})).toEqual([]);
	});

	test('Mixed modifiers', () => {
		expect(createModifiers([
			['theme', 'white'],
			['color', 'white'],
			'rounded',
			'clear',
			['size'],
			['position'],
		],{
			color: 'black',
			clear: true,
			size: 'large',
			onClick: () => {},
		})).toEqual(['theme_white', 'color_black', 'clear', 'size_large']);
	});
});

describe('createClassName', () => {
	test('Only className is passed', () => {
		expect(createClassName({className: 'button'})).toBe('button');
	});

	test('ClassName and mixin are passed', () => {
		expect(createClassName({className: 'button', mixin: 'block__button'})).toBe('button block__button');
	});

	test('ClassName, mixin and props_classname are passed', () => {
		expect(createClassName({className: 'button', mixin: 'block__button', props_classname: 'Select-button'})).toBe('button block__button Select-button');
	});

	test('ClassName and mods passed', () => {
		expect(createClassName({
			className: 'button',
			applyed_modifiers: [
				'white',
				['color', 'black']
			],
			white: true,
		})).toBe('button button_white button_color_black');
	});

	test('Mixed test', () => {
		expect(createClassName({
			className: 'button',
			applyed_modifiers: [
				'white',
				['color', 'black']
			],
			white: true,
			props_classname: 'Select-button',
			mixin: 'block__button',
		})).toBe('button button_white button_color_black block__button Select-button');
	});
});
