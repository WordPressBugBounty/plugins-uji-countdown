/**
 * WordPress dependencies
 */

import { InnerBlocks } from '@wordpress/block-editor';

import metadata from './block.json';

const deprecated = [
	{
		attributes: { ...metadata.attributes },
                
                save( { attributes } ) {
                    
                    <InnerBlocks.Content />
			
			
		},
	},
];

export default deprecated;