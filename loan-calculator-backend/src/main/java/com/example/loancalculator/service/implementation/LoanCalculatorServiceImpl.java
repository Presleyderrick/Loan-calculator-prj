@Service
public class LoanCalculatorServiceImpl implements LoanCalculatorService {
    private final LoanRepository loanRepository;

    @Autowired
    public LoanCalculatorServiceImpl(LoanRepository loanRepository) {
        this.loanRepository = loanRepository;
    }

    @Override
    public AmortizedLoanResponse calculateAmortized(AmortizedLoanRequest request) {
        BigDecimal monthlyRate = request.getInterestRate().divide(BigDecimal.valueOf(1200), MathContext.DECIMAL128);
        int months = request.getYears() * 12 + request.getMonths();
        
        if (monthlyRate.compareTo(BigDecimal.ZERO) == 0) {
            BigDecimal monthlyPayment = request.getLoanAmount().divide(BigDecimal.valueOf(months), MathContext.DECIMAL128);
            return new AmortizedLoanResponse(monthlyPayment, months, BigDecimal.ZERO);
        }

        BigDecimal factor = monthlyRate.add(BigDecimal.ONE).pow(months, MathContext.DECIMAL128);
        BigDecimal numerator = request.getLoanAmount().multiply(monthlyRate).multiply(factor);
        BigDecimal denominator = factor.subtract(BigDecimal.ONE);
        BigDecimal monthlyPayment = numerator.divide(denominator, MathContext.DECIMAL128);

        Loan loan = new Loan();
        loan.setLoanAmount(request.getLoanAmount());
        loan.setYears(request.getYears());
        loan.setMonths(request.getMonths());
        loan.setInterestRate(request.getInterestRate());
        loan.setCompound(request.getCompound().name());
        loan.setPayback(request.getPayback().name());
        loanRepository.save(loan);

        return new AmortizedLoanResponse(monthlyPayment, months, request.getInterestRate());
    }

    @Override
    public DeferredLoanResponse calculateDeferred(DeferredLoanRequest request) {
        throw new UnsupportedOperationException("Deferred loan calculation not implemented yet.");
    }

    @Override
    public BondResponse calculateBond(BondRequest request) {
        throw new UnsupportedOperationException("Bond calculation not implemented yet.");
    }
}