import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class BondLoanResponse {
    private BigDecimal bondPayment;
    private BigDecimal totalInterest;
}
