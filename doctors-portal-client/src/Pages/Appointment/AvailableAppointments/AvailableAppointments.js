import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React from "react";
import AppointmentOption from "../AppointmentOption/AppointmentOption";
import BookingModal from "../BookingModal/BookingModal";

const AvailableAppointments = ({ selectedDate, setSelectedDate }) => {
  // const [appointmentOptions, setAppointmentOptions] = React.useState([]);
  const [treatment, setTreatment] = React.useState(null);

  const { data: appointmentOptions = [] } = useQuery({
    queryKey: [`appointmentOptions`],
    queryFn: async () => {
      const response = await fetch(
        `https://doctors-portal-server-sigma.vercel.app/appointmentOptions`
      );
      const data = await response.json();
      return data;
    },
    // queryFn: () =>
    //   fetch(
    //     `https://doctors-portal-server-sigma.vercel.app/appointmentOptions`
    //   ).then((response) => response.json()),
  });

  // React.useEffect(() => {
  //   fetch("https://doctors-portal-server-sigma.vercel.app/appointmentOptions")
  //   // fetch("http://localhost:5000/appointmentOptions")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setAppointmentOptions(data);
  //     });
  // }, [selectedDate]);
  return (
    <section className="my-16">
      <p className="text-center text-emerald-500 font-bold">
        Available Appointments on {format(selectedDate, "PP")}
      </p>
      <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6">
        {appointmentOptions.map((appointmentOption) => (
          <AppointmentOption
            key={appointmentOption._id}
            appointmentOption={appointmentOption}
            setTreatment={setTreatment}
          />
        ))}
      </div>
      {treatment && (
        <BookingModal
          treatment={treatment}
          setTreatment={setTreatment}
          selectedDate={selectedDate}
        />
      )}
    </section>
  );
};

export default AvailableAppointments;
