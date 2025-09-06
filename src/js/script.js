/**
 * 為替レート変換計算機
 * モバイル向け通貨変換アプリケーション
 */

class ExchangeRateCalculator {
    constructor() {
        console.log('ExchangeRateCalculator: 初期化開始');
        
        // 設定のデフォルト値
        this.defaultSettings = {
            baseCurrency: 'JPY',
            targetCurrency1: 'NTD',
            targetRate1: null,
            targetCurrency2: 'USD',
            targetRate2: null
        };
        
        // 現在の設定
        this.settings = {};
        
        // DOM要素への参照
        this.elements = {
            // 設定関連
            settingsPanel: document.getElementById('settingsPanel'),
            settingsContent: document.getElementById('settingsContent'),
            settingsArrow: document.getElementById('settingsArrow'),
            baseCurrency: document.getElementById('baseCurrency'),
            targetCurrency1: document.getElementById('targetCurrency1'),
            targetRate1: document.getElementById('targetRate1'),
            targetCurrency2: document.getElementById('targetCurrency2'),
            targetRate2: document.getElementById('targetRate2'),
            
            // 変換関連
            conversionFields: document.getElementById('conversionFields'),
            setupRequired: document.getElementById('setupRequired'),
            baseCurrencyLabel: document.getElementById('baseCurrencyLabel'),
            target1CurrencyLabel: document.getElementById('target1CurrencyLabel'),
            target2CurrencyLabel: document.getElementById('target2CurrencyLabel'),
            baseAmount: document.getElementById('baseAmount'),
            target1Amount: document.getElementById('target1Amount'),
            target2Amount: document.getElementById('target2Amount')
        };
        
        // 初期化
        this.init();
    }
    
    /**
     * アプリケーションの初期化
     */
    init() {
        console.log('ExchangeRateCalculator: 初期化実行中...');
        
        // 設定を読み込み
        this.loadSettings();
        
        // イベントリスナーの設定
        this.setupEventListeners();
        
        // UIの初期状態を設定
        this.updateUI();
        
        console.log('ExchangeRateCalculator: 初期化完了');
    }
    
    /**
     * localStorageから設定を読み込み
     */
    loadSettings() {
        console.log('ExchangeRateCalculator: 設定読み込み開始');
        
        try {
            const savedSettings = localStorage.getItem('exchangeRateSettings');
            if (savedSettings) {
                this.settings = JSON.parse(savedSettings);
                console.log('ExchangeRateCalculator: 保存済み設定を読み込み', this.settings);
            } else {
                this.settings = { ...this.defaultSettings };
                console.log('ExchangeRateCalculator: デフォルト設定を使用', this.settings);
            }
        } catch (error) {
            console.error('ExchangeRateCalculator: 設定読み込みエラー', error);
            this.settings = { ...this.defaultSettings };
        }
        
        // UI要素に設定値を反映
        this.populateSettingsForm();
    }
    
    /**
     * 設定フォームに値を入力
     */
    populateSettingsForm() {
        console.log('ExchangeRateCalculator: 設定フォームに値を入力');
        
        this.elements.baseCurrency.value = this.settings.baseCurrency || this.defaultSettings.baseCurrency;
        this.elements.targetCurrency1.value = this.settings.targetCurrency1 || this.defaultSettings.targetCurrency1;
        this.elements.targetRate1.value = this.settings.targetRate1 || '';
        this.elements.targetCurrency2.value = this.settings.targetCurrency2 || this.defaultSettings.targetCurrency2;
        this.elements.targetRate2.value = this.settings.targetRate2 || '';
    }
    
    /**
     * イベントリスナーの設定
     */
    setupEventListeners() {
        console.log('ExchangeRateCalculator: イベントリスナー設定中...');
        
        // 通貨入力フィールドのイベント
        this.elements.baseAmount.addEventListener('input', (e) => this.handleAmountChange('base', e.target.value));
        this.elements.target1Amount.addEventListener('input', (e) => this.handleAmountChange('target1', e.target.value));
        this.elements.target2Amount.addEventListener('input', (e) => this.handleAmountChange('target2', e.target.value));
        
        // 通貨コード入力の大文字変換
        this.elements.baseCurrency.addEventListener('input', (e) => {
            e.target.value = e.target.value.toUpperCase();
        });
        this.elements.targetCurrency1.addEventListener('input', (e) => {
            e.target.value = e.target.value.toUpperCase();
        });
        this.elements.targetCurrency2.addEventListener('input', (e) => {
            e.target.value = e.target.value.toUpperCase();
        });
        
        console.log('ExchangeRateCalculator: イベントリスナー設定完了');
    }
    
    /**
     * 金額入力時の処理
     */
    handleAmountChange(source, value) {
        console.log(`ExchangeRateCalculator: 金額変更 - ${source}: ${value}`);
        
        if (!value || isNaN(value) || value <= 0) {
            console.log('ExchangeRateCalculator: 無効な値のため変換をスキップ');
            return;
        }
        
        const amount = parseFloat(value);
        
        try {
            switch (source) {
                case 'base':
                    this.convertFromBase(amount);
                    break;
                case 'target1':
                    this.convertFromTarget1(amount);
                    break;
                case 'target2':
                    this.convertFromTarget2(amount);
                    break;
            }
        } catch (error) {
            console.error('ExchangeRateCalculator: 変換エラー', error);
        }
    }
    
    /**
     * 基準通貨から他通貨への変換
     */
    convertFromBase(baseAmount) {
        console.log(`ExchangeRateCalculator: 基準通貨から変換 - ${baseAmount} ${this.settings.baseCurrency}`);
        
        if (this.settings.targetRate1 && !isNaN(this.settings.targetRate1)) {
            const target1Amount = baseAmount * parseFloat(this.settings.targetRate1);
            this.elements.target1Amount.value = target1Amount.toFixed(2);
            console.log(`ExchangeRateCalculator: ${this.settings.targetCurrency1} = ${target1Amount.toFixed(2)}`);
        }
        
        if (this.settings.targetRate2 && !isNaN(this.settings.targetRate2)) {
            const target2Amount = baseAmount * parseFloat(this.settings.targetRate2);
            this.elements.target2Amount.value = target2Amount.toFixed(2);
            console.log(`ExchangeRateCalculator: ${this.settings.targetCurrency2} = ${target2Amount.toFixed(2)}`);
        }
    }
    
    /**
     * 対象通貨1から他通貨への変換
     */
    convertFromTarget1(target1Amount) {
        console.log(`ExchangeRateCalculator: ${this.settings.targetCurrency1}から変換 - ${target1Amount}`);
        
        if (this.settings.targetRate1 && !isNaN(this.settings.targetRate1)) {
            const rate1 = parseFloat(this.settings.targetRate1);
            const baseAmount = target1Amount / rate1;
            this.elements.baseAmount.value = baseAmount.toFixed(2);
            console.log(`ExchangeRateCalculator: ${this.settings.baseCurrency} = ${baseAmount.toFixed(2)}`);
            
            // target2も更新
            if (this.settings.targetRate2 && !isNaN(this.settings.targetRate2)) {
                const target2Amount = baseAmount * parseFloat(this.settings.targetRate2);
                this.elements.target2Amount.value = target2Amount.toFixed(2);
                console.log(`ExchangeRateCalculator: ${this.settings.targetCurrency2} = ${target2Amount.toFixed(2)}`);
            }
        }
    }
    
    /**
     * 対象通貨2から他通貨への変換
     */
    convertFromTarget2(target2Amount) {
        console.log(`ExchangeRateCalculator: ${this.settings.targetCurrency2}から変換 - ${target2Amount}`);
        
        if (this.settings.targetRate2 && !isNaN(this.settings.targetRate2)) {
            const rate2 = parseFloat(this.settings.targetRate2);
            const baseAmount = target2Amount / rate2;
            this.elements.baseAmount.value = baseAmount.toFixed(2);
            console.log(`ExchangeRateCalculator: ${this.settings.baseCurrency} = ${baseAmount.toFixed(2)}`);
            
            // target1も更新
            if (this.settings.targetRate1 && !isNaN(this.settings.targetRate1)) {
                const target1Amount = baseAmount * parseFloat(this.settings.targetRate1);
                this.elements.target1Amount.value = target1Amount.toFixed(2);
                console.log(`ExchangeRateCalculator: ${this.settings.targetCurrency1} = ${target1Amount.toFixed(2)}`);
            }
        }
    }
    
    /**
     * 設定の保存
     */
    saveSettings() {
        console.log('ExchangeRateCalculator: 設定保存開始');
        
        // バリデーション
        const baseCurrency = this.elements.baseCurrency.value.trim().toUpperCase();
        const targetCurrency1 = this.elements.targetCurrency1.value.trim().toUpperCase();
        const targetRate1 = this.elements.targetRate1.value.trim();
        const targetCurrency2 = this.elements.targetCurrency2.value.trim().toUpperCase();
        const targetRate2 = this.elements.targetRate2.value.trim();
        
        // 入力検証
        const errors = this.validateSettings(baseCurrency, targetCurrency1, targetRate1, targetCurrency2, targetRate2);
        
        if (errors.length > 0) {
            console.error('ExchangeRateCalculator: 設定保存エラー', errors);
            this.showError(errors.join('\n'));
            return false;
        }
        
        // 設定を更新
        this.settings = {
            baseCurrency,
            targetCurrency1,
            targetRate1: parseFloat(targetRate1),
            targetCurrency2,
            targetRate2: parseFloat(targetRate2)
        };
        
        try {
            localStorage.setItem('exchangeRateSettings', JSON.stringify(this.settings));
            console.log('ExchangeRateCalculator: 設定保存完了', this.settings);
            
            this.showSuccess('設定が保存されました！');
            this.updateUI();
            this.toggleSettings(); // 設定パネルを折りたたむ
            
            return true;
        } catch (error) {
            console.error('ExchangeRateCalculator: localStorage保存エラー', error);
            this.showError('設定の保存に失敗しました。');
            return false;
        }
    }
    
    /**
     * 設定のバリデーション
     */
    validateSettings(baseCurrency, targetCurrency1, targetRate1, targetCurrency2, targetRate2) {
        const errors = [];
        
        // 通貨コード検証
        if (!baseCurrency || baseCurrency.length !== 3) {
            errors.push('自国通貨は3文字で入力してください');
        }
        
        if (!targetCurrency1 || targetCurrency1.length !== 3) {
            errors.push('変換対象通貨1は3文字で入力してください');
        }
        
        if (!targetCurrency2 || targetCurrency2.length !== 3) {
            errors.push('変換対象通貨2は3文字で入力してください');
        }
        
        // レート検証
        if (!targetRate1 || isNaN(targetRate1) || parseFloat(targetRate1) <= 0) {
            errors.push('変換対象通貨1のレートは正の数値で入力してください');
        }
        
        if (!targetRate2 || isNaN(targetRate2) || parseFloat(targetRate2) <= 0) {
            errors.push('変換対象通貨2のレートは正の数値で入力してください');
        }
        
        // 通貨の重複チェック
        if (baseCurrency === targetCurrency1 || baseCurrency === targetCurrency2 || targetCurrency1 === targetCurrency2) {
            errors.push('同じ通貨コードは使用できません');
        }
        
        return errors;
    }
    
    /**
     * UIの更新
     */
    updateUI() {
        console.log('ExchangeRateCalculator: UI更新中...');
        
        const isConfigured = this.isConfigured();
        
        if (isConfigured) {
            // 変換パネルを表示
            this.elements.conversionFields.classList.remove('hidden');
            this.elements.setupRequired.classList.add('hidden');
            
            // ラベルを更新
            this.elements.baseCurrencyLabel.textContent = this.settings.baseCurrency;
            this.elements.target1CurrencyLabel.textContent = this.settings.targetCurrency1;
            this.elements.target2CurrencyLabel.textContent = this.settings.targetCurrency2;
            
            console.log('ExchangeRateCalculator: 変換機能を有効化');
        } else {
            // セットアップ必須メッセージを表示
            this.elements.conversionFields.classList.add('hidden');
            this.elements.setupRequired.classList.remove('hidden');
            
            console.log('ExchangeRateCalculator: 設定が不完全なため変換機能を無効化');
        }
    }
    
    /**
     * 設定が完了しているかチェック
     */
    isConfigured() {
        return this.settings.baseCurrency &&
               this.settings.targetCurrency1 &&
               this.settings.targetCurrency2 &&
               this.settings.targetRate1 > 0 &&
               this.settings.targetRate2 > 0;
    }
    
    /**
     * 設定パネルの表示/非表示切り替え
     */
    toggleSettings() {
        console.log('ExchangeRateCalculator: 設定パネル切り替え');
        
        const content = this.elements.settingsContent;
        const arrow = this.elements.settingsArrow;
        
        if (content.classList.contains('collapsed')) {
            // 展開
            content.classList.remove('collapsed');
            arrow.style.transform = 'rotate(180deg)';
            console.log('ExchangeRateCalculator: 設定パネル展開');
        } else {
            // 折りたたむ
            content.classList.add('collapsed');
            arrow.style.transform = 'rotate(0deg)';
            console.log('ExchangeRateCalculator: 設定パネル折りたたみ');
        }
    }
    
    /**
     * すべての入力フィールドをクリア
     */
    clearAllFields() {
        console.log('ExchangeRateCalculator: 全フィールドクリア');
        
        this.elements.baseAmount.value = '';
        this.elements.target1Amount.value = '';
        this.elements.target2Amount.value = '';
    }
    
    /**
     * エラーメッセージ表示
     */
    showError(message) {
        console.error('ExchangeRateCalculator: エラー表示', message);
        alert(`エラー: ${message}`);
    }
    
    /**
     * 成功メッセージ表示
     */
    showSuccess(message) {
        console.log('ExchangeRateCalculator: 成功メッセージ', message);
        // 簡易的な成功表示（実際のアプリではtoastなどを使用）
        alert(message);
    }
}

// グローバル関数（HTMLから呼び出されるため）
let calculator;

/**
 * 設定の保存
 */
function saveSettings() {
    console.log('saveSettings: 設定保存関数呼び出し');
    if (calculator) {
        calculator.saveSettings();
    }
}

/**
 * 設定パネルの切り替え
 */
function toggleSettings() {
    console.log('toggleSettings: 設定パネル切り替え関数呼び出し');
    if (calculator) {
        calculator.toggleSettings();
    }
}

/**
 * すべてのフィールドをクリア
 */
function clearAllFields() {
    console.log('clearAllFields: クリア関数呼び出し');
    if (calculator) {
        calculator.clearAllFields();
    }
}

// DOMの読み込み完了後に初期化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded: アプリケーション初期化開始');
    calculator = new ExchangeRateCalculator();
    console.log('DOMContentLoaded: アプリケーション初期化完了');
});