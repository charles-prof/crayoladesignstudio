import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { title, subtitle, imageUrl } = attributes;
	
	const blockProps = useBlockProps.save({
		className: 'crayola-hero-3d',
		'data-hero-bg': imageUrl
	});

	return (
		<div { ...blockProps }>
			<div className="hero-canvas-container" style={{ backgroundImage: `url(${imageUrl})` }}>
				{/* Three.js or GSAP will target this container on the frontend */}
			</div>
			<div className="hero-overlay"></div>
			<div className="hero-content">
				<RichText.Content tagName="h1" value={title} className="hero-title" />
				<RichText.Content tagName="p" value={subtitle} className="hero-subtitle" />
			</div>
		</div>
	);
}
