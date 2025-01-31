public class LoanRequestDTO {
    @NotNull(message = "Loan amount cannot be null")
    @DecimalMin(value = "0.01", message = "Loan amount must be greater than zero")
    private BigDecimal loanAmount;

    @Min(value = 1, message = "Duration must be at least 1 year")
    private Integer years;

    @Min(value = 0, message = "Months cannot be negative")
    private Integer months;

    @DecimalMin(value = "0.0", message = "Interest rate cannot be negative")
    private BigDecimal interestRate;

    @NotNull(message = "Compounding period is required")
    private CompoundingPeriod compound;

    @NotNull(message = "Payback frequency is required")
    private PaybackFrequency payback;
}