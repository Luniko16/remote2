/**
 * API Key Management Utility
 * Handles API key rotation and validation
 */

export interface ApiKeyConfig {
  primary: string | undefined;
  backup: string | undefined;
  isEnabled: boolean;
}

export class ApiKeyManager {
  private static instance: ApiKeyManager;
  private keyConfig: ApiKeyConfig;

  private constructor() {
    this.keyConfig = {
      primary: process.env.GOOGLE_GENAI_API_KEY,
      backup: process.env.GOOGLE_GENAI_API_KEY_BACKUP,
      isEnabled: process.env.ENABLE_AI_FEATURES !== 'false'
    };
  }

  public static getInstance(): ApiKeyManager {
    if (!ApiKeyManager.instance) {
      ApiKeyManager.instance = new ApiKeyManager();
    }
    return ApiKeyManager.instance;
  }

  public getActiveKey(): string | null {
    if (!this.keyConfig.isEnabled) {
      return null;
    }
    
    return this.keyConfig.primary || this.keyConfig.backup || null;
  }

  public isAiEnabled(): boolean {
    // For server-side, only check environment variables
    if (typeof window === 'undefined') {
      return this.keyConfig.isEnabled && !!this.getActiveKey();
    }
    
    // For client-side, also check localStorage
    const clientKey = localStorage.getItem('google_ai_api_key');
    return this.keyConfig.isEnabled && (!!this.getActiveKey() || !!clientKey);
  }

  public updateKeys(primary?: string, backup?: string): void {
    if (primary) this.keyConfig.primary = primary;
    if (backup) this.keyConfig.backup = backup;
  }

  public validateKey(key: string): boolean {
    // Basic validation - you can enhance this
    return key.length > 10 && key.startsWith('AIza');
  }

  public getKeyStatus(): {
    hasKey: boolean;
    isEnabled: boolean;
    keySource: 'primary' | 'backup' | 'none';
  } {
    const activeKey = this.getActiveKey();
    let keySource: 'primary' | 'backup' | 'none' = 'none';
    
    if (activeKey) {
      keySource = activeKey === this.keyConfig.primary ? 'primary' : 'backup';
    }

    return {
      hasKey: !!activeKey,
      isEnabled: this.keyConfig.isEnabled,
      keySource
    };
  }
}

export const apiKeyManager = ApiKeyManager.getInstance();