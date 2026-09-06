import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { images } = attributes;
	
	const blockProps = useBlockProps.save({
		className: 'crayola-fluid-gallery'
	});

	if (!images || images.length === 0) return null;

	return (
		<div { ...blockProps }>
			<div className="fluid-gallery-track">
				{images.map((img) => (
					<div key={img.id} className="fluid-gallery-item">
						<div className="fluid-gallery-image-wrapper">
							<img src={img.url} alt={img.alt || 'Gallery image'} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
