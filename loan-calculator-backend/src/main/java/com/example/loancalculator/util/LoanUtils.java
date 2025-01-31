package com.example.loancalculator.util;

import com.example.loancalculator.dto.LoanRequestDTO;

public class LoanUtils {

    // Method for calculating Amortized Loan
    public static Object calculateAmortizedLoan(LoanRequestDTO loanRequestDTO) {
        double principal = loanRequestDTO.getLoanAmount();
        int years = loanRequestDTO.getYears();
        int months = loanRequestDTO.getMonths();
        double interestRate = loanRequestDTO.getInterestRate() / 100;
        String compound = loanRequestDTO.getCompound();
        String paybackFrequency = loanRequestDTO.getPayback();

        int totalMonths = (years * 12) + months;  // Convert years and months to total months
        double totalInterest = 0;
        double paymentPerPeriod = 0;

        // Adjust interest rate based on compound frequency
        double adjustedRate = getAdjustedRate(compound, interestRate);

        // Calculate Payment Per Period (Amortized)
        paymentPerPeriod = (principal * adjustedRate) / (1 - Math.pow(1 + adjustedRate, -totalMonths));

        // Calculate Total Interest and Total Payments
        double totalPaid = paymentPerPeriod * totalMonths;
        totalInterest = totalPaid - principal;

        // Return result as a custom result object
        AmortizedLoanResult result = new AmortizedLoanResult(paymentPerPeriod, totalMonths, totalInterest);
        return result;
    }

    // Method for calculating Deferred Payment Loan
    public static Object calculateDeferredLoan(LoanRequestDTO loanRequestDTO) {
        double principal = loanRequestDTO.getLoanAmount();
        int years = loanRequestDTO.getYears();
        int months = loanRequestDTO.getMonths();
        double interestRate = loanRequestDTO.getInterestRate() / 100;
        String compound = loanRequestDTO.getCompound();

        int totalMonths = (years * 12) + months;  // Convert years and months to total months
        double totalAmountDue = principal * Math.pow(1 + interestRate, totalMonths);

        // Calculate Total Interest
        double totalInterest = totalAmountDue - principal;

        // Return result as a custom result object
        DeferredLoanResult result = new DeferredLoanResult(totalAmountDue, totalInterest);
        return result;
    }

    // Method for calculating Bond Loan
    public static Object calculateBondLoan(LoanRequestDTO loanRequestDTO) {
        double principal = loanRequestDTO.getLoanAmount();
        int years = loanRequestDTO.getYears();
        int months = loanRequestDTO.getMonths();
        double interestRate = loanRequestDTO.getInterestRate() / 100;
        String compound = loanRequestDTO.getCompound();

        int totalMonths = (years * 12) + months;  // Convert years and months to total months

        // Calculate the amount received at the start of the loan (Present Value)
        double ratePerPeriod = interestRate / 12;  // Convert annual interest rate to monthly
        double amountReceived = principal / Math.pow(1 + ratePerPeriod, totalMonths);

        // Calculate Total Interest
        double totalInterest = principal - amountReceived;

        // Return result as a custom result object
        BondLoanResult result = new BondLoanResult(amountReceived, totalInterest);
        return result;
    }

    // Helper function to calculate adjusted interest rate based on compound frequency
    private static double getAdjustedRate(String compound, double annualRate) {
        switch (compound) {
            case "Annually":
                return annualRate;
            case "Semi-Annually":
                return annualRate / 2;
            case "Quarterly":
                return annualRate / 4;
            case "Monthly":
                return annualRate / 12;
            case "Semi-Monthly":
                return annualRate / 24;
            case "Bi-weekly":
                return annualRate / 26;
            case "Weekly":
                return annualRate / 52;
            case "Daily":
                return annualRate / 365;
            case "Continuously":
                return annualRate / 365; // Using continuous compounding approximation
            default:
                throw new IllegalArgumentException("Invalid Compound Frequency");
        }
    }

    // Result class for Amortized Loan
    public static class AmortizedLoanResult {
        private double paymentPerPeriod;
        private int totalPayments;
        private double totalInterest;

        public AmortizedLoanResult(double paymentPerPeriod, int totalPayments, double totalInterest) {
            this.paymentPerPeriod = paymentPerPeriod;
            this.totalPayments = totalPayments;
            this.totalInterest = totalInterest;
        }

        // Getters for result fields
        public double getPaymentPerPeriod() {
            return paymentPerPeriod;
        }

        public int getTotalPayments() {
            return totalPayments;
        }

        public double getTotalInterest() {
            return totalInterest;
        }
    }

    // Result class for Deferred Loan
    public static class DeferredLoanResult {
        private double totalAmountDue;
        private double totalInterest;

        public DeferredLoanResult(double totalAmountDue, double totalInterest) {
            this.totalAmountDue = totalAmountDue;
            this.totalInterest = totalInterest;
        }

        // Getters for result fields
        public double getTotalAmountDue() {
            return totalAmountDue;
        }

        public double getTotalInterest() {
            return totalInterest;
        }
    }

    // Result class for Bond Loan
    public static class BondLoanResult {
        private double amountReceived;
        private double totalInterest;

        public BondLoanResult(double amountReceived, double totalInterest) {
            this.amountReceived = amountReceived;
            this.totalInterest = totalInterest;
        }

        // Getters for result fields
        public double getAmountReceived() {
            return amountReceived;
        }

        public double getTotalInterest() {
            return totalInterest;
        }
    }
}
