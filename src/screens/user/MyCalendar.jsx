

//2day

import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";
import commonStyles from "../../commonstyles/CommonStyles";

const freelancerPackageDuration = 4;

// 🔹 Define bookedDays OUTSIDE component to avoid re-creating it on re-renders
const bookedDays = new Set([
  "2025-04-06",
  "2025-04-07",
  "2025-04-08",
  "2025-04-23",
  "2025-04-24",
  "2025-04-25",
]);

const MyCalendar = ({ modalVisible, handleCancel , handlePassData}) => {
  const [selectedDates, setSelectedDates] = useState({});
  const [availableDates, setAvailableDates] = useState(new Set());
  const [currentMonth, setCurrentMonth] = useState(moment().format("YYYY-MM"));
  const [bookedDates, setBookedDates] = useState(new Set(bookedDays)); // Use bookedDays to initialize properly

  useEffect(() => {
    const today = moment();
    const futureAvailableDates = new Set();

    for (let i = 0; i < 24; i++) {
      let monthMoment = today.clone().add(i, "months");
      let daysInMonth = monthMoment.daysInMonth();

      for (let day = 1; day <= daysInMonth; day++) {
        let date = monthMoment.clone().date(day).format("YYYY-MM-DD");

        if (!bookedDates.has(date) && moment(date).isSameOrAfter(today, "day")) {
          futureAvailableDates.add(date);
        }
      }
    }

    setAvailableDates(futureAvailableDates);
  }, [bookedDates]); //  Re-run effect if `bookedDates` change

  // const handleDateSelect = (date) => {
  //   if (!availableDates.has(date)) return;

  //   setSelectedDates((prev) => {
  //     const newDates = { ...prev };

  //     if (newDates[date]) {
  //       delete newDates[date];
  //     } else {
  //       newDates[date] = {
  //         customStyles: {
  //           container: { backgroundColor: commonStyles.mainColor, borderRadius: 4 },
  //           text: { color: "#fff" },
  //         },
  //       };
  //     }

  //     return newDates;
  //   });
  // };

  // const handleDateSelect = (date) => {
  //   if (!availableDates.has(date)) return; // Ensure the selected date is available
  
  //   let dateMoment = moment(date);
  //   let sequentialDates = [];
  
  //   // Collect the next 3 sequential dates
  //   for (let i = 0; i < 3; i++) {
  //     let nextDate = dateMoment.clone().add(i, "days").format("YYYY-MM-DD");
      
  //     // If any of these dates are booked, do not select any
  //     if (bookedDates.has(nextDate)) {
  //       console.log("One or more dates are already booked, selection cancelled.");
  //       return;
  //     }
      
  //     sequentialDates.push(nextDate);
  //   }
  
  //   // If all are available, mark them as selected
  //   setSelectedDates((prev) => {
  //     let newDates = { ...prev };
  
  //     sequentialDates.forEach((d) => {
  //       newDates[d] = {
  //         customStyles: {
  //           container: { backgroundColor: commonStyles.mainColor, borderRadius: 4 },
  //           text: { color: "#fff" },
  //         },
  //       };
  //     });
  
  //     return newDates;
  //   });
  // };
  
  // const handleDateSelect = (date) => {
  //   if (!availableDates.has(date)) return; // Ensure the selected date is available
  
  //   let dateMoment = moment(date);
  //   let sequentialDates = [];
  
  //   // Collect the next 3 sequential dates
  //   for (let i = 0; i < 3; i++) {
  //     let nextDate = dateMoment.clone().add(i, "days").format("YYYY-MM-DD");
  
  //     // If any of these dates are booked, do not select any
  //     if (bookedDates.has(nextDate)) {
  //       console.log("One or more dates are already booked, selection cancelled.");
  //       return;
  //     }
  
  //     sequentialDates.push(nextDate);
  //   }
  
  //   // Check if all sequential dates are already selected
  //   let allSelected = sequentialDates.every((d) => selectedDates[d]);
  
  //   setSelectedDates((prev) => {
  //     let newDates = { ...prev };
  
  //     if (allSelected) {
  //       // If all selected, unselect them
  //       sequentialDates.forEach((d) => {
  //         delete newDates[d];
  //       });
  //     } else {
  //       // Otherwise, select them
  //       sequentialDates.forEach((d) => {
  //         newDates[d] = {
  //           customStyles: {
  //             container: { backgroundColor: commonStyles.mainColor, borderRadius: 4 },
  //             text: { color: "#fff" },
  //           },
  //         };
  //       });
  //     }
  
  //     return newDates;
  //   });
  // };
  
  // const handleDateSelect = (date) => {
  //   if (!availableDates.has(date)) return; // Ensure the selected date is available
  
  //   let dateMoment = moment(date);
  //   let sequentialDates = [];
  
  //   // Collect the next 3 sequential dates
  //   for (let i = 0; i < 3; i++) {
  //     let nextDate = dateMoment.clone().add(i, "days").format("YYYY-MM-DD");
  
  //     // If any of these dates are booked, do not select any
  //     if (bookedDates.has(nextDate)) {
  //       console.log("One or more dates are already booked, selection cancelled.");
  //       return;
  //     }
  
  //     sequentialDates.push(nextDate);
  //   }
  
  //   setSelectedDates((prev) => {
  //     let newDates = { ...prev };
  
  //     let allSelected = sequentialDates.every((d) => newDates[d]); // Check if all are selected
  
  //     if (allSelected) {
  //       // Unselect all 3 if any of them is unselected
  //       sequentialDates.forEach((d) => delete newDates[d]);
  //     } else {
  //       // Only select if they were not already selected
  //       sequentialDates.forEach((d) => {
  //         newDates[d] = {
  //           customStyles: {
  //             container: { backgroundColor: commonStyles.mainColor, borderRadius: 4 },
  //             text: { color: "#fff" },
  //           },
  //         };
  //       });
  //     }
  
  //     return newDates;
  //   });
  // };
  
  // const handleDateSelect = (date) => {
  //   if (!availableDates.has(date)) return; // Ensure selected date is available
  
  //   let dateMoment = moment(date);
  //   let sequentialDates = [];
  
  //   // Collect the next 3 sequential dates
  //   for (let i = 0; i < freelancerPackageTime; i++) {
  //     let nextDate = dateMoment.clone().add(i, "days").format("YYYY-MM-DD");
  
  //     // If any of these dates are booked, do not select anything
  //     if (bookedDates.has(nextDate)) {
  //       console.log("One or more dates are already booked, selection cancelled.");
  //       return;
  //     }
  
  //     sequentialDates.push(nextDate);
  //   }
  
  //   setSelectedDates((prev) => {
  //     let newDates = { ...prev };
      
  //     let anySelected = sequentialDates.some((d) => newDates[d]); // Check if any are selected
  
  //     if (anySelected) {
  //       // If any of them are selected, remove all 3
  //       sequentialDates.forEach((d) => delete newDates[d]);
  //     } else {
  //       // Otherwise, select all 3
  //       sequentialDates.forEach((d) => {
  //         newDates[d] = {
  //           customStyles: {
  //             container: { backgroundColor: commonStyles.mainColor, borderRadius: 4 },
  //             text: { color: "#fff" },
  //           },
  //         };
  //       });
  //     }
  
  //     return newDates;
  //   });
  // };
  
  // const handleDateSelect = (date) => {
  //   if (!availableDates.has(date)) return; // Ensure selected date is available
  
  //   let dateMoment = moment(date);
  //   let sequentialDates = [];
  
  //   // Collect the next 3 sequential dates
  //   for (let i = 0; i < freelancerPackageDuration; i++) {
  //     let nextDate = dateMoment.clone().add(i, "days").format("YYYY-MM-DD");
  
  //     // If any of these dates are booked, do not select anything
  //     if (bookedDates.has(nextDate)) {
  //       console.log("One or more dates are already booked, selection cancelled.");
  //       return;
  //     }
  
  //     sequentialDates.push(nextDate);
  //   }
  
  //   setSelectedDates((prev) => {
  //     let newDates = { ...prev };
      
  //     let anySelected = sequentialDates.some((d) => newDates[d]); // Check if any are selected
  
  //     if (anySelected) {
  //       // If any of them are selected, remove all 3
  //       sequentialDates.forEach((d) => delete newDates[d]);
  //     } else {
  //       // Otherwise, select all 3
  //       sequentialDates.forEach((d) => {
  //         newDates[d] = {
  //           customStyles: {
  //             container: { backgroundColor: commonStyles.mainColor, borderRadius: 4 },
  //             text: { color: "#fff" },
  //           },
  //         };
  //       });
  //     }
  
  //     return newDates;
  //   });
  // };

  // const handleDateSelect = (date) => {
  //   if (!availableDates.has(date)) return; // Ensure selected date is available
  
  //   let dateMoment = moment(date);
  //   let newSelectedDates = {};
  //   let sequentialDates = [];
  
  //   // Collect the next 3 sequential dates
  //   for (let i = 0; i < 3; i++) {
  //     let nextDate = dateMoment.clone().add(i, "days").format("YYYY-MM-DD");
  
  //     // If any of these dates are booked, cancel selection
  //     if (bookedDates.has(nextDate)) {
  //       console.log("One or more dates are already booked, selection cancelled.");
  //       return;
  //     }
  
  //     sequentialDates.push(nextDate);
  //   }
  
  //   // Set new selected dates and clear previous selections
  //   sequentialDates.forEach((d) => {
  //     newSelectedDates[d] = {
  //       customStyles: {
  //         container: { backgroundColor: commonStyles.mainColor, borderRadius: 4 },
  //         text: { color: "#fff" },
  //       },
  //     };
  //   });
  
  //   setSelectedDates(newSelectedDates); // Replace previous selection with new selection
  // };
  
  const handleDateSelect = (date) => {
    if (!availableDates.has(date)) return; // Ensure selected date is available
  
    let dateMoment = moment(date);
    let newSelectedDates = {};
    let sequentialDates = [];
  
    // Collect the next 3 sequential dates
    for (let i = 0; i < freelancerPackageDuration; i++) {
      let nextDate = dateMoment.clone().add(i, "days").format("YYYY-MM-DD");
  
      // If any of these dates are booked, cancel selection
      if (bookedDates.has(nextDate)) {
        console.log("One or more dates are already booked, selection cancelled.");
        return;
      }
  
      sequentialDates.push(nextDate);
    }
  
    // **Unselecting Logic**
    let isAlreadySelected = sequentialDates.every((d) => selectedDates[d]);
  
    if (isAlreadySelected) {
      // Unselect all selected dates
      setSelectedDates({});
    } else {
      // Set new selected dates and clear previous selection
      sequentialDates.forEach((d) => {
        newSelectedDates[d] = {
          customStyles: {
            container: { backgroundColor: commonStyles.mainColor, borderRadius: 4 },
            text: { color: "#fff" },
          },
        };
      });
  
      setSelectedDates(newSelectedDates); // Replace previous selection with new selection
    }
  };
  
  

  const getMarkedDates = () => {
    let markedDates = { ...selectedDates };

    // Ensure booked dates appear
    bookedDates.forEach((date) => {
      markedDates[date] = {
        customStyles: {
          container: { backgroundColor: "#CFE2F3", borderRadius: 4 },
          text: { color: commonStyles.mainColor },
        },
      };
    });

    availableDates.forEach((date) => {
      if (!markedDates[date]) {
        let dateMoment = moment(date);
        let formattedMonth = dateMoment.format("YYYY-MM");

        if (formattedMonth === currentMonth) {
          markedDates[date] = {
            customStyles: {
              text: { color: "#118F01" },
            },
          };
        }
      }
    });

    return markedDates;
  };

  const handleSelect = () => {
    let newBookedDates = new Set(bookedDates);

    // Convert selectedDates object keys into an array
    const selectedDatesArray = Object.keys(selectedDates);

    selectedDatesArray.forEach((date) => newBookedDates.add(date));

    setBookedDates(newBookedDates);  // Update state properly
    setSelectedDates({});   // Clear selected dates after selection
    handleCancel();   // Close modal

    console.log([...newBookedDates], "Updated booked dates");
    console.log(Object.keys(selectedDates),'selectedDates');

    //send the dates
    // const selectedDates = ["2025-04-20", "2025-04-21", "2025-04-22"];

// Extract Days (20, 21, 22)
const days = selectedDatesArray.map(date => moment(date).format("DD"));

// Extract Year (2025 - assuming all dates have the same year)
// const year = moment(selectedDates[0]).format("YYYY");
const year = selectedDatesArray.length > 0 ? moment(selectedDatesArray[0]).format("YYYY") : null;

console.log("Days:", days); // ["20", "21", "22"]
console.log("Year:", year); // "2025"

handlePassData(days,year)
// setDays(days);
// setYear(year);


  };

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Calendar
              current={moment().format("YYYY-MM-DD")}
              minDate={moment().format("YYYY-MM-DD")}
              markingType={"custom"}
              markedDates={getMarkedDates()}
              onDayPress={(day) => handleDateSelect(day.dateString)}
              onMonthChange={(month) => setCurrentMonth(moment(month.dateString).format("YYYY-MM"))}
              theme={{
                todayTextColor: "red",
                arrowColor: "black",
                textMonthFontWeight: "bold",
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 14,
              }}
            />
            <View style={styles.modelButtonRow}>
              <TouchableOpacity style={[styles.closeButton, styles.calendarButton]} onPress={handleCancel}>
                <Text style={[commonStyles.heading2, { color: commonStyles.lightColor }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.calendarButton, { backgroundColor: commonStyles.mainColor }]} onPress={handleSelect}>
                <Text style={[commonStyles.heading2, { color: "#FFF", textAlign: "center" }]}>Apply</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.statusRow}>
              <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                <Text style={[styles.mark, { backgroundColor: "#118F01" }]} />
                <Text style={[commonStyles.text3, { fontWeight: "500" }]}>Available</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                <Text style={[styles.mark, { backgroundColor: "#CFE2F3" }]} />
                <Text style={[commonStyles.text3, { fontWeight: "500" }]}>Booked</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                <Text style={[styles.mark, { backgroundColor: commonStyles.mainColor }]} />
                <Text style={[commonStyles.text3, { fontWeight: "500" }]}>Selected</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 20,
    borderRadius: 6,
    width: "90%",
  },
  closeButton: {
    borderWidth: 1,
    borderColor: commonStyles.strokeLines,
    backgroundColor: "#fff",
  },
  calendarButton: {
    paddingVertical: 8,
    paddingHorizontal: 28,
    borderRadius: 4,
    alignItems: "center",
  },
  modelButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
  },
  mark: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  statusRow: {
    flexDirection: "row",
    paddingHorizontal: 24,
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default MyCalendar;
