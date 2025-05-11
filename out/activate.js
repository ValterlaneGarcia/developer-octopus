"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
context.subscriptions.push(vscode.window.registerWebviewViewProvider("developer-octopus-tabs", {
    resolveWebviewView(webviewView) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [context.extensionUri]
        };
        webviewView.webview.html = getTabsWebviewContent();
        webviewView.webview.onDidReceiveMessage(message => {
            if (message.command === 'openFile') {
                const uri = vscode.Uri.file(message.path);
                vscode.window.showTextDocument(uri);
            }
        });
    }
}));
//# sourceMappingURL=activate.js.map