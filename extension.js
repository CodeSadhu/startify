const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function activate(context) {
  // Register the command
  let disposable = vscode.commands.registerCommand('startify.initiate', () => {
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
  const servicesFolder = path.join(libFolder, 'services');

  // Create folders if they don't exist
  fs.mkdirSync(libFolder, { recursive: true });
  fs.mkdirSync(utilsFolder, { recursive: true });
  fs.mkdirSync(servicesFolder, { recursive: true });

  const assetsContent = "class Assets {\n  Assets._();\n  static const String _svgPath = 'assets/svg';\n  static const String _imgPath = 'assets/images';\n}";

  const colorsContent = "import 'package:flutter/material.dart';\n\nclass ColorPalette {\n  ColorPalette._();\n\n  static const Color white = Colors.white;\n  static const Color black = Colors.black;\n}";

  const constantsContent = "import 'package:flutter/material.dart';\n" +
  "import 'package:url_launcher/url_launcher.dart';\n" +
  "import 'colors.dart';\n" +
  "import 'styles.dart';\n" +
  "\n" +
  "class Constants {\n" +
  "  Constants._();\n" +
  "\n" +
  "  static late SharedPreferencesHelper prefs;\n" +
  "\n" +
  "  static final GlobalKey<NavigatorState> rootKey = GlobalKey<NavigatorState>();\n" +
  "\n" +
  "  static void openLink({required String? url}) async {\n" +
  "    if (url != null) {\n" +
  "      Uri uri = Uri.parse(url);\n" +
  "      if (await canLaunchUrl(uri)) {\n" +
  "        launchUrl(uri);\n" +
  "      }\n" +
  "    }\n" +
  "  }\n" +
  "\n" +
  "  static String? validateEmail(String? email) {\n" +
  "    if (email != null) {\n" +
  "      final emailRegex = RegExp(r'^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)*(\\.[a-z]{2,4})\$');\n" +
  "      if (!emailRegex.hasMatch(email)) {\n" +
  "        return 'Please enter a valid email address';\n" +
  "      }\n" +
  "    }\n" +
  "    return null;\n" +
  "  }\n" +
  "}\n" +
  "\n" +
  "extension ContextExtensions on BuildContext {\n" +
  "  Size get screenSize => MediaQuery.of(this).size;\n" +
  "  ThemeData get themeData => Theme.of(this);\n" +
  "  EdgeInsets get pageMargin => const EdgeInsets.symmetric(vertical: 10);\n" +
  "  EdgeInsets get pagePadding => const EdgeInsets.symmetric(horizontal: 16);\n" +
  "  Future<void> pushPage({required Widget page}) {\n" +
  "    return Navigator.of(this).push(MaterialPageRoute(\n" +
  "      builder: (context) => page,\n" +
  "    ));\n" +
  "  }\n" +
  "  void pushPageReplacement({required Widget page}) {\n" +
  "    Navigator.of(this).pushAndRemoveUntil(\n" +
  "      MaterialPageRoute(\n" +
  "        builder: (context) => page,\n" +
  "      ),\n" +
  "      (route) => false,\n" +
  "    );\n" +
  "  }\n" +
  "  void pushPageReplace({required Widget page}) {\n" +
  "    Navigator.of(this, rootNavigator: true).pushReplacement(\n" +
  "      MaterialPageRoute(\n" +
  "        builder: (context) => page,\n" +
  "      ),\n" +
  "    );\n" +
  "  }\n" +
  "  void popPage({dynamic data}) {\n" +
  "    Navigator.of(this).pop(data);\n" +
  "  }\n" +
  "  void logout() {\n" +
  "    Constants.prefs.reset().then((value) {\n" +
  "      pushPageReplacement(page: YourLoginPageWidget()); // Replace YourLoginPageWidget with your actual login page widget\n" +
  "    });\n" +
  "  }\n" +
  "  void showErrorToast({required String errorMessage}) {\n" +
  "    ScaffoldMessenger.of(this).showSnackBar(\n" +
  "      SnackBar(\n" +
  "        backgroundColor: ColorPalette.white,\n" +
  "        behavior: SnackBarBehavior.floating,\n" +
  "        content: Text(\n" +
  "          errorMessage,\n" +
  "          style: Styles.bodySmall(\n" +
  "            color: Colors.red,\n" +
  "          ),\n" +
  "        ),\n" +
  "        showCloseIcon: true,\n" +
  "        closeIconColor: ColorPalette.textRed,\n" +
  "        // margin: const EdgeInsets.only(left: 10, bottom: 10, right: 10),\n" +
  "        duration: const Duration(milliseconds: 2500),\n" +
  "        elevation: 2,\n" +
  "        shape: RoundedRectangleBorder(\n" +
  "          borderRadius: BorderRadius.circular(16),\n" +
  "        ),\n" +
  "      ),\n" +
  "    );\n" +
  "  }\n" +
  "  void showToast({required String message}) {\n" +
  "    ScaffoldMessenger.of(this).showSnackBar(\n" +
  "      SnackBar(\n" +
  "        backgroundColor: ColorPalette.white,\n" +
  "        behavior: SnackBarBehavior.floating,\n" +
  "        width: screenSize.width * 0.9,\n" +
  "        content: Text(\n" +
  "          message,\n" +
  "          style: Styles.bodySmall(\n" +
  "            fontSize: 12,\n" +
  "            color: ColorPalette.green,\n" +
  "          ),\n" +
  "        ),\n" +
  "        // margin: const EdgeInsets.only(left: 10, bottom: 10, right: 10),\n" +
  "        duration: const Duration(milliseconds: 2500),\n" +
  "        elevation: 2,\n" +
  "        shape: RoundedRectangleBorder(\n" +
  "          borderRadius: BorderRadius.circular(16),\n" +
  "        ),\n" +
  "      ),\n" +
  "    );\n" +
  "  }\n" +
  "  void showToastWithoutDismiss({required String message}) {\n" +
  "    ScaffoldMessenger.of(this).showSnackBar(\n" +
  "      SnackBar(\n" +
  "        backgroundColor: ColorPalette.white,\n" +
  "        behavior: SnackBarBehavior.floating,\n" +
  "        width: screenSize.width * 0.9,\n" +
  "        content: Text(\n" +
  "          message,\n" +
  "          style: Styles.bodySmall(\n" +
  "            fontSize: 12,\n" +
  "            color: ColorPalette.green,\n" +
  "          ),\n" +
  "        ),\n" +
  "        // margin: const EdgeInsets.only(left: 10, bottom: 10, right: 10),\n" +
  "        elevation: 2,\n" +
  "        shape: RoundedRectangleBorder(\n" +
  "          borderRadius: BorderRadius.circular(16),\n" +
  "        ),\n" +
  "      ),\n" +
  "    );\n" +
  "  }\n" +
  "}";

  const responsiveContent = "import 'package:flutter/material.dart';" +
  "class Responsive extends StatelessWidget {" +
  "  final Widget? mobile;" +
  "" +
  "  final Widget? tablet;" +
  "" +
  "  final Widget? desktop;" +
  "" +
  "  const Responsive({" +
  "    Key? key," +
  "    this.mobile," +
  "    this.tablet," +
  "    this.desktop," +
  "  }) : super(key: key);" +
  "" +
  "  static bool isMobile(BuildContext context) =>" +
  "      MediaQuery.of(context).size.width < 600;" +
  "" +
  "  static bool isTablet(BuildContext context) =>" +
  "      MediaQuery.of(context).size.width < 1000 &&" +
  "      MediaQuery.of(context).size.width >= 600;" +
  "" +
  "  static bool isDesktop(BuildContext context) =>" +
  "      MediaQuery.of(context).size.width >= 1000;" +
  "" +
  "  @override" +
  "  Widget build(BuildContext context) {" +
  "    return LayoutBuilder(" +
  "      builder: (context, constraints) {" +
  "        if (constraints.maxWidth >= 1000) {" +
  "          return desktop!;" +
  "        } else if (constraints.maxWidth >= 600) {" +
  "          return tablet!;" +
  "        } else {" +
  "          return mobile!;" +
  "        }" +
  "      }," +
  "    );" +
  "  }" +
  "}";

  const stylesContent = "import 'package:flutter/material.dart';" +
  "import 'colors.dart';" +
  "" +
  "class Styles {" +
  "  Styles._();" +
  "" +
  "  static TextStyle extraLarge({" +
  "    Color? color," +
  "    Color? backgroundColor," +
  "    double? fontSize," +
  "    FontWeight? fontWeight," +
  "    TextDecoration? decoration," +
  "    FontStyle? fontStyle," +
  "    List<Shadow>? shadows," +
  "    String? fontFamily," +
  "  }) {" +
  "    return TextStyle(" +
  "      backgroundColor: backgroundColor," +
  "      fontSize: fontSize ?? 32," +
  "      fontFamily: fontFamily," +
  "      color: color ?? Colors.white," +
  "      fontWeight: fontWeight ?? FontWeight.w600," +
  "      letterSpacing: 0," +
  "      decoration: decoration," +
  "      fontStyle: fontStyle," +
  "      shadows: shadows," +
  "    );" +
  "  }" +
  "" +
  "  static TextStyle appbar({" +
  "    Color? backgroundColor," +
  "    Color? color," +
  "    double? fontSize," +
  "    FontWeight? fontWeight," +
  "    TextDecoration? decoration," +
  "    FontStyle? fontStyle," +
  "    List<Shadow>? shadows," +
  "    String? fontFamily," +
  "  }) {" +
  "    return TextStyle(" +
  "      backgroundColor: backgroundColor," +
  "      fontSize: fontSize ?? 24," +
  "      fontFamily: fontFamily," +
  "      color: color ?? Colors.white," +
  "      fontWeight: fontWeight ?? FontWeight.w600," +
  "      decoration: decoration," +
  "      letterSpacing: 0," +
  "      fontStyle: fontStyle," +
  "      shadows: shadows," +
  "    );" +
  "  }" +
  "" +
  "  static TextStyle bodyLarge({" +
  "    Color? backgroundColor," +
  "    Color? color," +
  "    double? fontSize," +
  "    FontWeight? fontWeight," +
  "    TextDecoration? decoration," +
  "    FontStyle? fontStyle," +
  "    List<Shadow>? shadows," +
  "    String? fontFamily," +
  "  }) {" +
  "    return TextStyle(" +
  "      backgroundColor: backgroundColor," +
  "      fontSize: fontSize ?? 20," +
  "      fontFamily: fontFamily," +
  "      color: color ?? Colors.white," +
  "      fontWeight: fontWeight ?? FontWeight.w600," +
  "      decoration: decoration," +
  "      letterSpacing: 0," +
  "      fontStyle: fontStyle," +
  "      shadows: shadows," +
  "    );" +
  "  }" +
  "" +
  "  static TextStyle bodyMedium({" +
  "    Color? color," +
  "    Color? backgroundColor," +
  "    double? fontSize," +
  "    FontWeight? fontWeight," +
  "    TextDecoration? decoration," +
  "    FontStyle? fontStyle," +
  "    String? fontFamily," +
  "    List<Shadow>? shadows," +
  "  }) {" +
  "    return TextStyle(" +
  "      backgroundColor: backgroundColor," +
  "      fontSize: fontSize ?? 18," +
  "      fontFamily: fontFamily," +
  "      color: color ?? Colors.white," +
  "      fontWeight: fontWeight ?? FontWeight.w500," +
  "      decoration: decoration," +
  "      letterSpacing: 0," +
  "      fontStyle: fontStyle," +
  "      shadows: shadows," +
  "    );" +
  "  }" +
  "" +
  "  static TextStyle bodySmall({" +
  "    Color? color," +
  "    Color? backgroundColor," +
  "    double? fontSize," +
  "    FontWeight? fontWeight," +
  "    TextDecoration? decoration," +
  "    FontStyle? fontStyle," +
  "    List<Shadow>? shadows," +
  "    String? fontFamily," +
  "  }) {" +
  "    return TextStyle(" +
  "      backgroundColor: backgroundColor," +
  "      fontSize: fontSize ?? 14," +
  "      fontFamily: fontFamily," +
  "      color: color ?? Colors.white," +
  "      fontWeight: fontWeight ?? FontWeight.w400," +
  "      decoration: decoration," +
  "      letterSpacing: 0," +
  "      fontStyle: fontStyle," +
  "      shadows: shadows," +
  "    );" +
  "  }" +
  "" +
  "  static TextStyle inputHint({" +
  "    Color? color," +
  "    Color? backgroundColor," +
  "    double? fontSize," +
  "    FontWeight? fontWeight," +
  "    TextDecoration? decoration," +
  "    FontStyle? fontStyle," +
  "    List<Shadow>? shadows," +
  "    String? fontFamily," +
  "  }) {" +
  "    return TextStyle(" +
  "      backgroundColor: backgroundColor," +
  "      fontSize: fontSize ?? 13," +
  "      fontFamily: fontFamily," +
  "      color: color ?? ColorPalette.black," +
  "      fontWeight: fontWeight ?? FontWeight.w400," +
  "      decoration: decoration," +
  "      fontStyle: fontStyle," +
  "      letterSpacing: 0," +
  "      shadows: shadows," +
  "    );" +
  "  }" +
  "" +
  "  static TextStyle inputLabel({" +
  "    Color? color," +
  "    Color? backgroundColor," +
  "    double? fontSize," +
  "    FontWeight? fontWeight," +
  "    TextDecoration? decoration," +
  "    FontStyle? fontStyle," +
  "    List<Shadow>? shadows," +
  "    String? fontFamily," +
  "  }) {" +
  "    return TextStyle(" +
  "      backgroundColor: backgroundColor," +
  "      fontSize: fontSize ?? 13," +
  "      fontFamily: fontFamily," +
  "      color: color ?? ColorPalette.black," +
  "      fontWeight: fontWeight ?? FontWeight.w500," +
  "      decoration: decoration," +
  "      fontStyle: fontStyle," +
  "      letterSpacing: 0," +
  "      shadows: shadows," +
  "    );" +
  "  }" +
  "" +
  "  static TextStyle buttonText({" +
  "    Color? color," +
  "    Color? backgroundColor," +
  "    double? fontSize," +
  "    FontWeight? fontWeight," +
  "    TextDecoration? decoration," +
  "    FontStyle? fontStyle," +
  "    List<Shadow>? shadows," +
  "    String? fontFamily," +
  "  }) {" +
  "    return TextStyle(" +
  "      backgroundColor: backgroundColor," +
  "      fontSize: fontSize ?? 16," +
  "      fontFamily: fontFamily," +
  "      color: color ?? ColorPalette.white," +
  "      fontWeight: fontWeight ?? FontWeight.w600," +
  "      decoration: decoration," +
  "      fontStyle: fontStyle," +
  "      letterSpacing: 0," +
  "      shadows: shadows," +
  "    );" +
  "  }" +
  "" +
  "  static TextStyle header({" +
  "    Color? color," +
  "    Color? backgroundColor," +
  "    double? fontSize," +
  "    FontWeight? fontWeight," +
  "    TextDecoration? decoration," +
  "    FontStyle? fontStyle," +
  "    List<Shadow>? shadows," +
  "    String? fontFamily," +
  "  }) {" +
  "    return TextStyle(" +
  "      backgroundColor: backgroundColor," +
  "      fontSize: fontSize ?? 26," +
  "      fontFamily: fontFamily," +
  "      color: color ?? Colors.white," +
  "      fontWeight: fontWeight ?? FontWeight.bold," +
  "      decoration: decoration," +
  "      letterSpacing: 0," +
  "      fontStyle: fontStyle," +
  "      shadows: shadows," +
  "    );" +
  "  }" +
  "" +
  "  static InputDecoration inputDecoration({" +
  "    String? hintText," +
  "    TextStyle? hintStyle," +
  "    InputBorder? enabledBorder," +
  "    InputBorder? focusedBorder," +
  "    InputBorder? errorBorder," +
  "    bool? filled," +
  "    Color? fillColor," +
  "    Color? prefixIconColor," +
  "    Color? suffixIconColor," +
  "    BoxConstraints? constraints," +
  "    Widget? prefix," +
  "    Widget? suffix," +
  "    Widget? prefixIcon," +
  "    Widget? suffixIcon," +
  "    int? errorMaxLines," +
  "    String? counterText," +
  "    Widget? counter," +
  "    TextStyle? counterTextStyle," +
  "  }) {" +
  "    return InputDecoration(" +
  "      fillColor: fillColor," +
  "      constraints: constraints," +
  "      prefix: prefix," +
  "      suffix: suffix," +
  "      prefixIcon: prefixIcon," +
  "      suffixIcon: suffixIcon," +
  "      prefixIconColor: prefixIconColor," +
  "      suffixIconColor: suffixIconColor," +
  "      filled: fillColor != null ? true : filled," +
  "      errorMaxLines: errorMaxLines," +
  "      errorBorder: errorBorder ??" +
  "          OutlineInputBorder(" +
  "            borderRadius: BorderRadius.circular(16)," +
  "            borderSide: const BorderSide()," +
  "          )," +
  "      focusedErrorBorder: OutlineInputBorder(" +
  "        borderRadius: BorderRadius.circular(16)," +
  "        borderSide: const BorderSide()," +
  "      )," +
  "      errorStyle: Styles.bodySmall(" +
  "        fontSize: 12," +
  "        fontWeight: FontWeight.w400," +
  "      )," +
  "      contentPadding: const EdgeInsets.symmetric(" +
  "        vertical: 5," +
  "        horizontal: 12," +
  "      )," +
  "      border: OutlineInputBorder(" +
  "        borderRadius: BorderRadius.circular(16)," +
  "        borderSide: const BorderSide()," +
  "      )," +
  "      enabledBorder: enabledBorder ??" +
  "          OutlineInputBorder(" +
  "            borderRadius: BorderRadius.circular(16)," +
  "            borderSide: const BorderSide()," +
  "          )," +
  "      focusedBorder: focusedBorder ??" +
  "          OutlineInputBorder(" +
  "            borderRadius: BorderRadius.circular(16)," +
  "            borderSide: const BorderSide()," +
  "          )," +
  "      hintText: hintText," +
  "      hintStyle: hintStyle ??" +
  "          const TextStyle(" +
  "            fontWeight: FontWeight.w400," +
  "            fontSize: 14," +
  "          )," +
  "      counterText: counterText," +
  "      counter: counter," +
  "      counterStyle: counterTextStyle," +
  "    );" +
  "  }" +
  "}";  

   const sharedPrefsContent = "import 'package:shared_preferences/shared_preferences.dart';" +
  "class SharedPreferencesHelper {" +
  "  late SharedPreferences _prefs;" +
  "  Future<void> init() async {" +
  "    _prefs = await SharedPreferences.getInstance();" +
  "  }" +
  "" +
  "  Future<bool> setString(String key, String value) {" +
  "    return _prefs.setString(key, value);" +
  "  }" +
  "" +
  "  String getString(String key, {String? defaultValue}) {" +
  "    var def = defaultValue ?? '';" +
  "    return _prefs.getString(key) ?? def;" +
  "  }" +
  "" +
  "  Future<bool> setInt(String key, int value) {" +
  "    return _prefs.setInt(key, value);" +
  "  }" +
  "" +
  "  int getInt(String key, {int? defaultValue}) {" +
  "    var def = defaultValue ?? 0;" +
  "    return _prefs.getInt(key) ?? def;" +
  "  }" +
  "" +
  "  Future<bool> setDouble(String key, double value) {" +
  "    return _prefs.setDouble(key, value);" +
  "  }" +
  "" +
  "  double getDouble(String key, {required double defaultValue}) {" +
  "    return _prefs.getDouble(key) ?? defaultValue;" +
  "  }" +
  "" +
  "  Future<bool> setBool(String key, bool value) {" +
  "    return _prefs.setBool(key, value);" +
  "  }" +
  "" +
  "  bool getBool(String key, {required bool defaultValue}) {" +
  "    return _prefs.getBool(key) ?? defaultValue;" +
  "  }" +
  "" +
  "  Future<bool> remove(String key) {" +
  "    return _prefs.remove(key);" +
  "  }" +
  "" +
  "  bool containsKey(String key) {" +
  "    return _prefs.containsKey(key);" +
  "  }" +
  "" +
  "  Future<bool> reset() {" +
  "    return _prefs.clear();" +
  "  }" +
  "}";


  // Write content to files
  fs.writeFileSync(path.join(utilsFolder, 'assets.dart'), assetsContent);
  fs.writeFileSync(path.join(utilsFolder, 'colors.dart'), colorsContent);
  fs.writeFileSync(path.join(utilsFolder, 'constants.dart'), constantsContent);
  fs.writeFileSync(path.join(utilsFolder, 'responsive.dart'), responsiveContent);
  fs.writeFileSync(path.join(utilsFolder, 'styles.dart'), stylesContent);
  fs.writeFileSync(path.join(servicesFolder, 'shared_preferences_helper.dart'), sharedPrefsContent);

  vscode.window.showInformationMessage('Flutter boilerplate files generated successfully!');
}

exports.activate = activate;

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate
};
