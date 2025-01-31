public interface LoanCalculatorService {
    AmortizedLoanResponse calculateAmortized(AmortizedLoanRequest request);
    DeferredLoanResponse calculateDeferred(DeferredLoanRequest request);
    BondLoanResponse calculateBond(BondLoanRequest request);
}
