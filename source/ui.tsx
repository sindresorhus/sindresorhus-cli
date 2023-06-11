import process from 'node:process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import React from 'react';
import {Box, Text} from 'ink';
import SelectInput from 'ink-select-input';
import open from 'open';
import terminalImage from 'terminal-image';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const handleSelect = (item: any) => {
	if (item.url) {
		open(item.url); // eslint-disable-line @typescript-eslint/no-floating-promises
		return;
	}

	if (item.action) {
		item.action();
	}
};

const createItems = (items: any) => {
	for (const item of items) {
		item.key = item.url || item.label;
	}

	return items;
};

const items = createItems([
	{
		label: 'Website',
		url: 'https://sindresorhus.com',
	},
	{
		label: 'Twitter',
		url: 'https://twitter.com/sindresorhus',
	},
	{
		label: 'Mastodon',
		url: 'https://mastodon.social/@sindresorhus',
	},
	{
		label: 'GitHub',
		url: 'https://github.com/sindresorhus',
	},
	{
		label: 'Contact',
		url: 'https://sindresorhus.com/contact',
	},
	{
		label: 'Unicorns!',
		async action() {
			console.log(await terminalImage.file(path.join(__dirname, '../assets/unicorn1.gif')));
			console.log(await terminalImage.file(path.join(__dirname, '../assets/unicorn2.gif')));
			console.log(await terminalImage.file(path.join(__dirname, '../assets/unicorn3.gif')));
		},
	},
	// TODO: Add separator item here when https://github.com/vadimdemedes/ink-select-input/issues/4 is done
	{
		label: '---------',
	},
	{
		label: 'Quit',
		action() {
			process.exit(); // eslint-disable-line unicorn/no-process-exit
		},
	},
]);

const ui = () => (
	<Box flexDirection='column'>
		<Box marginBottom={1}>
			<Text>I’m a full-time open-sourcerer making things like macOS apps, CLI tools, and modules.</Text>
		</Box>
		<SelectInput items={items} onSelect={handleSelect}/>
	</Box>
);

export default ui;
