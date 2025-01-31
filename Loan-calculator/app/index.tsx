import React, { useState } from "react";
import { ScrollView, Button, GestureResponderEvent, View, Text } from "react-native";
import { Formik } from "formik";
import { Input } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";

interface FormValues {
  loanAmount: string;
  loanType: string;
  interestRate: string;
  loanTermYears: string;
  loanTermMonths: string;
  compound: string;
  payBack: string;
}

const Index = () => {
  const [loanType, setLoanType] = useState<string>("");
  const [compound, setCompound] = useState<string>("");
  const [payBack, setPayBack] = useState<string>("");

  const [openLoanType, setOpenLoanType] = useState(false);
  const [openCompound, setOpenCompound] = useState(false);
  const [openPayBack, setOpenPayBack] = useState(false);

  const loanTypeItems = [
    { label: "Amortized Loan", value: "amortized" },
    { label: "Deferred Payment", value: "deferred" },
    { label: "Bond Loan", value: "bond" },
  ];

  const compoundItems = [
    { label: "Annually (APY)", value: "annually" },
    { label: "Semi-Annually", value: "semi-annually" },
    { label: "Quarterly", value: "quarterly" },
    { label: "Monthly (APR)", value: "monthly" },
    { label: "Semi-Monthly", value: "semi-monthly" },
    { label: "Bi-weekly", value: "bi-weekly" },
    { label: "Weekly", value: "weekly" },
    { label: "Daily", value: "daily" },
    { label: "Continuously", value: "continuously" },
  ];

  const payBackItems = [
    { label: "Everyday", value: "everyday" },
    { label: "Every week", value: "everyweek" },
    { label: "Every 2 weeks", value: "every2week" },
    { label: "Every half month", value: "everyhalfmonth" },
    { label: "Every month", value: "everymonth" },
    { label: "Every quarter", value: "everyquarter" },
    { label: "Every 6 months", value: "every6months" },
    { label: "Every year", value: "everyyear" },
  ];

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Formik
        initialValues={{
          loanAmount: "",
          loanType: loanType,
          interestRate: "",
          loanTermYears: "",
          loanTermMonths: "",
          compound: compound,
          payBack: payBack,
        }}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, values }) => (
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
              Loan Amount (KES)
            </Text>
            <Input
              placeholder="Enter Loan Amount"
              keyboardType="numeric"
              onChangeText={handleChange("loanAmount")}
              value={values.loanAmount}
              containerStyle={{ marginBottom: 20 }}
            />

            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
              Loan Type
            </Text>
            <View style={{ zIndex: 3000 }}>
              <DropDownPicker
                open={openLoanType}
                setOpen={setOpenLoanType}
                items={loanTypeItems}
                value={loanType || ""}
                setValue={setLoanType}
                onChangeValue={(value) => {
                  handleChange("loanType")(value as string);
                }}
                containerStyle={{ height: 40, marginBottom: 20 }}
                labelStyle={{ fontSize: 16 }}
              />
            </View>

            {loanType === "amortized" && (
              <View style={{ zIndex: 2000 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
                  Payment Frequency
                </Text>
                <DropDownPicker
                  open={openPayBack}
                  setOpen={setOpenPayBack}
                  items={payBackItems}
                  value={payBack || ""}
                  setValue={setPayBack}
                  onChangeValue={(value) => {
                    handleChange("payBack")(value as string);
                  }}
                  containerStyle={{ height: 40, marginBottom: 20 }}
                  labelStyle={{ fontSize: 16 }}
                />
              </View>
            )}

            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
              Compound Frequency
            </Text>
            <View style={{ zIndex: 1000 }}>
              <DropDownPicker
                open={openCompound}
                setOpen={setOpenCompound}
                items={compoundItems}
                value={compound || ""}
                setValue={setCompound}
                onChangeValue={(value) => {
                  handleChange("compound")(value as string);
                }}
                containerStyle={{ height: 40, marginBottom: 20 }}
                labelStyle={{ fontSize: 16 }}
              />
            </View>

            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
              Interest Rate (%)
            </Text>
            <Input
              placeholder="Enter Interest Rate"
              keyboardType="numeric"
              onChangeText={handleChange("interestRate")}
              value={values.interestRate}
              containerStyle={{ marginBottom: 20 }}
            />
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
              Loan Term (Years)
            </Text>
            <Input
              placeholder="Enter Loan Term in Years"
              keyboardType="numeric"
              onChangeText={handleChange("loanTermYears")}
              value={values.loanTermYears}
              containerStyle={{ marginBottom: 20 }}
            />
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
              Loan Term (Months)
            </Text>
            <Input
              placeholder="Enter Loan Term in Months"
              keyboardType="numeric"
              onChangeText={handleChange("loanTermMonths")}
              value={values.loanTermMonths}
              containerStyle={{ marginBottom: 20 }}
            />

            <Button title="Calculate" onPress={(e: GestureResponderEvent) => handleSubmit()} />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default Index;
