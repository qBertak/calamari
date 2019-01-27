# Calamari
A core package for developing user interfaces in [React](https://github.com/facebook/react). Calamari used other calamari packages as adapters for different environments.

## Why calamari?
Nowdays there are a lot of ways to styling user interfaces in React. Basicly you can use only css for styling your component like this.

	const Button = () => (
		<button className="button" />
	);

This way have many disadvantages . Let's imagine that your interface has a lot of buttons with different color themes. Commonly it resolves like this.

	const Button = ({theme}) => (
		<button className={`button button_theme_${theme}`} />
	);

	Button.defaultProps = {
		theme: 'white',
	};

Hmm maybe add a little bit more modificators...

    import React from 'react';

	import 'button.css';

	const Button = ({theme, size, rounded}) => (
		<button className={`
				button button_theme_${theme}
				button_size_${size}
				${rounded ? button_rounded : ''}`
			}
		/>
	);

	Button.defaultProps = {
		theme: 'white',
		size: 'medium',
	};
I think each of you has seen something like this. We can bring classnames package or its clone to automate className generation like this.

    import classnames from 'classnames';

	const Button = ({theme}) => (
		<button className={classnames('button', {[`button_theme_${theme}`: true]})} />
	)
Or use classnames/bind with css-modules. But also you can use Calamari like this:

	import Calamari from 'calamari-web';

    const Button = Calamari({class: 'button', component: 'button', mods: ['theme']});

More difficult case:

    import Calamari from 'calamari-web';

    const Button = Calamari({
	    class: 'button',
	    component: 'button',
	    mods: [['theme', 'white'], 'rounded', ['size', 'medium']],
	});

I think that's a good improvement, but calamari can do more things.
## Feautures
For good understanding the main Calamari concepts you shoud know the main agreements of [BEM](https://en.bem.info): Block, Element, Modifier, Mixin. I highly recommended to look at [quick start](https://en.bem.info/methodology/quick-start/) of it before we can continue.

 - Creating blocks with simple function call.
 - Add elements for it.
 - Inheritance of components via decoration components by each other.

## Examples
### Create common component

    import Calamari from 'calamari-web';

    const Button = Calamari({
	    class: 'button',
	    component: 'button',
	    mods: [['theme', 'white'], 'rounded', ['size', 'medium']],
	});
### Create component with elements

    import Calamari from 'calamari-web';

    const ButtonBlock = Calamari({
	    class: 'button',
	    component: 'button',
	    mods: [['theme', 'white'], 'rounded', ['size', 'medium']],
	}, {
		Text: {component: 'span', mods: [['color']]},
	});
And use it:

    const Button = ({text, children, ...rest}) => (
		<ButtonBlock {...rest} >
			<ButtonBlock.Text {...text} >{children}</ButtonBlock.Text>
		</ButtonBlock>
	);

	...
	render() {
		return (
			<Button theme="black" rounded text={{color: 'black'}}>
				Hello world button
			</Button>
		)
	}
It will return to us smth like this

    <button className="button button_theme_black button_rounded button_size_medium">
		<span className="button__text button__text_color_black">Hello world button</span>
	</button>
### Inherit uniq button from project button

    const LoginButton = Calamari({class: 'login-button', component: Button});

	render() {
		return <LoginButton color="black" />
	}
It will return to us smth like this:

    <button className="login-button button button_size_medium" />
 So you can style common button and restyle it in LoginPage css via login-button selector.

## Docs
Detail docs will appear soon...

## Adapters
 - [Calamari Web](https://github.com/qBertak/calamari-web) - For use calamari in web apps.
 - [Calamari Native](https://github.com/qBertak/calamari-native) - For use calamari in react-native apps with ReactNative.StyleSheet.

## Contribute
Calamari is under active development, if you have any idea to improve or if you found a bug, you can create an [issue](https://github.com/qBertak/calamari/issues).

## Ideas
 - Write full docs for Calamari, Calamari Web and Calamari Native.
 - Fix the text documentation
 - Css modules adapter
