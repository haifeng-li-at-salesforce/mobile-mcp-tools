# Uninstalling Mobile SDK npm Packages

If you need to uninstall an npm package, use the npm script.

## Uninstall Global Installations

For global installations, run the following command from any folder:

- **On Mac OS X:**

  ```nolang
  sudo npm uninstall <PACKAGE-NAME> -g
  ```

  Use `sudo` if you lack read-write permissions on the `/usr/local/bin/` directory.

- **On Windows:**

  ```nolang
  npm uninstall <PACKAGE-NAME> -g
  ```

where \<package-name> is replaced by one of the following values:

- forcedroid
- forceios
- forcehybrid
- forcereact

## Uninstall Local Installations

For local installations, run the following command from the folder where you installed the package:

- **On Mac OS X or Windows:**

  ```nolang
  npm uninstall <PACKAGE-NAME>
  ```

where \<package-name> is replaced by one of the following values:

- forcedroid
- forceios
- forcehybrid
- forcereact
