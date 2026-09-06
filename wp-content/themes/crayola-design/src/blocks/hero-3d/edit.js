import { useBlockProps, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { title, subtitle, imageUrl } = attributes;

	const blockProps = useBlockProps({
		className: 'crayola-hero-3d-editor',
		style: { backgroundImage: `url(${imageUrl})` }
	});

	return (
		<div { ...blockProps }>
			<div className="hero-overlay"></div>
			<div className="hero-content">
				<RichText
					tagName="h1"
					value={title}
					onChange={(val) => setAttributes({ title: val })}
					placeholder="Enter hero title..."
					className="hero-title"
				/>
				<RichText
					tagName="p"
					value={subtitle}
					onChange={(val) => setAttributes({ subtitle: val })}
					placeholder="Enter subtitle..."
					className="hero-subtitle"
				/>
				<div className="hero-media-controls">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => setAttributes({ imageUrl: media.url })}
							allowedTypes={['image', 'video']}
							render={({ open }) => (
								<Button variant="secondary" onClick={open}>
									Change Background Media
								</Button>
							)}
						/>
					</MediaUploadCheck>
				</div>
			</div>
		</div>
	);
}
