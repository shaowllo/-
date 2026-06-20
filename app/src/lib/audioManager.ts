/**
 * 音效管理器 — 使用 Web Audio API 生成合成音效
 * 
 * 无需外部音频文件，纯代码生成沉浸式古籍交互音效
 */

type SoundType = 'pageFlip' | 'scrollUnfold' | 'clickFeedback' | 'hoverReveal' | 'bellChime';

class AudioManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private _muted = false;
  private _initialized = false;
  private _volume = 0.3;

  private getContext(): AudioContext | null {
    if (!this._initialized) return null;
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /** 初始化 — 必须在用户手势（如click）之后调用 */
  init(): void {
    if (this._initialized) return;
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this._volume;
      this.masterGain.connect(this.ctx.destination);
      this._initialized = true;
    } catch {
      // Web Audio API 不可用，静默降级
    }
  }

  /** 播放音效 */
  play(type: SoundType): void {
    if (this._muted || !this._initialized) return;
    const ctx = this.getContext();
    const master = this.masterGain;
    if (!ctx || !master) return;

    switch (type) {
      case 'pageFlip':
        this._playPageFlip(ctx, master);
        break;
      case 'scrollUnfold':
        this._playScrollUnfold(ctx, master);
        break;
      case 'clickFeedback':
        this._playClick(ctx, master);
        break;
      case 'hoverReveal':
        this._playHover(ctx, master);
        break;
      case 'bellChime':
        this._playBell(ctx, master);
        break;
    }
  }

  /** 翻页音效 — 纸页擦过的沙沙声 */
  private _playPageFlip(ctx: AudioContext, dest: GainNode): void {
    const now = ctx.currentTime;
    // 白噪声模拟纸页摩擦
    const bufferSize = ctx.sampleRate * 0.15;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1200;
    filter.Q.value = 1.5;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.02);
    gain.gain.linearRampToValueAtTime(0.05, now + 0.1);
    gain.gain.linearRampToValueAtTime(0, now + 0.15);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(dest);
    source.start(now);
    source.stop(now + 0.15);
  }

  /** 卷轴展开音效 — 低频共鸣 */
  private _playScrollUnfold(ctx: AudioContext, dest: GainNode): void {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.linearRampToValueAtTime(160, now + 0.8);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.2);
    gain.gain.linearRampToValueAtTime(0.04, now + 0.6);
    gain.gain.linearRampToValueAtTime(0, now + 0.8);
    osc.connect(gain);
    gain.connect(dest);
    osc.start(now);
    osc.stop(now + 0.8);
  }

  /** 点击反馈 — 短促清脆 */
  private _playClick(ctx: AudioContext, dest: GainNode): void {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.linearRampToValueAtTime(400, now + 0.06);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.06);
    osc.connect(gain);
    gain.connect(dest);
    osc.start(now);
    osc.stop(now + 0.06);
  }

  /** 悬停揭示 — 轻微金属感 */
  private _playHover(ctx: AudioContext, dest: GainNode): void {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.linearRampToValueAtTime(1800, now + 0.08);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.03, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.08);
    osc.connect(gain);
    gain.connect(dest);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  /** 编钟音效 — 多层泛音模拟古韵 */
  private _playBell(ctx: AudioContext, dest: GainNode): void {
    const now = ctx.currentTime;
    const freqs = [523, 659, 784]; // C5 E5 G5
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.12);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.07, now + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 1.2);
      osc.connect(gain);
      gain.connect(dest);
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 1.2);
    });
  }

  get muted(): boolean { return this._muted; }
  get volume(): number { return this._volume; }

  setMuted(muted: boolean): void {
    this._muted = muted;
  }

  setVolume(vol: number): void {
    this._volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain) {
      this.masterGain.gain.value = this._muted ? 0 : this._volume;
    }
  }

  toggle(): void {
    this._muted = !this._muted;
    if (this.masterGain) {
      this.masterGain.gain.value = this._muted ? 0 : this._volume;
    }
  }
}

/** 全局单例 */
export const audioManager = new AudioManager();
