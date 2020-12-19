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

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成 (視野角, 画面のアスペクト比, カメラに映る最短距離, カメラに映る最遠距離)
    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
    camera.position.set(0, 0, +1000);


    // 箱を作成
    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const material = new THREE.MeshStandardMaterial({
        color: 0x0000ff
    });
    const box = new THREE.Mesh(geometry, material);
    box.position.set(0,0,0);
    scene.add(box);

    // 平行光源
    const directionalLight = new THREE.DirectionalLight(
        0xffffff
    );
    directionalLight.position.set(1, 1, 1);
    // シーンに追加
    scene.add(directionalLight);


    const radius = 1000;
    let angleRad = 0;
    // 初回実行
    tick();

    function tick() {
        requestAnimationFrame(tick);
        angleRad += 2 * Math.PI / 180;
        //const t = new Date().getTime() / 500;
        //console.log(Math.cos(Number(time)));
        // 箱を回転させる
        //box.rotation.x += 0.01;
        //box.rotation.y += 0.01;
        box.position.x = (Math.cos(angleRad)*200);
        box.position.y = (Math.sin(angleRad)*200);
        //box.position.x += 1;
        //amera.rotation.y += 0.01;

        // レンダリング
        renderer.render(scene, camera);
    }
}