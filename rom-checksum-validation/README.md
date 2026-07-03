# Checksum Validation
Validate your ROM files against known "good copies". This script was created with the help of GitHub Copilot's agent mode, using the Claude 3.5 Sonnet model.

> [!IMPORTANT]
> We are legally obliged to say that downloading ROMs of games you do not own is piracy. We will not provide any files or links to sites where you can download them.

## Instructions
1. Place your ROM files in the `/input-roms` folder.
2. Add your reference `.dat` files to the `database` folder.
3. Adjust the `CHECKSUM_CONFIG` constant to map file extensions to the appropriate database files.
4. Run `node script.js` to validate the files. Valid ROMs will be copied to the `validated-roms` folder and renamed according to the database. To validate without copying files, run `node script.js --skipCopy`.

> [!TIP]
> You can find database files at https://github.com/libretro/libretro-database/, mostly in the `/metadat/no-intro` and `/metadat/redump` folders.
