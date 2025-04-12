# Checksum Validation
Validate your ROM files against known "good copies". This script was created with the help of Github Copilot's agent mode, using the model Claude 3.5. Sonnet.

> [!IMPORTANT]
> We are legally obliged to say that downloading ROMs of games you do not own is piracy. We won't provide any files or links to sites where you can download them.

## Instructions
1. Drop your ROMs in the `/roms` folder
2. Add your reference `.dat` files in the `database` folder
3. Adjust the `CHECKSUM_CONFIG` constant with proper extension/database mapping
4. Run `node scripts.js` and check the results

> [!TIP]
> You can find some database files in https://github.com/libretro/libretro-database/, mostly in `/metadat/no-intro` and `/metadat/redump` folders.
