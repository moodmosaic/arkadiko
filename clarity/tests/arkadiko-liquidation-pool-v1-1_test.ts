import {
  Account,
  Chain,
  Clarinet,
  Tx,
  types,
} from "https://deno.land/x/clarinet@v0.13.0/index.ts";

import { 
  LiquidationPool,
  LiquidationFund
} from './models/arkadiko-tests-liquidation-fund.ts';

import { 
  Swap,
} from './models/arkadiko-tests-swap.ts';

import { 
  OracleManager,
  XstxManager,
  UsdaToken,
  DikoToken
} from './models/arkadiko-tests-tokens.ts';

import { 
  VaultManager,
  VaultLiquidator,
  VaultAuction 
} from './models/arkadiko-tests-vaults.ts';

import * as Utils from './models/arkadiko-tests-utils.ts'; Utils;

Clarinet.test({
  name: "liquidation-pool: stake and unstake",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet_1 = accounts.get("wallet_1")!;

    let usdaToken = new UsdaToken(chain, deployer);
    let liquidationPool = new LiquidationPool(chain, deployer);
 
    // Stake
    let result = liquidationPool.stake(deployer, 10000);
    result.expectOk().expectUintWithDecimals(10000);

    // Tokens
    let call = await liquidationPool.getTokensOf(deployer.address, "usda-token");
    call.result.expectOk().expectUintWithDecimals(10000);

    // Stake
    result = liquidationPool.stake(wallet_1, 1000);
    result.expectOk().expectUintWithDecimals(1000);

    // Contract balance
    call = usdaToken.balanceOf(Utils.qualifiedName("arkadiko-liquidation-pool-v1-1"));
    call.result.expectOk().expectUintWithDecimals(11000);   

    // Tokens
    call = await liquidationPool.getTokensOf(deployer.address, "usda-token");
    call.result.expectOk().expectUintWithDecimals(10000);
    call = await liquidationPool.getTokensOf(wallet_1.address, "usda-token");
    call.result.expectOk().expectUintWithDecimals(1000);

    // Unstake
    result = liquidationPool.unstake(deployer, 2000);
    result.expectOk().expectUintWithDecimals(2000);

    // Contract balance
    call = usdaToken.balanceOf(Utils.qualifiedName("arkadiko-liquidation-pool-v1-1"));
    call.result.expectOk().expectUintWithDecimals(9000);   

    // Tokens
    call = await liquidationPool.getTokensOf(deployer.address, "usda-token");
    call.result.expectOk().expectUintWithDecimals(8000);
    call = await liquidationPool.getTokensOf(wallet_1.address, "usda-token");
    call.result.expectOk().expectUintWithDecimals(1000);

    // Unstake
    result = liquidationPool.unstake(deployer, 8000);
    result.expectOk().expectUintWithDecimals(8000);
    result = liquidationPool.unstake(wallet_1, 1000);
    result.expectOk().expectUintWithDecimals(1000);

    // Contract balance
    call = usdaToken.balanceOf(Utils.qualifiedName("arkadiko-liquidation-pool-v1-1"));
    call.result.expectOk().expectUintWithDecimals(0);   

    // Tokens
    call = await liquidationPool.getTokensOf(deployer.address, "usda-token");
    call.result.expectOk().expectUintWithDecimals(0);
    call = await liquidationPool.getTokensOf(wallet_1.address, "usda-token");
    call.result.expectOk().expectUintWithDecimals(0);
  }
});


Clarinet.test({
  name: "liquidation-pool: withdraw and deposit",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet_1 = accounts.get("wallet_1")!;

    let usdaToken = new UsdaToken(chain, deployer);
    let dikoToken = new DikoToken(chain, deployer);
    let liquidationPool = new LiquidationPool(chain, deployer);
 
    // Stake
    let result = liquidationPool.stake(deployer, 10000);
    result.expectOk().expectUintWithDecimals(10000);

    // Tokens and fragments
    let call:any = await liquidationPool.getTokensOf(deployer.address, "usda-token");
    call.result.expectOk().expectUintWithDecimals(10000);
    call = await liquidationPool.getFragmentsOf(deployer.address);
    call.result.expectOk().expectUintWithDecimals(100000000000000);

    // Token info
    call = await liquidationPool.getTokenFragments("usda-token");
    call.result.expectTuple()["fragments-per-token"].expectUintWithDecimals(10000);
    call.result.expectTuple()["total-fragments"].expectUintWithDecimals(100000000000000);

    // Withdraw USDA and deposit reward token
    result = liquidationPool.withdraw(deployer, 6000);
    result.expectOk().expectUintWithDecimals(6000);
    result = liquidationPool.deposit(deployer, 2000, "arkadiko-token");
    result.expectOk().expectUintWithDecimals(2000);

    // Contract balance
    call = usdaToken.balanceOf(Utils.qualifiedName("arkadiko-liquidation-pool-v1-1"));
    call.result.expectOk().expectUintWithDecimals(4000);   

    // Token info
    call = await liquidationPool.getTokenFragments("usda-token");
    call.result.expectTuple()["fragments-per-token"].expectUintWithDecimals(25000);
    call.result.expectTuple()["total-fragments"].expectUintWithDecimals(100000000000000);
    call = await liquidationPool.getTokenFragments("arkadiko-token");
    call.result.expectTuple()["fragments-per-token"].expectUintWithDecimals(8333.333333);
    call.result.expectTuple()["total-fragments"].expectUintWithDecimals(100000000000000);

    // Fragments
    call = await liquidationPool.getFragmentsOf(deployer.address);
    call.result.expectOk().expectUintWithDecimals(100000000000000);

    // Tokens
    call = await liquidationPool.getTokensOf(deployer.address, "usda-token");
    call.result.expectOk().expectUintWithDecimals(4000);
    call = await liquidationPool.getTokensOf(deployer.address, "arkadiko-token");
    call.result.expectOk().expectUintWithDecimals(2000);

    // Stake wallet_1
    result = liquidationPool.stake(wallet_1, 1000);
    result.expectOk().expectUintWithDecimals(1000);

    // USDA
    call = await liquidationPool.getTokensOf(deployer.address, "usda-token");
    call.result.expectOk().expectUintWithDecimals(4000);
    call = await liquidationPool.getTokensOf(wallet_1.address, "usda-token");
    call.result.expectOk().expectUintWithDecimals(1000);

    // DIKO
    call = await liquidationPool.getTokensOf(deployer.address, "arkadiko-token");
    call.result.expectOk().expectUintWithDecimals(2000);
    call = await liquidationPool.getTokensOf(wallet_1.address, "arkadiko-token");
    call.result.expectOk().expectUintWithDecimals(0);

    // Withdraw USDA and deposit reward token
    result = liquidationPool.withdraw(deployer, 2000);
    result.expectOk().expectUintWithDecimals(2000);
    result = liquidationPool.deposit(deployer, 1000, "arkadiko-token");
    result.expectOk().expectUintWithDecimals(1000);

    // USDA: 4000 - (2000 * 80%) = 2400
    call = await liquidationPool.getTokensOf(deployer.address, "usda-token");
    call.result.expectOk().expectUintWithDecimals(2400);

    // USDA: 1000 - (2000 * 20%) = 600
    call = await liquidationPool.getTokensOf(wallet_1.address, "usda-token");
    call.result.expectOk().expectUintWithDecimals(600);


    // DIKO: 2000 initial + 80% * 1000 = 2800 
    call = await liquidationPool.getTokensOf(deployer.address, "arkadiko-token");
    call.result.expectOk().expectUintWithDecimals(2800);

    // DIKO: 20% * 1000 = 200
    call = await liquidationPool.getTokensOf(wallet_1.address, "arkadiko-token");
    call.result.expectOk().expectUintWithDecimals(200);

    // Deposit
    result = liquidationPool.deposit(deployer, 1000, "arkadiko-token");
    result.expectOk().expectUintWithDecimals(1000);

    // DIKO: 2800 initial + 80% * 1000 = 3600 
    call = await liquidationPool.getTokensOf(deployer.address, "arkadiko-token");
    call.result.expectOk().expectUintWithDecimals(3600);

    // DIKO: 200 initial + 20% * 1000 = 400
    call = await liquidationPool.getTokensOf(wallet_1.address, "arkadiko-token");
    call.result.expectOk().expectUintWithDecimals(400);

  }
});