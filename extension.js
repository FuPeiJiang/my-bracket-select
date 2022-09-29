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

			if (startEnd) {
				let newActivePosition
				let newAnchorPosition

				let smaller
				let bigger
				if (offset_anchor < offset_active) {
					smaller = offset_anchor, bigger = offset_active
				} else {
					smaller = offset_active, bigger = offset_anchor
				}

				if (smaller === startEnd[0] + 1 && bigger === startEnd[1] - 1) {
					newAnchorPosition = activeEditor.document.positionAt(startEnd[5]), newActivePosition = activeEditor.document.positionAt(startEnd[6])
				} else {
					newAnchorPosition = activeEditor.document.positionAt(startEnd[3]), newActivePosition = activeEditor.document.positionAt(startEnd[4])
				}

				if (offset_anchor < offset_active) {
					newSelections.push(new vscode.Selection(newAnchorPosition, newActivePosition))
				} else {
					newSelections.push(new vscode.Selection(newActivePosition, newAnchorPosition))
				}
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
