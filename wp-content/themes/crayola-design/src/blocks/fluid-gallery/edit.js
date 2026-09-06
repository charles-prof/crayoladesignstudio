import { useBlockProps, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { images } = attributes;

	const blockProps = useBlockProps({
		className: 'crayola-fluid-gallery-editor'
	});

	const onSelectImages = (media) => {
		setAttributes({ images: media });
	};

	return (
		<div { ...blockProps }>
			<div className="gallery-header">
				<h3>Fluid Gallery</h3>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={onSelectImages}
						allowedTypes={['image']}
						multiple
						gallery
						value={images.map(img => img.id)}
						render={({ open }) => (
							<Button variant="secondary" onClick={open}>
								{images.length > 0 ? 'Edit Gallery' : 'Add Images'}
							</Button>
						)}
					/>
				</MediaUploadCheck>
			</div>
			
			{images.length > 0 ? (
				<div className="gallery-preview">
					{images.map((img) => (
						<div key={img.id} className="gallery-item-preview">
							<img src={img.url} alt={img.alt} />
						</div>
					))}
				</div>
			) : (
				<div className="gallery-empty">
					<p>No images selected. Click "Add Images" to build your gallery.</p>
				</div>
			)}
		</div>
	);
}
