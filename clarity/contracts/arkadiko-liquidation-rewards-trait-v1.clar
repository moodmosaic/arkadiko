(use-trait ft-trait .sip-010-trait-ft-standard.sip-010-trait)

(define-trait liquidation-rewards-trait
  (
    (add-reward (uint <ft-trait> uint) (response bool uint))
  )
)
