import React, { useState } from "react";
import { ScrollView, Button, GestureResponderEvent, View, Text, ActivityIndicator, Modal } from "react-native";
import { Formik } from "formik";
import { Input } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import { PieChart } from "react-native-chart-kit";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false); // State for showing the modal
  const [loanResponse, setLoanResponse] = useState<any>(null); // State to store API response

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

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    const { loanAmount, loanTermYears, loanTermMonths, interestRate, compound, payBack, loanType } = values;

    let requestData: any = {
      loanAmount: parseFloat(loanAmount),
      years: parseInt(loanTermYears),
      months: parseInt(loanTermMonths),
      interestRate: parseFloat(interestRate),
      compounding: compound.toUpperCase(),
    };
    
    if (loanType !== "bond" && loanType !== "deferred") {
      requestData.payback = payBack.toUpperCase();
    }

    const url = `http://18.169.145.169:8082/loan_app/api/loan/${loanType}`;
    
    try {
      const response = await axios.post(url, requestData);
      console.log(response.data);
      setLoanResponse(response.data);
      setModalVisible(true);
    } catch (error) {
      console.error("Error during loan calculation:", error);
    } finally {
      setLoading(false);
    }
  };

  // Prepare pie chart data
  const pieChartData = loanResponse
    ? [
        { name: "Principal", population: loanResponse.principal, color: "#3498db", legendFontColor: "#000", legendFontSize: 15 },
        { name: "Interest", population: loanResponse.interest, color: "#e74c3c", legendFontColor: "#000", legendFontSize: 15 },
      ]
    : [];

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

            <Button
              title={loading ? "Calculating..." : "Calculate"}
              onPress={(e: GestureResponderEvent) => handleSubmit()}
              disabled={loading}
            />
            {loading && <ActivityIndicator size="small" color="#0000ff" />}
          </View>
        )}
      </Formik>

      {/* Modal for displaying results */}
      <Modal visible={modalVisible} style={{ justifyContent: "center", alignItems: "center", margin: 0 }}>
  <View style={{ width: "85%", backgroundColor: "white", padding: 20, borderRadius: 10 }}>
    <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Loan Calculation Result</Text>

    {loanResponse?.error ? (
      // If there's an error, display the error message
      <Text style={{ color: "red", fontSize: 16 }}>{loanResponse.error}</Text>
    ) : (
      // If the response is successful, display the loan information
      <View>
        <Text>Principal: {loanResponse?.principal}</Text>
        <Text>Interest: {loanResponse?.interest}</Text>
        <Text>Total Amount: {loanResponse?.total}</Text>
      </View>
    )}

    {!loanResponse?.error && loanResponse && (
      <PieChart
        data={pieChartData}
        width={300}
        height={220}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffc107",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />
    )}

    <Button title="Close" onPress={() => setModalVisible(false)} />
  </View>
</Modal>
    </ScrollView>
  );
};

export default Index;
