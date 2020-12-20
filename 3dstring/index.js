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
    camera.position.set(0, -700, +150);
    camera.rotation.x = 1.5;

    //3D文字作成
    var text; 
    // FontLoaderインスタンスの作成
    var loader = new THREE.FontLoader();
    // フォントのロード
    loader.load('fonts/optimer_regular.typeface.json', function (font) {
        // ここにフォントを読み込んだあとの処理を記述
        // テキストオブジェクトの作成
        // 第1引数に作成する文字を指定し、あとはパラメータ
        // font: 使用するフォント（typeface.jsで作成されたフォント）
        // size: テキストサイズ
        // height: テキストの奥行き
        // curveSegments: 曲線に使用する点の数
        // bevelEnabled: 斜体にするかどうか
        // bevelThickness: 斜体の傾き度
        // bevelSize: アウトラインからどの程度傾けるか
        var textGeometry = new THREE.TextGeometry('NLP', {
            font: font,
            size: 100.0,
            height: 10,
            curveSegments: 10,
            bevelThickness: 3,
            bevelSize: 1.0,
            bevelEnabled: true
        });
        // ジオメトリを中心に移動
        textGeometry.center();

        // マテリアルの作成
        var material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        const edges = new THREE.EdgesGeometry(textGeometry);
        // オブジェクトの作成
        text = new THREE.LineSegments(edges, material);

        // オブジェクトをシーンに追加
        text.rotation.x = Math.PI / 2;
        text.position.z = 100;
        scene.add(text);
    });


    //地面作成
    const grid = new THREE.GridHelper(10000, 200, 0x444444, 0x444444);
    grid.rotation.x = Math.PI / -2;
    scene.add(grid);

    // 平行光源
    const directionalLight = new THREE.DirectionalLight(
        0xffffff
    );
    directionalLight.position.set(1, -1, 1);
    // シーンに追加
    scene.add(directionalLight);


    const radius = 1000;
    let angleRad = 0;
    // 初回実行
    tick();

    function tick() {
        requestAnimationFrame(tick);
        angleRad += 1 * Math.PI / 180;

        text.rotation.y += 0.01;
        // レンダリング
        renderer.render(scene, camera);
    }
}