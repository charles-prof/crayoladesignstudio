import { useRef, useEffect } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import { VirtualTourPlugin } from '@photo-sphere-viewer/virtual-tour-plugin';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import { AutorotatePlugin } from '@photo-sphere-viewer/autorotate-plugin';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/virtual-tour-plugin/index.css';
import '@photo-sphere-viewer/markers-plugin/index.css';

const NODES = [
  {
    id: 'living-room',
    panorama: '/pano/bedroom-web.jpg',
    name: 'Living Room',
    links: [
      { nodeId: 'kitchen', position: { yaw: '130deg', pitch: '0deg' } },
    ],
  },
  {
    id: 'kitchen',
    panorama: '/pano/kitchen-web.jpg',
    name: 'Kitchen',
    links: [
      { nodeId: 'living-room', position: { yaw: '-50deg', pitch: '0deg' } },
      { nodeId: 'bedroom', position: { yaw: '80deg', pitch: '0deg' } },
    ],
  },
  {
    id: 'bedroom',
    panorama: '/pano/living-room-web.jpg',
    name: 'Bedroom',
    links: [
      { nodeId: 'kitchen', position: { yaw: '-90deg', pitch: '0deg' } },
    ],
  },
];

export default function PanoramaViewer() {
  const viewerRef = useRef(null);
  const viewerInstance = useRef(null);

  useEffect(() => {
    if (!viewerRef.current || viewerInstance.current) return;

    let viewer;
    const timer = setTimeout(() => {
      viewer = new Viewer({
        container: viewerRef.current,
        loadingTxt: 'Loading panorama...',
        touchmoveTwoFingers: false,
        mousewheelCtrlKey: false,
        defaultYaw: '0deg',
        defaultPitch: '0deg',
        navbar: [
          'zoom',
          'move',
          'caption',
          'fullscreen',
        ],
        plugins: [
          [AutorotatePlugin, {
            autorotatePitch: '0deg',
            autorotateSpeed: '0.5rpm',
            autostartDelay: 3000,
            autostartOnIdle: true,
          }],
          [MarkersPlugin, {}],
          [VirtualTourPlugin, {
            renderMode: '3d',
            startNodeId: 'living-room',
            nodes: NODES,
          }],
        ],
      });
      viewerInstance.current = viewer;
    }, 100);

    return () => {
      clearTimeout(timer);
      if (viewerInstance.current) {
        viewerInstance.current.destroy();
        viewerInstance.current = null;
      }
    };
  }, []);

  return (
    <section className="pano-section">
      <div className="container">
        <p className="section-eyebrow" style={{ marginBottom: '1rem', textAlign: 'center' }}>Interactive Walkthrough</p>
        <h2 className="pano-heading">Experience the Space</h2>
        <p className="pano-subtext">
          Drag to look around. Click the gold markers to move between rooms.
        </p>
      </div>
      <div className="pano-viewer-wrapper">
        <div ref={viewerRef} className="pano-viewer"></div>
        <div className="pano-room-nav">
          {NODES.map((node) => (
            <button
              key={node.id}
              className="pano-room-btn"
              onClick={() => {
                const vt = viewerInstance.current?.getPlugin(VirtualTourPlugin);
                vt?.setCurrentNode(node.id);
              }}
            >
              {node.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
