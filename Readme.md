﻿# Tab Memory Purge
Google Chrome用のタブ拡張機能です。  

設定した条件にそって、使用していないタブのメモリを解放します。  
HTTPSプロトコルを使用しているサイトでは動作しません(手動使用除く)。

## 注意
デフォルトのままではChromeの仕様のため、拡張機能を無効にすると解放していたタブが閉じてしまいます。注意してください。  
これは、解放に使うページが拡張機能内にあることによるものです。  
閉じられてしまった場合、直後ならポップアップメニューの「緊急時復元」ボタンから復元することができます。  
また、これを回避するためにはオプションページの「解放時に使用するページ」でローカルファイルを設定すれば回避することが可能です。

## 設定可能項目
- 解放時に使用するページ
    - ローカルファイルを指定することにより拡張機能が無効時に閉じられてしまう問題を回避可能。
- 非アクティブのタブをアンロードする時間
    - 前回アクティブになった時間から設定した時間が過ぎると、メモリを解放します。
- 除外するアドレス(正規表現対応)
    - 動作対象外のサイトを指定できます。
    
## 簡単な仕様
- タブごとにsetIntervalを設定し、指定したアンロード時間ごとにアンロードするか否かを判断。
- タブをアクティブにすると、時間はリセット。
- アンロードする場合、空ページを読み込み、メモリを解放します。
- この時に使用する空ページは拡張機能のパッケージ内部に含まれています。
- 現在のタブが除外リストに追加されているかどうかでツールバーのアイコンが変化します。
    - 赤× = ユーザが指定した除外リストにマッチ
    - 黄× = 拡張機能内で固定された除外リスト
    - 緑× = 一時的な除外リストにマッチ
    - なにもなし = どの除外リストにもマッチしませんでした。
- デフォルトの設定では、Chrome側の仕様により、拡張機能のアップデート時に解放されたタブが閉じてしまいますが、拡張機能側でアップデート後に自動的に復元するようになっています。
- 上記の問題を回避するには、オプションページの「解放時に使用するページ」にローカルファイルを設定すれば回避が可能です。外部URLにも一応対応していますが、この設定を外部URLのものに使用するようになってしまうと、下記の問題が発生するのでおすすめしません。それでも利用するのであれば、HTTPS接続によるものをおすすめします。
 1. **解放処理に常にネット接続が必要になること**
 2. **解放処理に使うページをおいてあるサーバが落ちると復元できない場合がある**
 3. 外部サイトに情報が流れる(どこサイトを解放処理したか程度なのでほとんど問題なし)。

## 更新履歴
1.5.0  
ポップアップメニューに「全ての解放されているタブを復元」ボタンの追加。  
オプションメニューに「解放時に使用するぺージ」の追加。この設定でローカルファイルを指定することにより注意事項の回避が可能。  
上記の使用ファイルのサンプルを追加。オプションページの上記項目のサンプルの項目よりダウンロード可能。
以前よりあった小さいバグの修正。
