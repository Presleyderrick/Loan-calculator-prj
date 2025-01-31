import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class DeferredLoanResponse {
    private BigDecimal totalAmountDue;
    private BigDecimal totalInterest;
}
