
;; Errors
(define-constant ERR-NOT-AUTHORIZED u32401)
(define-constant ERR-WITHDRAWAL-AMOUNT-EXCEEDED u32002)

;; Variables
(define-data-var fragments-per-token uint u1000000000000)
(define-data-var total-fragments uint u0)

;; ---------------------------------------------------------
;; Maps
;; ---------------------------------------------------------

(define-map staker-fragments 
  { 
    staker: principal,
  } 
  {
    fragments: uint
  }
)

(define-read-only (get-staker-fragments (staker principal))
  (default-to
    { fragments: u0 }
    (map-get? staker-fragments { staker: staker })
  )
)

;; ---------------------------------------------------------
;; Getters
;; ---------------------------------------------------------

(define-read-only (get-total-fragments)
  (ok (var-get total-fragments))
)

(define-read-only (get-fragments-per-token)
  (ok (var-get fragments-per-token))
)

(define-read-only (get-tokens-of (staker principal))
  (let (
    (per-token (var-get fragments-per-token))
  )
    (if (is-eq per-token u0)
      (ok u0)
      (let (
        (user-fragments (get fragments (get-staker-fragments staker)))
      )
        (ok (/ user-fragments per-token))
      )
    )
  )
)

(define-read-only (get-shares-at (user principal) (block uint))
  (let (
    (block-hash (unwrap-panic (get-block-info? id-header-hash block)))

    (user-fragments (get fragments (at-block block-hash (get-staker-fragments user))))
    (fragments-total (unwrap-panic (at-block block-hash (get-total-fragments))))
  )
    (if (is-eq fragments-total u0)
      (ok u0)
      (ok (/ (* user-fragments u10000000) fragments-total))
    )
  )
)

;; ---------------------------------------------------------
;; Stake / unstake
;; ---------------------------------------------------------

(define-public (stake (amount uint))
  (let (
    (staker tx-sender)

    (user-fragments (get fragments (get-staker-fragments staker)))
    (add-user-fragments (* amount (var-get fragments-per-token)))
    (new-user-fragments (+ user-fragments add-user-fragments))
    (new-total-fragments (+ (var-get total-fragments) add-user-fragments))
  )
    ;; Transfer USDA
    (try! (contract-call? .usda-token transfer amount staker (as-contract tx-sender) none))

    ;; Update user tokens
    (map-set staker-fragments  { staker: staker } { fragments: new-user-fragments })

    ;; Update total fragments
    (var-set total-fragments new-total-fragments)

    (ok amount)
  )
)

(define-public (unstake (amount uint))
  (let (
    (staker tx-sender)

    (user-fragments (get fragments (get-staker-fragments staker)))
    (remove-user-fragments (* amount (var-get fragments-per-token)))
  )
    (asserts! (>= user-fragments remove-user-fragments) (err ERR-WITHDRAWAL-AMOUNT-EXCEEDED))

    (let (
      (new-user-fragments (- user-fragments remove-user-fragments))
      (new-total-fragments (- (var-get total-fragments) remove-user-fragments))
    )
      ;; Transfer USDA
      (try! (as-contract (contract-call? .usda-token transfer amount (as-contract tx-sender) staker none)))

      ;; Update user tokens
      (map-set staker-fragments  { staker: staker } { fragments: new-user-fragments })

      ;; Update total fragments
      (var-set total-fragments new-total-fragments)

      (ok amount)
    )
  )
)


;; ---------------------------------------------------------
;; Withdraw
;; ---------------------------------------------------------

(define-public (withdraw (amount uint))
  (let (
    (sender tx-sender)

    (usda-balance (unwrap-panic (contract-call? .usda-token get-balance (as-contract tx-sender))))
    (new-usda-balance (- usda-balance amount))
    (new-fragments-per-token (/ (var-get total-fragments) new-usda-balance))
  )
    (asserts! (is-eq tx-sender (unwrap-panic (contract-call? .arkadiko-dao get-qualified-name-by-name "auction-engine"))) (err ERR-NOT-AUTHORIZED))

    ;; Transfer token
    (try! (as-contract (contract-call? .usda-token transfer amount (as-contract tx-sender) sender none)))

    ;; Update fragments-per-token
    (var-set fragments-per-token new-fragments-per-token)

    (ok amount)
  )
)
