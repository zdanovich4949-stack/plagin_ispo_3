const vscode = require('vscode');
const decorationType = vscode.window.createTextEditorDecorationType({
	backgroundColor: 'rgba(255, 0, 0, 0.3)'
});
function Words(){
	const a = vscode.window.activeTextEditor;
	if (!a){
		return;
	}
	const text = a.document.getText();
	const find = /\bISRPO\b/g;
	const r = [...text.matchAll(find)].map((match) => {
		const start = a.document.positionAt(match.index);
		const end = a.document.positionAt(match.index + match[0].length);
		return new vscode.Range(start,end);
	});
	a.setDecorations(decorationType, r);
}
function change(context){
	vscode.workspace.onDidChangeTextDocument(() => Words(), null, context.subscriptions);
	vscode.window.onDidChangeActiveTextEditor(() => Words(), null, context.subscriptions);
	Words();
}
function activate(context){
	console.log('Расширение "Подсветчик" активировано!');
	change(context);
}
function deactivate() {}
module.exports = {
	activate,
	deactivate
};