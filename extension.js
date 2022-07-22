// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const {getGetRanges, searchRange} = require('./rangesLogic')

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "my-bracket-select" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('my-bracket-select.helloWorld', function () {
		// The code you place here will be executed every time your command is executed
		const activeEditor = vscode.window.activeTextEditor

		const ranges = getGetRanges(activeEditor.document.languageId)(activeEditor.document.getText())


		const selections = activeEditor.selections
		const newSelections = []

		for (let i = 0; i < selections.length; i++) {
			const offset_active = activeEditor.document.offsetAt(selections[i].active)
			const offset_anchor = activeEditor.document.offsetAt(selections[i].anchor)

			const startEnd = searchRange(ranges, offset_active)

			let newActivePosition
			let newAnchorPosition
			if (offset_anchor < offset_active) {
				// offset_start = offset_anchor
				// offset_end = offset_active
				// reversed
				if (offset_anchor === startEnd[0] + 1 && offset_active === startEnd[1] - 1) {
					newAnchorPosition = activeEditor.document.positionAt(startEnd[0]), newActivePosition = activeEditor.document.positionAt(startEnd[1])
				} else {
					newAnchorPosition = activeEditor.document.positionAt(startEnd[0] + 1), newActivePosition = activeEditor.document.positionAt(startEnd[1] - 1)
				}
			} else {
				// offset_start = offset_active
				// offset_end = offset_anchor
				// not reversed
				if (offset_active === startEnd[0] + 1 && offset_anchor === startEnd[1] - 1) {
					newAnchorPosition = activeEditor.document.positionAt(startEnd[1]), newActivePosition = activeEditor.document.positionAt(startEnd[0])
				} else {
					newAnchorPosition = activeEditor.document.positionAt(startEnd[1] - 1), newActivePosition = activeEditor.document.positionAt(startEnd[0] + 1)
				}
			}

			if (startEnd) {
				newSelections.push(new vscode.Selection(newAnchorPosition, newActivePosition))
			} else {
				newSelections.push(selections[i])
			}

		}
		activeEditor.selections = newSelections

		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from my-bracket-select!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
