import React, {
  useRef,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import {
  ViewerApp,
  AssetManagerPlugin,
  GBufferPlugin,
  timeout,
  ProgressivePlugin,
  TonemapPlugin,
  SSRPlugin,
  SSAOPlugin,
  DiamondPlugin,
  FrameFadePlugin,
  GLTFAnimationPlugin,
  GroundPlugin,
  BloomPlugin,
  TemporalAAPlugin,
  AnisotropyPlugin,
  GammaCorrectionPlugin,
  addBasePlugins,
   TweakpaneUiPlugin, AssetManagerBasicPopupPlugin, CanvasSnipperPlugin,
} from "webgi";

function WebgiViewer () {
  const canvasRef = useRef(null);
  const setupViewer = useCallback(async () => {
    // Initialize the viewer
    const viewer = new ViewerApp({
      canvas: canvasRef.current,
    });
    // Add some plugins
    const manager = await viewer.addPlugin(AssetManagerPlugin);
    const camera = viewer.scene.activeCamera;
    const position = camera.position;
    const target = camera.target;
    // Add plugins individually.
    await viewer.addPlugin(GBufferPlugin);
    await viewer.addPlugin(new ProgressivePlugin(32));
    await viewer.addPlugin(new TonemapPlugin(true));
    await viewer.addPlugin(GammaCorrectionPlugin);
    await viewer.addPlugin(SSRPlugin);
    await viewer.addPlugin(SSAOPlugin);
    // This must be called once after all plugins are added.
    viewer.renderer.refreshPipeline();

    // Import and add a GLB file.
    const assets = await manager.addFromPath("scene-black.glb");

    viewer.getPlugin(TonemapPlugin).config.clipBackground = true;
    // Load an environment map if not set in the glb file
    // await viewer.setEnvironmentMap((await manager.importer!.importSinglePath<ITexture>("./assets/environment.hdr"))!);
    viewer.scene.activeCamera.setCameraOptions({ controlEnabled: false });
    window.scrollTo(0, 0);
    let needsUpdate = true;
    const onUpdate = () => {
        needsUpdate = true;
        viewer.setDirty();
    }
    viewer.addEventListener("preFrame", () => {
        if (needsUpdate) {
            camera.positionTargetUpdated(true);
            needsUpdate = false;
        }
    });
    memoizedScrollAnimation(position, target, onUpdate);
  }, []);
  useEffect(() => {
    setupViewer();
  }, []);
  return (
    <div id="webgi-canvas-container">
    <canvas id="webgi-canvas" ref={canvasRef} />
  </div>
  )
}

export default WebgiViewer
