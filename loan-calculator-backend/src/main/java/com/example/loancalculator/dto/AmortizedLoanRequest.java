@Data
public class AmortizedLoanRequest {
    @NotNull(message = "Loan amount is required")
    @Min(value = 1, message = "Loan amount must be greater than zero")
    private BigDecimal loanAmount;

    @NotNull(message = "Loan term years cannot be null")
    @Min(value = 0, message = "Loan term years cannot be negative")
    private Integer years;

    @NotNull(message = "Loan term months cannot be null")
    @Min(value = 1, message = "Loan term months must be at least 1")
    @Max(value = 12, message = "Loan term months cannot exceed 12")
    private Integer months;

    @NotNull(message = "Interest rate is required")
    @DecimalMin(value = "0.0", message = "Interest rate must be at least 0%")
    @DecimalMax(value = "100.0", message = "Interest rate cannot exceed 100%")
    private BigDecimal interestRate;

    @NotNull(message = "Compounding period is required")
    private CompoundingPeriod compounding;

    @NotNull(message = "Payback frequency is required")
    private PaybackFrequency payback;
}
