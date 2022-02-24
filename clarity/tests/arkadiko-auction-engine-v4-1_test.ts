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
  VaultAuctionV4 
} from './models/arkadiko-tests-vaults.ts';

import { 
  LiquidationPool,
  LiquidationRewards
} from './models/arkadiko-tests-liquidation-fund.ts';


import * as Utils from './models/arkadiko-tests-utils.ts'; Utils;

Clarinet.test({ name: "auction engine: liquidate vault",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet_1 = accounts.get("wallet_1")!;

    let oracleManager = new OracleManager(chain, deployer);
    let usdaToken = new UsdaToken(chain, deployer);
    let xstxManager = new XstxManager(chain, deployer);
    let vaultManager = new VaultManager(chain, deployer);
    let vaultAuction = new VaultAuctionV4(chain, deployer);
    let liquidationPool = new LiquidationPool(chain, deployer);
    let liquidationRewards = new LiquidationRewards(chain, deployer);

    // Initialize price of STX to $2 in the oracle
    let result = oracleManager.updatePrice("STX", 3);
    result = oracleManager.updatePrice("xSTX", 3);

    // Create vault - 1500 STX, 1000 USDA
    result = vaultManager.createVault(deployer, "STX-A", 1500, 1000);
    result.expectOk().expectUintWithDecimals(1000);

    // Upate price to $1.0
    result = oracleManager.updatePrice("STX", 1);
    result = oracleManager.updatePrice("xSTX", 1);

    // Deposit 10K USDA
    result = liquidationPool.stake(wallet_1, 10000);
    result.expectOk().expectUintWithDecimals(10000);

    // USDA in pool
    let call:any = await usdaToken.balanceOf(Utils.qualifiedName('arkadiko-liquidation-pool-v1-1'));
    call.result.expectOk().expectUintWithDecimals(10000);

    // Start auction
    result = vaultAuction.startAuction(deployer, 1);
    result.expectOk().expectBool(true);

    // Check auction parameters
    let auction:any = await vaultAuction.getAuctionById(1);
    auction.result.expectTuple()['collateral-amount'].expectUintWithDecimals(1500);
    auction.result.expectTuple()['debt-to-raise'].expectUintWithDecimals(1000); // Raise 1000 USDA and give a 10% discount on the collateral

    // Auction closed
    call = await vaultAuction.getAuctionOpen(1);
    call.result.expectBool(false);

    // Auction info
    call = await vaultManager.getVaultById(1, deployer);
    let vault:any = call.result.expectTuple();
    vault['leftover-collateral'].expectUintWithDecimals(388.888889);
    vault['is-liquidated'].expectBool(true);
    vault['auction-ended'].expectBool(true);

    // USDA in pool
    call = await usdaToken.balanceOf(Utils.qualifiedName('arkadiko-liquidation-pool-v1-1'));
    call.result.expectOk().expectUintWithDecimals(9000);

    call = await xstxManager.balanceOf(wallet_1.address);
    call.result.expectOk().expectUint(0);


    call = await xstxManager.balanceOf(Utils.qualifiedName('arkadiko-liquidation-rewards-v1-1'));
    call.result.expectOk().expectUintWithDecimals(1111.111111);

    call = await liquidationRewards.getRewardsOf(wallet_1.address, 0);
    call.result.expectOk().expectUintWithDecimals(1111.111111);

    // Claim reward
    result = liquidationRewards.claimRewards(wallet_1, 0, "xstx-token");
    result.expectOk().expectUintWithDecimals(1111.111111);

    // At this point, no STX are redeemable yet
    call = await vaultManager.getStxRedeemable();
    call.result.expectOk().expectUint(0);

    // Release stacked STX and make them redeemable
    result = vaultManager.releaseStackedStx();
    result.expectOk().expectBool(true);

    // Original vault had 1500 STX which is now redeemable
    call = await vaultManager.getStxRedeemable();
    call.result.expectOk().expectUintWithDecimals(1500);

    // Redeem STX - all
    result = vaultManager.redeemStx(wallet_1, 1111.111111);
    result.expectOk().expectBool(true);

    // Balance
    call = await xstxManager.balanceOf(wallet_1.address);
    call.result.expectOk().expectUintWithDecimals(0);

    // Withdraw leftover collateral
    result = vaultManager.withdrawLeftoverCollateral(deployer);
    result.expectOk().expectBool(true);
  }
});

Clarinet.test({ name: "auction engine: liquidate vault without enough USDA to liquidate",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet_1 = accounts.get("wallet_1")!;

    let oracleManager = new OracleManager(chain, deployer);
    let usdaToken = new UsdaToken(chain, deployer);
    let xstxManager = new XstxManager(chain, deployer);
    let vaultManager = new VaultManager(chain, deployer);
    let vaultAuction = new VaultAuctionV4(chain, deployer);
    let liquidationPool = new LiquidationPool(chain, deployer);
    let liquidationRewards = new LiquidationRewards(chain, deployer);

    // Initialize price of STX to $2 in the oracle
    let result = oracleManager.updatePrice("STX", 3);
    result = oracleManager.updatePrice("xSTX", 3);

    // Create vault - 1500 STX, 1000 USDA
    result = vaultManager.createVault(deployer, "STX-A", 1500, 1000);
    result.expectOk().expectUintWithDecimals(1000);

    // Upate price to $1.0
    result = oracleManager.updatePrice("STX", 1);
    result = oracleManager.updatePrice("xSTX", 1);

    // Start auction
    result = vaultAuction.startAuction(deployer, 1);
    result.expectOk().expectBool(true);

    let call:any = await usdaToken.balanceOf(Utils.qualifiedName('arkadiko-auction-engine-v4-1'));
    call.result.expectOk().expectUintWithDecimals(0);

    // Check auction parameters
    let auction:any = await vaultAuction.getAuctionById(1);
    auction.result.expectTuple()['collateral-amount'].expectUintWithDecimals(1500);
    auction.result.expectTuple()['debt-to-raise'].expectUintWithDecimals(1000);

    // Auction is open
    call = await vaultAuction.getAuctionOpen(1);
    call.result.expectBool(true);

    // Deposit 800 USDA
    result = liquidationPool.stake(wallet_1, 800);
    result.expectOk().expectUintWithDecimals(800);

    result = vaultAuction.burnUsda(deployer, 1);
    result.expectOk().expectUintWithDecimals(799.999999);

    // Auction is open
    call = await vaultAuction.getAuctionOpen(1);
    call.result.expectBool(true);

    // Deposit 800 USDA
    result = liquidationPool.stake(wallet_1, 300);
    result.expectOk().expectUintWithDecimals(300);

    result = vaultAuction.burnUsda(deployer, 1);
    result.expectOk().expectUintWithDecimals(200.000001);

    // Auction is open
    call = await vaultAuction.getAuctionOpen(1);
    call.result.expectBool(false);
    
    call = await liquidationRewards.getRewardsOf(wallet_1.address, 0);
    call.result.expectOk().expectUintWithDecimals(888.888887);


    // Reward data
    call = await liquidationRewards.getRewardData(1);
    call.result.expectTuple()["share-block"].expectUint(10);
    call.result.expectTuple()["total-amount"].expectUintWithDecimals(222.222223);

    call = await liquidationRewards.getRewardsOf(wallet_1.address, 1);
    call.result.expectOk().expectUintWithDecimals(222.222223);

    // Claim reward
    result = liquidationRewards.claimRewards(wallet_1, 1, "xstx-token");
    result.expectOk().expectUintWithDecimals(222.222223);

  }
});
