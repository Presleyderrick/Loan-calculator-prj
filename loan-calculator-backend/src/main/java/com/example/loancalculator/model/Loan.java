@Entity
@Table(name = "loans")
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal loanAmount;
    private Integer years;
    private Integer months;
    private BigDecimal interestRate;
    private String compound;
    private String payback;
}