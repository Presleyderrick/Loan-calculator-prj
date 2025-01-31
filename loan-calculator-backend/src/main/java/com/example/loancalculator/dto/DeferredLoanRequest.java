import lombok.Data;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
public class DeferredLoanRequest {
    @NotNull(message = "Loan amount is required")
    @DecimalMin(value = "0.01", message = "Loan amount must be greater than zero")
    private BigDecimal loanAmount;

    @NotNull(message = "Interest rate is required")
    @DecimalMin(value = "0.0", message = "Interest rate must be at least 0%")
    private BigDecimal interestRate;

    @NotNull(message = "Loan duration years cannot be null")
    private Integer years;

    @NotNull(message = "Loan duration months cannot be null")
    private Integer months;
}
