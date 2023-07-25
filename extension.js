const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function activate(context) {
  // Register the command
  let disposable = vscode.commands.registerCommand('flutter-boilerplate-generator.generateFiles', () => {
    generateFiles();
  });

  // Add the command to the extension context
  context.subscriptions.push(disposable);
}

function generateFiles() {
  // Get the workspace folder
  const workspaceFolder = vscode.workspace.workspaceFolders[0];

  // Define the folder structure
  const libFolder = path.join(workspaceFolder.uri.fsPath, 'lib');
  const utilsFolder = path.join(libFolder, 'utils');
  const providersFolder = path.join(libFolder, 'providers');
  const colorsFile = path.join(utilsFolder, 'colors.dart');

  // Create the folders if they don't exist
  fs.mkdirSync(libFolder, { recursive: true });
  fs.mkdirSync(utilsFolder, { recursive: true });
  fs.mkdirSync(providersFolder, { recursive: true });

  // Create the colors.dart file if it doesn't exist
  const colorsContent = 'class Colors {\n  Colors._();\n}';
  fs.writeFileSync(colorsFile, colorsContent, { flag: 'wx' });

  vscode.window.showInformationMessage('Files and folders generated successfully!');
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
