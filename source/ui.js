'use strict';
const path = require('path');
const React = require('react');
const {Box, Text} = require('ink');
const SelectInput = require('ink-select-input').default;
const open = require('open');
const terminalImage = require('terminal-image');

const handleSelect = item => {
	if (item.url) {
		open(item.url);
	}

	if (item.action) {
		item.action();
	}
};

const createItems = items => {
	for (const item of items) {
		item.key = item.url || item.label;
	}

	return items;
};

const items = createItems([
	{
		label: 'Website',
		url: 'https://sindresorhus.com'
	},
	{
		label: 'Twitter',
		url: 'https://twitter.com/sindresorhus'
	},
	{
		label: 'GitHub',
		url: 'https://github.com/sindresorhus'
	},
	{
		label: 'Blog',
		url: 'https://blog.sindresorhus.com'
	},
	{
		label: 'Ask Me Anything',
		url: 'https://github.com/sindresorhus/ama'
	},
	{
		label: 'Contact',
		url: 'https://sindresorhus.com/contact'
	},
	{
		label: 'Support my open source work',
		url: 'https://www.patreon.com/sindresorhus'
	},
	{
		label: 'Unicorns!',
		async action() {
			console.log(await terminalImage.file(path.join(__dirname, 'unicorn1.gif')));
			console.log(await terminalImage.file(path.join(__dirname, 'unicorn2.gif')));
			console.log(await terminalImage.file(path.join(__dirname, 'unicorn3.gif')));
		}
	},
	// TODO: Add separator item here when https://github.com/vadimdemedes/ink-select-input/issues/4 is done
	{
		label: '---------'
	},
	{
		label: 'Quit',
		action() {
			process.exit(); // eslint-disable-line unicorn/no-process-exit
		}
	}
]);

module.exports = () => (
	<Box flexDirection="column">
		<Box marginBottom={1}>
			<Text>I’m a full-time open-sourcerer making things like macOS apps, CLI tools, and modules.</Text>
		</Box>
		<SelectInput items={items} onSelect={handleSelect}/>
	</Box>
);
