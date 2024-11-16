import { generateCst } from './generateCst';
import { flattenCst } from './flattenCst';
import { renderTokens } from './renderTokens';

const variations = [
  `# Test comment`,
  `# Test comment\ndummy = "value"`,
  `dummy="value"`,
  `bare=string`,
  `_pkgname=kchat`,
  `dummy = "value"\n#Test comment`,
  `\n\ndummy = "value"\n#Test comment`,
  `dummy = 123`,
  `dummy = 1.2.3`,
  `pkgname="\${_pkgname}-appimage"`,
  `url="https://www.infomaniak.com/en/apps/download-kchat"`,
  `options=(!strip)`,
  `_appimage="\${pkgname}-\${pkgver}.AppImage"`,
  `noextract=("\${_appimage}")`,
  `multiple=("hello uhu uhuh \${_appimage} asdasdasd \${asdasdas}")`,
  `license=('custom:Unlicense')`,
  `chmod -R a-x+rX squashfs-root/usr`,
  `chmod -R a-x+rX squashfs-root/usr \\
-More`,
  `chmod -R a-x+rX squashfs-root/usr \\
-More
dummy = 1.2.3`,
  `build() {
    # Adjust .desktop so it will work outside of AppImage container
    sed -i -E "s|Exec=AppRun|Exec=env DESKTOPINTEGRATION=false /usr/bin/\${_pkgname}|"\
        "squashfs-root/\${_pkgname}-desktop.desktop"
    # Fix permissions; .AppImage permissions are 700 for all directories
    chmod -R a-x+rX squashfs-root/usr
}`,
  `pkgdesc="Test"
arch='ohoh'`,
  `prepare() {
    chmod +x "\${_appimage}"
    ./"\${_appimage}" --appimage-extract
}`,
];

describe('renderTokens.ts', () => {
  it('should render tokens', () => {
    variations.forEach((input) => {
      const { cst } = generateCst(input);
      if (!cst) throw new Error('CST is undefined');
      const flattened = flattenCst(cst);
      const result = renderTokens(flattened);

      expect(result).toMatch(input);
    });
  });
});
