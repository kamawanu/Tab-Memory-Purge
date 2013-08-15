/* background.htmlで読み込み時に実行するスクリプト */


/**
* この拡張機能外のスクリプトを使って行う初期化処理
*/
function Init()
{
  // オプション(強制終了された場合、起動時に以前の解放されたタブを復元)
  var storageName = 'forcibly_close_restore_checkbox';
  chrome.storage.local.get(storageName, function(storages) {
    // 前回、正常にウインドウが閉じられていなかった場合、
    // 以前の解放済タブの情報が残っていたら復元
    if (storages[storageName] || localStorage[storageName] === 'true') {
      chrome.runtime.sendMessage({ event: 'restore' });
    }
  });
}


/**
 * 拡張機能がインストールされたときの処理
 */
function onInstall() {
  console.log('Extension Installed.');

  // インストール時にオプションページを表示
  chrome.tabs.create({ url: chrome.runtime.getURL('options.html') });
}


/**
 * 拡張機能がアップデートされたときの処理
 */
function onUpdate() {
  console.log('Extension Updated.');
}


/**
 * 拡張機能のバージョンを返す
 * @return {String} 拡張機能のバージョン.
 */
function getVersion() {
  var details = chrome.app.getDetails();
  return details.version;
}

document.addEventListener('DOMContentLoaded', function() {
  // この拡張機能外のスクリプトを使って行う初期化処理
  Init();

  // この拡張機能のバージョンチェック
  var currVersion = getVersion();
  chrome.storage.local.get('version', function(storages) {
    // ver chrome.storage.
    var prevVersion = storages['version'];
    if (currVersion !== prevVersion) {
      // この拡張機能でインストールしたかどうか
      if (prevVersion === void 0) {
        onInstall();
      } else {
        onUpdate();
      }
      chrome.storage.local.set({ 'version': currVersion });
    }
  });
});