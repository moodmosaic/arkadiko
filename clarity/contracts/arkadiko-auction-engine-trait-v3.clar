;; @contract Auction Engine trait 
;; @version 3

(use-trait oracle-trait .arkadiko-oracle-trait-v1.oracle-trait)
(use-trait vault-manager-trait .arkadiko-vault-manager-trait-v1.vault-manager-trait)
(use-trait collateral-types-trait .arkadiko-collateral-types-trait-v1.collateral-types-trait)

(define-trait auction-engine-trait
  (
    (get-collateral-amount (<oracle-trait> uint uint) (response uint uint))
    (start-auction (uint <collateral-types-trait> <oracle-trait> <vault-manager-trait> uint uint uint uint) (response bool uint))
  )
)
