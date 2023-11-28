// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "bacon-ipsum-vscode" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('bacon-ipsum-vscode.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Bacon Ipsum Vscode!');
	});

  let baconIpsum = vscode.commands.registerTextEditorCommand('bacon-ipsum-vscode.generateBacon', async (editor, edit) => {
    const response = await fetch("https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1");
    const texts = await response.json() as string[];
    editor.edit(currentEditor => {
      currentEditor.insert(editor.selection.active, texts.join("\n"));
    });
    
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(baconIpsum);
}

// This method is called when your extension is deactivated
export function deactivate() {}
