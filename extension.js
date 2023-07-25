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

  const providerFile = path.join(providersFolder, 'common_provider.dart');
  const assetsFile = path.join(utilsFolder, 'assets.dart');
  const colorsFile = path.join(utilsFolder, 'colors.dart');
  const constantsFile = path.join(utilsFolder, 'constants.dart');
  const responsiveFile = path.join(utilsFolder, 'responsive.dart');
  const stringsFile = path.join(utilsFolder, 'strings.dart');
  const stylesFile = path.join(utilsFolder, 'styles.dart');

  // Create the folders if they don't exist
  fs.mkdirSync(libFolder, { recursive: true });
  fs.mkdirSync(utilsFolder, { recursive: true });
  fs.mkdirSync(providersFolder, { recursive: true });

  // Create files if they don't exist and write content to them
  const providerContent = "import 'package:flutter/material.dart';\n\n"
    "class CommonProvider extends ChangeNotifier {\n"
    "  // Your provider logic and state management code goes here.\n"
    "}\n";
  const assetsContent = "class Assets {\n  Assets._();\n static const String _svgPath = 'assets/svg';\n static const String _imgPath = 'assets/images';}";
  const colorsContent = 'class ColorPalette {\n  ColorPalette._();\n}';
  const constantsContent = 'class Constants {\n  Constants._();\n}';
  const responsiveContent = "import 'package:flutter/material.dart';\n\n"
    "class Responsive extends StatelessWidget {\n"
    "  final Widget? mobile;\n"
    "  final Widget? tablet;\n"
    "  final Widget? desktop;\n"
    "  const Responsive({\n"
    "    Key? key,\n"
    "    this.mobile,\n"
    "    this.tablet,\n"
    "    this.desktop,\n"
    "  }) : super(key: key);\n\n"
    "  static bool isMobile(BuildContext context) =>\n"
    "      MediaQuery.of(context).size.width < 600;\n\n"
    "  static bool isTablet(BuildContext context) =>\n"
    "      MediaQuery.of(context).size.width < 1000 &&\n"
    "      MediaQuery.of(context).size.width >= 600;\n\n"
    "  static bool isDesktop(BuildContext context) =>\n"
    "      MediaQuery.of(context).size.width >= 1000;\n\n"
    "  @override\n"
    "  Widget build(BuildContext context) {\n"
    "    return LayoutBuilder(\n"
    "      builder: (context, constraints) {\n"
    "        if (constraints.maxWidth >= 1000) {\n"
    "          return desktop!;\n"
    "        } else if (constraints.maxWidth >= 600) {\n"
    "          return tablet!;\n"
    "        } else {\n"
    "          return mobile!;\n"
    "        }\n"
    "      },\n"
    "    );\n"
    "  }\n"
    "}\n";
  const stringsContent = 'class Strings {\n  Strings._();\n}';
  const stylesContent = 'class Styles {\n  Styles._();\n}';

  fs.writeFileSync(providerFile, providerContent, { flag: 'wx' });
  fs.writeFileSync(assetsFile, assetsContent, { flag: 'wx' });
  fs.writeFileSync(colorsFile, colorsContent, { flag: 'wx' });
  fs.writeFileSync(constantsFile, constantsContent, { flag: 'wx' });
  fs.writeFileSync(responsiveFile, responsiveContent, { flag: 'wx' });
  fs.writeFileSync(stringsFile, stringsContent, { flag: 'wx' });
  fs.writeFileSync(stylesFile, stylesContent, { flag: 'wx' });

  vscode.window.showInformationMessage('Boilerplate generated successfully!');
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
