import {
  Account,
  Chain,
  Clarinet,
  Tx,
  types,
} from "https://deno.land/x/clarinet@v0.13.0/index.ts";

import { 
  OracleManager,
  UsdaToken,
  XstxManager,
  DikoToken
} from './models/arkadiko-tests-tokens.ts';

import { 
  VaultManager,
  VaultLiquidatorV3,
  VaultAuctionV3 
} from './models/arkadiko-tests-vaults.ts';

import * as Utils from './models/arkadiko-tests-utils.ts'; Utils;

Clarinet.test({ name: "auction engine: liquidate vault",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet_1 = accounts.get("wallet_1")!;

    let oracleManager = new OracleManager(chain, deployer);
    let usdaToken = new UsdaToken(chain, deployer);
    let xstxManager = new XstxManager(chain, deployer);
    let vaultManager = new VaultManager(chain, deployer);
    let vaultLiquidator = new VaultLiquidatorV3(chain, deployer);
    let vaultAuction = new VaultAuctionV3(chain, deployer);

    // Initialize price of STX to $2 in the oracle
    let result = oracleManager.updatePrice("STX", 3);
    result = oracleManager.updatePrice("xSTX", 3);

    // Create vault - 1500 STX, 1000 USDA
    result = vaultManager.createVault(deployer, "STX-A", 1500, 1000);
    result.expectOk().expectUintWithDecimals(1000);

    // Upate price to $1.0
    result = oracleManager.updatePrice("STX", 1);
    result = oracleManager.updatePrice("xSTX", 1);

    // Deposit 10K USDA in the auction engine
    result = vaultAuction.deposit(wallet_1, 10000);
    result.expectOk().expectBool(true);

    // Check total USDA supply
    let call = await usdaToken.totalSupply();
    call.result.expectOk().expectUintWithDecimals(4001000.000010);

    // Notify risky! Should burn all USDA from the vault.
    result = vaultLiquidator.notifyRiskyVault(deployer);
    result.expectOk().expectUint(5200);

    // Check auction parameters
    let auction:any = await vaultAuction.getAuctionById(1);
    console.log(auction.result);
    auction.result.expectTuple()['collateral-amount'].expectUintWithDecimals(1500);
    auction.result.expectTuple()['debt-to-raise'].expectUintWithDecimals(1000); // Raise 1000 USDA and give a 10% discount on the collateral

    // Auction closed
    call = await vaultAuction.getAuctionOpen(1, wallet_1);
    call.result.expectBool(false);

    // Auction info
    call = await vaultManager.getVaultById(1, wallet_1);
    let vault:any = call.result.expectTuple();
    vault['leftover-collateral'].expectUintWithDecimals(388.888889);
    vault['is-liquidated'].expectBool(true);
    vault['auction-ended'].expectBool(true);

    // call = await usdaToken.totalSupply();
    // call.result.expectOk().expectUintWithDecimals(4000000.000010);

    // // now check the wallet of contract - should have burned all required USDA, and have some left for burning gov tokens
    // call = await usdaToken.balanceOf(Utils.qualifiedName('arkadiko-auction-engine-v2-1'));
    // call.result.expectOk().expectUintWithDecimals(61); // 61 dollars left

    // call = await xstxManager.balanceOf(deployer.address);
    // call.result.expectOk().expectUint(0);

    // // now try withdrawing the xSTX tokens that are not mine
    // result = vaultAuction.redeemLotCollateralXstx(wallet_1);
    // result.expectErr().expectUint(2403);

    // // now try withdrawing the xSTX tokens that are mine
    // result = vaultAuction.redeemLotCollateralXstx(deployer);
    // result.expectOk().expectBool(true);

    // // now try withdrawing the xSTX tokens again
    // result = vaultAuction.redeemLotCollateralXstx(deployer);
    // result.expectErr().expectUint(211);

    // call = await xstxManager.balanceOf(deployer.address);
    // call.result.expectOk().expectUintWithDecimals(1075.268817);

    // // At this point, no STX are redeemable yet
    // call = await vaultManager.getStxRedeemable();
    // call.result.expectOk().expectUint(0);

    // // Release stacked STX and make them redeemable
    // result = vaultManager.releaseStackedStx();
    // result.expectOk().expectBool(true);

    // // Original vault had 1500 STX which is now redeemable
    // call = await vaultManager.getStxRedeemable();
    // call.result.expectOk().expectUintWithDecimals(1500);
    
    // // Redeem STX - too much
    // result = vaultManager.redeemStx(deployer, 1694.444444);
    // result.expectErr().expectUint(1); // Can not burn

    // // Redeem STX - 0
    // result = vaultManager.redeemStx(deployer, 0);
    // result.expectErr().expectUint(1); // Can not mint/burn 0

    // // Redeem STX - all
    // result = vaultManager.redeemStx(deployer, 1041);
    // result.expectOk().expectBool(true);

    // // Balance
    // call = await xstxManager.balanceOf(deployer.address);
    // call.result.expectOk().expectUint(34268817); // just 0.34268817 left over

    // // Withdraw leftover collateral
    // result = vaultManager.withdrawLeftoverCollateral(deployer);
    // result.expectOk().expectBool(true);
  }
});
