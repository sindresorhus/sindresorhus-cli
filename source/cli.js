#!/usr/bin/env NODE_NO_WARNINGS=1 node --loader=import-jsx
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import meow from 'meow';
import termImg from 'term-img';
import terminalImage from 'terminal-image';
import React from 'react';
import {render} from 'ink';
import ui from './ui.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

meow(`
	Usage
	  $ sindresorhus
`, {
	importMeta: import.meta,
});

const fallback = async () => {
	const image = await terminalImage.file(path.join(__dirname, 'avatar-fallback.png'));
	console.log(image);
};

termImg(path.join(__dirname, 'avatar.png'), {fallback});

render(React.createElement(ui));
