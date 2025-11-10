/**
 * Cross-Browser Compatibility Test Script
 * 
 * This script provides automated checks that can be run in any browser's console
 * to verify PDF export functionality works consistently.
 * 
 * Usage:
 * 1. Open the application in the target browser
 * 2. Open browser DevTools console
 * 3. Copy and paste this script
 * 4. Follow the prompts to test PDF generation
 */

interface BrowserInfo {
  name: string;
  version: string;
  userAgent: string;
  platform: string;
}

interface TestResult {
  testName: string;
  status: 'PASS' | 'FAIL' | 'SKIP';
  message: string;
  timestamp: string;
}

class CrossBrowserTester {
  private results: TestResult[] = [];
  private browserInfo: BrowserInfo;

  constructor() {
    this.browserInfo = this.detectBrowser();
  }

  private detectBrowser(): BrowserInfo {
    const ua = navigator.userAgent;
    let name = 'Unknown';
    let version = 'Unknown';

    if (ua.includes('Chrome') && !ua.includes('Edg')) {
      name = 'Chrome';
      const match = ua.match(/Chrome\/(\d+\.\d+)/);
      version = match ? match[1] : 'Unknown';
    } else if (ua.includes('Firefox')) {
      name = 'Firefox';
      const match = ua.match(/Firefox\/(\d+\.\d+)/);
      version = match ? match[1] : 'Unknown';
    } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
      name = 'Safari';
      const match = ua.match(/Version\/(\d+\.\d+)/);
      version = match ? match[1] : 'Unknown';
    } else if (ua.includes('Edg')) {
      name = 'Edge';
      const match = ua.match(/Edg\/(\d+\.\d+)/);
      version = match ? match[1] : 'Unknown';
    }

    return {
      name,
      version,
      userAgent: ua,
      platform: navigator.platform
    };
  }

  private addResult(testName: string, status: 'PASS' | 'FAIL' | 'SKIP', message: string) {
    this.results.push({
      testName,
      status,
      message,
      timestamp: new Date().toISOString()
    });
  }

  private log(message: string, type: 'info' | 'success' | 'error' | 'warn' = 'info') {
    const styles = {
      info: 'color: #3b82f6',
      success: 'color: #10b981',
      error: 'color: #ef4444',
      warn: 'color: #f59e0b'
    };
    console.log(`%c${message}`, styles[type]);
  }

  async runTests() {
    this.log('='.repeat(60), 'info');
    this.log('Cross-Browser Compatibility Test Suite', 'info');
    this.log('='.repeat(60), 'info');
    this.log(`Browser: ${this.browserInfo.name} ${this.browserInfo.version}`, 'info');
    this.log(`Platform: ${this.browserInfo.platform}`, 'info');
    this.log('='.repeat(60), 'info');

    // Test 1: Check if PDF export button exists
    this.testPdfButtonExists();

    // Test 2: Check if required APIs are available
    this.testBrowserAPIs();

    // Test 3: Check if file download is supported
    this.testFileDownloadSupport();

    // Test 4: Check if Blob API works
    this.testBlobAPI();

    // Test 5: Manual PDF generation test
    await this.testPdfGeneration();

    // Display results
    this.displayResults();
  }

  private testPdfButtonExists() {
    const testName = 'PDF Export Button Exists';
    try {
      const button = document.querySelector('[data-testid="export-pdf-button"]') ||
                     document.querySelector('button:has-text("PDF")') ||
                     Array.from(document.querySelectorAll('button')).find(btn => 
                       btn.textContent?.includes('PDF')
                     );

      if (button) {
        this.addResult(testName, 'PASS', 'PDF export button found in DOM');
        this.log('✓ PDF export button found', 'success');
      } else {
        this.addResult(testName, 'FAIL', 'PDF export button not found');
        this.log('✗ PDF export button not found', 'error');
      }
    } catch (error) {
      this.addResult(testName, 'FAIL', `Error: ${error}`);
      this.log(`✗ Error checking button: ${error}`, 'error');
    }
  }

  private testBrowserAPIs() {
    const testName = 'Required Browser APIs Available';
    const requiredAPIs = [
      { name: 'fetch', available: typeof fetch !== 'undefined' },
      { name: 'Blob', available: typeof Blob !== 'undefined' },
      { name: 'atob', available: typeof atob !== 'undefined' },
      { name: 'URL.createObjectURL', available: typeof URL !== 'undefined' && typeof URL.createObjectURL !== 'undefined' }
    ];

    const missingAPIs = requiredAPIs.filter(api => !api.available);

    if (missingAPIs.length === 0) {
      this.addResult(testName, 'PASS', 'All required APIs are available');
      this.log('✓ All required browser APIs available', 'success');
    } else {
      const missing = missingAPIs.map(api => api.name).join(', ');
      this.addResult(testName, 'FAIL', `Missing APIs: ${missing}`);
      this.log(`✗ Missing APIs: ${missing}`, 'error');
    }
  }

  private testFileDownloadSupport() {
    const testName = 'File Download Support';
    try {
      const link = document.createElement('a');
      const supportsDownload = 'download' in link;

      if (supportsDownload) {
        this.addResult(testName, 'PASS', 'Browser supports download attribute');
        this.log('✓ File download supported', 'success');
      } else {
        this.addResult(testName, 'WARN' as any, 'Download attribute not supported, may use fallback');
        this.log('⚠ Download attribute not supported', 'warn');
      }
    } catch (error) {
      this.addResult(testName, 'FAIL', `Error: ${error}`);
      this.log(`✗ Error checking download support: ${error}`, 'error');
    }
  }

  private testBlobAPI() {
    const testName = 'Blob API Functionality';
    try {
      const testData = new Uint8Array([0x25, 0x50, 0x44, 0x46]); // PDF header
      const blob = new Blob([testData], { type: 'application/pdf' });
      
      if (blob.size === 4 && blob.type === 'application/pdf') {
        this.addResult(testName, 'PASS', 'Blob API works correctly');
        this.log('✓ Blob API functional', 'success');
      } else {
        this.addResult(testName, 'FAIL', 'Blob API not working as expected');
        this.log('✗ Blob API issues detected', 'error');
      }
    } catch (error) {
      this.addResult(testName, 'FAIL', `Error: ${error}`);
      this.log(`✗ Blob API error: ${error}`, 'error');
    }
  }

  private async testPdfGeneration() {
    const testName = 'PDF Generation (Manual)';
    this.log('\n📋 Manual Test Required:', 'info');
    this.log('Please click the PDF export button and verify:', 'info');
    this.log('  1. Loading indicator appears', 'info');
    this.log('  2. PDF downloads successfully', 'info');
    this.log('  3. PDF opens without errors', 'info');
    this.log('  4. Text is selectable in the PDF', 'info');
    this.log('  5. Formatting matches the preview', 'info');
    
    this.addResult(testName, 'SKIP', 'Manual verification required');
  }

  private displayResults() {
    this.log('\n' + '='.repeat(60), 'info');
    this.log('Test Results Summary', 'info');
    this.log('='.repeat(60), 'info');

    const passed = this.results.filter(r => r.status === 'PASS').length;
    const failed = this.results.filter(r => r.status === 'FAIL').length;
    const skipped = this.results.filter(r => r.status === 'SKIP').length;

    this.results.forEach(result => {
      const icon = result.status === 'PASS' ? '✓' : result.status === 'FAIL' ? '✗' : '⊘';
      const type = result.status === 'PASS' ? 'success' : result.status === 'FAIL' ? 'error' : 'warn';
      this.log(`${icon} ${result.testName}: ${result.message}`, type);
    });

    this.log('\n' + '-'.repeat(60), 'info');
    this.log(`Total: ${this.results.length} | Passed: ${passed} | Failed: ${failed} | Skipped: ${skipped}`, 'info');
    this.log('='.repeat(60), 'info');

    // Export results
    const exportData = {
      browser: this.browserInfo,
      results: this.results,
      summary: { total: this.results.length, passed, failed, skipped },
      timestamp: new Date().toISOString()
    };

    console.log('\n📊 Export test results (copy this JSON):');
    console.log(JSON.stringify(exportData, null, 2));
  }
}

// Auto-run tests
console.log('Starting cross-browser compatibility tests...');
const tester = new CrossBrowserTester();
tester.runTests();
