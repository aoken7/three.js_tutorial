window.addEventListener("DOMContentLoaded", init);

function init() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#myCanvas"),
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0x222222);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成 (視野角, 画面のアスペクト比, カメラに映る最短距離, カメラに映る最遠距離)
    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
    camera.position.set(0, -400, 70);
    camera.rotation.x = 1.6;

    //地面作成
    const grid = new THREE.GridHelper(10000, 200, 0x444444, 0x444444);
    grid.rotation.x = Math.PI / -2;
    scene.add(grid);

    // 平行光源
    const directionalLight = new THREE.PointLight(
        0xffffff
    );
    directionalLight.position.set(100, -330, 300);
    // シーンに追加
    scene.add(directionalLight);


    // 箱を作成
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({
        color: 0x0000ff,
    });

    // OBJ MTLの読み込み
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load('Torii_large_modified.mtl', (materials) => {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load('Torii_large_modified.obj', function (object) {
            objmodel = object.clone();
            objmodel.scale.set(10, 10, 10);
            objmodel.rotation.set(1.57, 1.57, 0);
            objmodel.position.set(0, 0, 10);

            obj = new THREE.Object3D();
            obj.add(objmodel);

            scene.add(obj);
        });
    });

    tick();

    function tick() {
        requestAnimationFrame(tick);
        // レンダリング
        renderer.render(scene, camera);
    }
}