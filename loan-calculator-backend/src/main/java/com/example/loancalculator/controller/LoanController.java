@RestController
@RequestMapping("/api/loan")
@RequiredArgsConstructor
public class LoanCalculatorController {

    private final LoanCalculatorService loanCalculatorService;

    @PostMapping("/amortized")
    public ResponseEntity<AmortizedLoanResponse> calculateAmortized(@Valid @RequestBody AmortizedLoanRequest request) {
        return ResponseEntity.ok(loanCalculatorService.calculateAmortized(request));
    }

    @PostMapping("/deferred")
    public ResponseEntity<DeferredLoanResponse> calculateDeferred(@Valid @RequestBody DeferredLoanRequest request) {
        return ResponseEntity.ok(loanCalculatorService.calculateDeferred(request));
    }

    @PostMapping("/bond")
    public ResponseEntity<BondLoanResponse> calculateBond(@Valid @RequestBody BondLoanRequest request) {
        return ResponseEntity.ok(loanCalculatorService.calculateBond(request));
    }
}
