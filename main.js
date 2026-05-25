import { TILE_SIZE, map } from "./map.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// プレイヤーの初期位置（タイル座標）
const player = {
    x: 1,
    y: 1
};

// 描画関数
function draw() {
    // 画面をクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // マップの描画
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === 1) {
                // 壁（赤色）
                ctx.fillStyle = "#ff4d4d";
            } else {
                // 床（暗いグレー）
                ctx.fillStyle = "#333333";
            }
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE - 1, TILE_SIZE - 1);
        }
    }

    // プレイヤーの描画（緑色）
    ctx.fillStyle = "#4dff4d";
    ctx.fillRect(player.x * TILE_SIZE, player.y * TILE_SIZE, TILE_SIZE - 1, TILE_SIZE - 1);
}

// 移動を試みる関数（衝突判定つき）
function movePlayer(dx, dy) {
    const nextX = player.x + dx;
    const nextY = player.y + dy;

    // 移動先がマップの範囲内か、かつ壁（1）ではないかチェック
    if (
        nextY >= 0 && nextY < map.length &&
        nextX >= 0 && nextX < map[0].length &&
        map[nextY][nextX] !== 1
    ) {
        player.x = nextX;
        player.y = nextY;
    }
}

// キーボード入力のイベントリスナー
window.addEventListener("keydown", function(event) {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        event.preventDefault();
    }

    switch(event.key) {
        case "ArrowUp":
            movePlayer(0, -1);
            break;
        case "ArrowDown":
            movePlayer(0, 1);
            break;
        case "ArrowLeft":
            movePlayer(-1, 0);
            break;
        case "ArrowRight":
            movePlayer(1, 0);
            break;
    }

    // 移動後に再描画
    draw();
});

// 初回描画の実行
draw();