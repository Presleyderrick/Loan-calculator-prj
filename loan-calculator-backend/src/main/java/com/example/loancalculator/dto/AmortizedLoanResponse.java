@Data
@AllArgsConstructor
public class AmortizedLoanResponse {
    private BigDecimal monthlyPayment;
    private int totalPayments;
    private BigDecimal totalInterest;
}
